<?php

use Symfony\Component\Filesystem\Filesystem;
use VagrantBox\Question\RequiredQuestion;
use Symfony\Component\Console\Question\ConfirmationQuestion;
use Symfony\Component\Console\Question\ChoiceQuestion;
use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Filesystem\Exception\IOException;
use VagrantBox\StringHelper;

/**
 * This is project's console commands configuration for Robo task runner.
 *
 * @see http://robo.li/
 */
class RoboFile extends \Robo\Tasks
{

  use StringHelper;

  /**
   * @var string
   */
  protected $rootDir;

  /**
   * @var string
   */
  protected $vmDir;

  /**
   * @var string
   */
  protected $configDir;

  /**
   * The folder where we have our drupal template from local perspective.
   *
   * @var string
   */
  protected $drupalRootLocal;

  /**
   * The folder where we have our drupal template from vm perspective.
   *
   * @var string
   */
  protected $drupalRootVagrant;

  /**
   * @var
   */
  protected $vagrantAppFolder;

  /**
   * RoboFile constructor.
   */
  public function __construct() {
    $this->rootDir = dirname(dirname(dirname(dirname(__DIR__))));
    $this->configDir = $this->rootDir . '/tools/config';
    $this->vmDir = $this->rootDir . '/tools/vm';
    $this->drupalRootLocal = $this->rootDir . '/source/drupal';
    $this->vagrantAppFolder = '/app';
    $this->drupalRootVagrant = $this->vagrantAppFolder . '/source/drupal';
  }

  /**
   * Build skeleton.
   */
  public function skeletonBuild() {
    $this->taskComposerConfig()->interaction(TRUE);
    $values = [
      'profile' => 'none',
    ];
    $dockerComposeFile = $this->configDir . '/docker-compose.yml';
    $configFile = $this->configDir . '/config.yml';

    $this->say(PHP_EOL . $this->asciiWelcome());
    // Lets ask some questions.
    $values['nameBrand'] = $this->doAsk(new RequiredQuestion('Name of brand? '));
    $values['nameProject'] = $this->doAsk(new RequiredQuestion('Name of the project? '));

    $hostName = sprintf('%s %s', $values['nameBrand'], $values['nameProject']);
    $hostName = $this->normalizeString($hostName) . '.local';
    $values['hostnamesWebserver'] = $values['hostname'] = $this->askDefault("Project (vagrant) full hostname", $hostName);

    $hostNames = [
      'host' => $values['hostname'],
      'adminer' => 'adminer.' . $values['hostname'],
      'mailhog' => 'mailhog.' . $values['hostname'],
      'portainer' => 'portainer.' . $values['hostname'],
    ];

    $lastDigits = rand(2, 254);

    $lastDigits = $this->doAsk(new RequiredQuestion("Please choose a number between 2 and 254 for the IP address: ({$lastDigits}) ", $lastDigits));
    $values['ipAddress'] = '192.168.33.' . $lastDigits;

    $rootfolder = $this->askDefault("Docroot folder in /source/drupal. Accept docroot unless specific needs.", 'docroot');
    $values['docroot'] = $this->drupalRootVagrant . '/' . $rootfolder;

    $values['webServer'] = $this->doAsk(new ChoiceQuestion('Want Apache or Nginx? (Nginx) ', [
      'apache',
      'nginx',
    ], 'nginx'));
    $values['phpVersion'] = $this->doAsk(new ChoiceQuestion('PHP Version? (7.4) ', [
      '7.2',
      '7.3',
      '7.4',
      '8.0',
    ], '7.4'));

    $question = new ConfirmationQuestion('Do you want to add extra Containers? (y/N) ', FALSE);
    $values['extraContainer'] = $this->doAsk($question);

    if ($values['extraContainer']) {
      $question = new ChoiceQuestion(
        'Which extra containers do you want do use? Separate mutliple with comma.',
        ['solr', 'varnish', 'memcache', 'webgrind', 'node']
      );
      $question->setMultiselect(TRUE);

      $values['extraContainer'] = $this->doAsk($question);
    }

    // Transforming extraContainer in array if necessary.
    if (!is_array($values['extraContainer'])) {
      $values['extraContainer'] = [$values['extraContainer']];
    }

    // Set hostnames for optional containers.
    $hasSolr = FALSE;
    foreach ($values['extraContainer'] as $containerName) {
      if ($containerName == 'solr') {
        $hasSolr = TRUE;
        $hostNames['solr'] = 'solr.' . $values['hostname'];
      }
      elseif ($containerName == 'webgrind') {
        $hostNames['webgrind'] = 'webgrind.' . $values['hostname'];
      }
    }

    // Get default docker config.
    $dockerDistFile = file_get_contents($this->vmDir . '/docker/docker-compose.dist.yml');
    $dockerArray = Yaml::parse($dockerDistFile);

    // Keep selected webserver container.
    if ($values['webServer'] == 'nginx') {
      unset($dockerArray['services']['apache']);
    }
    else {
      unset($dockerArray['services']['nginx']);
    }

    // Parse optional containers.
    if ($values['extraContainer']) {
      $extraContainersConfigFile = file_get_contents($this->vmDir . '/docker/docker-extra-containers.dist.yml');
      $extraContainersConfig = Yaml::parse($extraContainersConfigFile);

      foreach ($values['extraContainer'] as $containerName) {
        if ($containerName == 'webgrind') {
          $this->say('If you want to start to collect PHP profiling data, uncomment the "XDEBUG_CONFIG" config for php container.');
        }
        if ($containerName == 'varnish') {
          // Removing labels from apache or nginx.
          unset($dockerArray['services'][$values['webServer']]['labels']);
        }

        if (isset($extraContainersConfig['services'][$containerName])) {
          $dockerArray['services'][$containerName] = $extraContainersConfig['services'][$containerName];
        }
      }
    }

    // Serve frontend stuff separate.
    $webserver = $values['webServer'];
    $question = new ConfirmationQuestion("Serve /source/frontend directory with $webserver? (y/N) ", 'FALSE');
    $values['frontendHost'] = $this->doAsk($question);
    if ($values['frontendHost']) {
      $hostNames['frontend'] = 'frontend.' . $values['hostname'];
      $values['hostnamesWebserver'] .= '`,`frontend.' . $values['hostname'];
    }

    // Drupal stuff.
    $values['freshDrupal'] = $this->doAsk(new ConfirmationQuestion('Do a fresh Drupal install from mediamonks/drupal-skeleton? This overwrites /source/drupal! (Y,n) '));
    if ($values['freshDrupal']) {
      $values['versionSkeleton'] = $this->doAsk(new ChoiceQuestion('Version of the drupal-skeleton? (stable) ', [
        'stable',
        'dev',
      ], 'stable'));
      $values['profile'] = $this->doAsk(new RequiredQuestion('Which Drupal profile do you want to install from? [none, standard, minimal, mm_base,  <my_profile>] (mm_base) ', 'mm_base'));
    }

    $values['cleanup'] = $this->doAsk(new ConfirmationQuestion('Convert to a project repository? This prepares gitignore & readme files. (Y/n) ', TRUE));

    if (isset($values['cleanup']) && $values['cleanup']) {
      $values['assembla'] = '';
      $values['isAssembla'] = $this->doAsk(new ConfirmationQuestion('Is there an Assembla space for this project? (Y/n) ', TRUE));
      if ($values['isAssembla']) {
        $values['assembla'] = $this->doAsk(new RequiredQuestion('Please enter your Assembla space url: '));
      }
    }

    if ($values['freshDrupal']) {
      try {
        $fileSystem = new FileSystem();
        $fileSystem->remove($this->drupalRootLocal);
        $fileSystem->mkdir($this->drupalRootLocal);

        switch ($values['versionSkeleton']) {
          case 'dev':
            $values['versionSkeleton'] = 'dev-develop';
            break;

          case 'stable':
            $values['versionSkeleton'] = 'dev-master';
            break;

          default:
            $values['versionSkeleton'] = '~' . $values['versionSkeleton'];
        }

        exec('composer create-project --no-install mediamonks/drupal-skeleton:' . $values['versionSkeleton'] . ' ' . $this->drupalRootLocal . ' --repository-url=https://toran.mediamonks.net/repo/private/');
      }
      catch (IOException $e) {
        $this->say('Could install Drupal in source/drupal. Error: ' . $e->getMessage());
      }
    }

    if (isset($values['cleanup']) && $values['cleanup']) {
      $filesystem = new Filesystem();

      $this->copyFile($this->rootDir . '/project.gitignore', $this->rootDir . '/.gitignore');
      $this->copyFile($this->rootDir . '/README.md', $this->rootDir . '/VAGRANTBOX.md');
      $this->copyFile($this->rootDir . '/project.README.md', $this->rootDir . '/README.md');

      $filesystem->remove([
        $this->rootDir . '/project.gitignore',
        $this->rootDir . '/project.README.md',
      ]);

      $this->replaceInFile($this->rootDir . '/README.md', [
        '{brand_name}',
        '{project_name}',
        '{assembla_space_url}',
      ], [$values['nameBrand'], $values['nameProject'], $values['assembla']]);
    }

    // Write hosts config.
    file_put_contents($this->configDir . '/hosts.yml', Yaml::dump($hostNames, 10, 2));

    // Write vagrant config.
    $configContent = file_get_contents($this->vmDir . '/vagrant/config.dist.yml');
    $configContentArray = Yaml::parse($configContent);
    file_put_contents($configFile, Yaml::dump($configContentArray, 10, 2));
    $this->replaceInFile($configFile, '<%= brandName %>', $values['nameBrand']);
    $this->replaceInFile($configFile, '<%= projectName %>', $values['nameProject']);
    $this->replaceInFile($configFile, '<%= projectHost %>', $values['hostname']);
    $this->replaceInFile($configFile, '<%= ipAddress %>', $values['ipAddress']);
    $this->replaceInFile($configFile, '<%= drupalProfile %>', $values['profile']);
    $this->replaceInFile($configFile, '<%= docRoot %>', $values['docroot']);
    $this->replaceInFile($configFile, '<%= hasSolr %>', $hasSolr);

    // Write docker compose file.
    file_put_contents($dockerComposeFile, Yaml::dump($dockerArray, 10, 2));
    $this->replaceInFile($dockerComposeFile, '<%= phpVersion %>', $values['phpVersion']);
    $this->replaceInFile($dockerComposeFile, '<%= projectHost %>', $values['hostname']);
    $this->replaceInFile($dockerComposeFile, '<%= webserverHosts %>', $values['hostnamesWebserver']);
    $this->replaceInFile($dockerComposeFile, '<%= docRoot %>', $values['docroot']);
    $this->replaceInFile($dockerComposeFile, '<%= webServer %>', $values['webServer']);

    // Update Behat file.
    $this->copyFile($this->rootDir . '/tests/behat.dist.yml', $this->rootDir . '/tests/behat.yml');
    $this->replaceInFile($this->rootDir . '/tests/behat.yml', '<%= projectHost %>', $values['hostname']);
    $this->replaceInFile($this->rootDir . '/tests/behat.yml', '<%= docRoot %>', $values['docroot']);

    $this->say('You are ready to execute "vagrant up" in the project directory now!');
  }

  /**
   * Update Vagrant box stuff.
   */
  public function updateBox() {
    $filesystem = new Filesystem();
    $tempBox = sys_get_temp_dir() . '/mm_drupal_box';
    $filesystem->remove($tempBox);

    // Get the update code to temp dir.
    exec('git clone -b master --depth=1 git@mediamonks-git.assembla.com:mediamonks/mediamonks-drupal.generator-mediamonks-project.git ' . $tempBox);

    // Check if source dir exists.
    if ($filesystem->exists($tempBox . '/tools/vm')) {
      $this->say('Remove current code...');

      // Move out of current dir before removal.
      chdir($this->rootDir);
      $filesystem->remove($this->vmDir);

      // Lets update.
      $this->say('Copy new code...');
      $filesystem->mirror($tempBox . '/tools/vm ', $this->vmDir);
      $filesystem->copy($tempBox . '/Vagrantfile', $this->rootDir . '/Vagrantfile');

      $this->say('Composer install...');
      exec('cd ' . $this->vmDir . ' && composer install');

      $this->say('Done!');
    }
    else {
      $this->say('Updated tools/vm folder not found, update aborted.');
    }
    $filesystem->remove($tempBox);
  }

  /**
   * @param string $message
   *
   * @return string
   */
  protected function formatQuestion($message) {
    return "{$message} ? ";
  }

  /**
   * Welcome ascii art.
   *
   * @return string
   *   Ascii art from file.
   */
  protected function asciiWelcome() {
    $ascii = file_get_contents($this->vmDir . '/vagrant/provision/misc/druplicon-bw-text.txt');
    return $ascii;
  }

}
