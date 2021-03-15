<?php

use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Filesystem\Filesystem;
//use VagrantBox\StringHelper;

/**
 * This is project's console commands configuration for Robo task runner.
 *
 * @see http://robo.li/
 */
class RoboFile extends \Robo\Tasks {

  //use StringHelper;

  /**
   * The folder where Vagrant stuff lives.
   *
   * @var string
   */
  protected $vmDir;

  /**
   * The folder where we have our drupal template.
   *
   * @var string
   */
  protected $drupalRoot;

  /**
   * The folder where drupal is installed.
   *
   * @var string
   */
  protected $drupalWebRoot;

  /**
   * The vendor bin folder.
   *
   * @var string
   */
  protected $vendorBin;

  /**
   * Sharename that the vagrant root is mounted to.
   *
   * @var string
   */
  protected $vagrantAppFolder;

  /**
   * RoboFile constructor.
   */
  public function __construct() {
    $this->vagrantAppFolder = '/app';
    $this->vmDir = $this->vagrantAppFolder . '/tools/vm';
    $this->drupalWebRoot = $this->drupalRoot . $this->getConfig()['docroot'];
    $this->drupalRoot = dirname($this->drupalWebRoot);
    $this->vendorBin = $this->vagrantAppFolder . '/vendor/bin';
  }

  /**
   * Build commands.
   */
  public function buildDrupal() {
    $filesystem = new Filesystem();
    if ($filesystem->exists($this->drupalRoot . '/composer.json')) {
      $this->say('Running composer install');
      $this->taskExec('composer install --ignore-platform-reqs')
        ->dir($this->drupalRoot)
        ->run();
    }
  }

  /**
   * Site install commands.
   *
   * @param string $siteName
   *   Drupal site name.
   * @param string $installProfile
   *   Name of Drupal installprofile.
   */
  public function installDrupal($siteName, $installProfile = 'none') {
    // Install Drupal if required/possible.
    if ($installProfile !== 'none') {
      $return = $this->taskExec($this->vendorBin . "/drush status bootstrap")
        ->dir($this->drupalWebRoot)
        ->printOutput(FALSE)
        ->run();
      if (strpos($return->getMessage(), 'Drupal bootstrap   :  Successful') === FALSE) {
        $filesystem = new Filesystem();
        $filesystem->chmod($this->drupalWebRoot . '/sites/default', 0775, 0000, TRUE);
        $this->taskExec($this->vendorBin . "/drush si $installProfile --site-name=siteName  --account-name=mediamonks -y")
          ->dir($this->drupalWebRoot)
          ->run();
      }
      else {
        $this->say('Drupal is allready installed, skipping.');
      }
    }

    // Initialise phpcs.
    $this->taskExec($this->vendorBin . '/phpcs  --config-set installed_paths ' . $this->vagrantAppFolder . '/vendor/drupal/coder/coder_sniffer')
      ->dir($this->drupalRoot)
      ->run();
  }

  /**
   * Command proxy for drush.
   */
  public function drush($arg1 = NULL, $arg2 = NULL, $arg3 = NULL, $arg4 = NULL, $arg5 = NULL, $arg6 = NULL) {
    passthru("cd $this->drupalWebRoot && $this->vendorBin/drush $arg1 $arg2 $arg3 $arg4 $arg5 $arg6");
  }

  /**
   * Command proxy for drush with debug parameters.
   */
  public function drushDebug($arg1 = NULL, $arg2 = NULL, $arg3 = NULL, $arg4 = NULL, $arg5 = NULL, $arg6 = NULL) {
    passthru('export XDEBUG_CONFIG="idekey=PHPSTORM" && export PHP_IDE_CONFIG="serverName=php" && ' .
      "cd $this->drupalWebRoot && $this->vendorBin/drush $arg1 $arg2 $arg3 $arg4 $arg5 $arg6");

  }

  /**
   * Command proxy for drupal console.
   */
  public function drupalConsole($arg1 = NULL, $arg2 = NULL, $arg3 = NULL, $arg4 = NULL, $arg5 = NULL, $arg6 = NULL) {
    $filesystem = new Filesystem();
    $drupalExecutable = "$this->drupalRoot/vendor/bin/drupal";
    if ($filesystem->exists($drupalExecutable)) {
      passthru("cd $this->drupalWebRoot && $drupalExecutable --root=$this->drupalWebRoot $arg1 $arg2 $arg3 $arg4 $arg5 $arg6");
    }
    else {
      $this->say("Drupal console must be installed locally. Its expected here: $drupalExecutable.");
    }
  }

  /**
   * Command proxy for composer.
   */
  public function composer($arg1 = NULL, $arg2 = NULL, $arg3 = NULL, $arg4 = NULL, $arg5 = NULL, $arg6 = NULL) {
    passthru("cd $this->drupalRoot && composer $arg1 $arg2 $arg3 $arg4 $arg5 $arg6");
  }

  /**
   * Command proxy for phpcs.
   */
  public function phpcs($arg1 = NULL, $arg2 = NULL, $arg3 = NULL, $arg4 = NULL, $arg5 = NULL, $arg6 = NULL) {
    passthru("cd $this->drupalRoot && $this->vendorBin/phpcs --standard=Drupal  --encoding=utf-8 -n -p $arg1 $arg2 $arg3 $arg4 $arg5 $arg6");
  }

  /**
   * Command proxy for phpcbf.
   */
  public function phpcbf($arg1 = NULL, $arg2 = NULL, $arg3 = NULL, $arg4 = NULL, $arg5 = NULL, $arg6 = NULL) {
    passthru("cd $this->drupalRoot && $this->vendorBin/phpcbf --standard=Drupal  --encoding=utf-8 -n -p $arg1 $arg2 $arg3 $arg4 $arg5 $arg6");
  }

  /**
   * Command proxy for phpcs, return only file names.
   */
  public function phpcsFiles($arg1 = NULL, $arg2 = NULL, $arg3 = NULL, $arg4 = NULL, $arg5 = NULL, $arg6 = NULL) {
    passthru("cd $this->drupalRoot && $this->vendorBin/phpcs --standard=Drupal  --encoding=utf-8 -n -p $arg1 $arg2 $arg3 $arg4 $arg5 $arg6 | grep 'FILE:'");
  }

  /**
   * Command proxy for behat.
   */
  public function behat($arg1 = NULL, $arg2 = NULL, $arg3 = NULL, $arg4 = NULL, $arg5 = NULL, $arg6 = NULL) {
    passthru("cd $this->drupalRoot && $this->vendorBin/behat --config $this->vagrantAppFolder/tests/behat.yml $arg1 $arg2 $arg3 $arg4 $arg5 $arg6");
  }

  /**
   * Command proxy for phpunit.
   */
  public function phpunit($arg1 = NULL, $arg2 = NULL, $arg3 = NULL, $arg4 = NULL, $arg5 = NULL, $arg6 = NULL) {
    passthru("$this->drupalRoot/vendor/bin/phpunit -c $this->drupalRoot $arg1 $arg2 $arg3 $arg4 $arg5 $arg6");
  }

  /**
   * Commands that run before the commit normally.
   */
  public function test() {
    $this->say($this->drupalRoot);
    $this->behat();
    $this->phpunit($this->drupalWebRoot . '/modules/custom');
    $this->checkGitAdded();
  }

  /**
   * Update command to be run every time that you update the code.
   *
   * @param string $arg1
   *   Drush site alias.
   */
  public function update(string $arg1 = NULL) {
    $siteAlias = NULL;
    if (strpos($arg1, '@') === 0) {
      $siteAlias = $arg1;
    }
    echo $this->drupalWebRoot;
    $this->taskExec($this->vendorBin . '/drush ' . $siteAlias . ' updb -y')
      ->dir($this->drupalWebRoot)
      ->run();
    $this->taskExec($this->vendorBin . '/drush ' . $siteAlias . ' entity-updates -y')
      ->dir($this->drupalWebRoot)
      ->run();
    $this->taskExec($this->vendorBin . '/drush ' . $siteAlias . ' cim sync -y')
      ->dir($this->drupalWebRoot)
      ->run();
    $this->taskExec($this->vendorBin . '/drush ' . $siteAlias . ' cr')
      ->dir($this->drupalWebRoot)
      ->run();
  }

  /**
   * Check git-added PHP files for errors.
   *
   * @return bool
   *   Error state of checked files.
   */
  public function checkGitAdded() {
    $return = $this->taskGitStack()
      ->exec('diff --cached --name-only --diff-filter=ACMR HEAD | grep "\/custom\/" | grep "\\.install\|\\.module\|\\.inc\|\\.php"')
      ->dir($this->vagrantAppFolder)
      ->printMetadata(FALSE)
      ->printOutput(FALSE)
      ->run();

    $files = explode(PHP_EOL, $return->getMessage());

    return $this->checkGitFiles($files);
  }

  /**
   * Check git-changed PHP files for errors.
   *
   * @return bool
   *   Error state of checked files.
   */
  public function checkGitChanged() {
    $return = $this->taskGitStack()
      ->exec('git ls-files -om --exclude-standard | grep "\/custom\/" | grep "\\.install\|\\.module\|\\.inc\|\\.php"')
      ->dir($this->vagrantAppFolder)
      ->printMetadata(FALSE)
      ->printOutput(FALSE)
      ->run();

    $files = explode(PHP_EOL, $return->getMessage());

    return $this->checkGitFiles($files);
  }

  /**
   * Validates commit message.
   *
   * @param string $message
   *   Commit message to check.
   *
   * @return int
   */
  public function commitMsgHook($message) {
    $errorMessages = [];
    $lines = explode(PHP_EOL, $message);
    $fistLine = $lines[0];
    $this->say('Validating commit message syntax...');

    // Check how long is the subject, it should be at max 50 characters long.
    if (strlen($fistLine) > 50) {
      $errorMessages[] = '* Subject is ' . strlen($fistLine) . ' long, should be max 50 characters long';
    }

    // Check if subject is Capitalized.
    if (!ctype_upper($fistLine[0])) {
      $errorMessages[] = '* Capitalize the subject line';
    }

    // If should not finish with a period.
    if (substr($fistLine, -1) == '.') {
      $errorMessages[] = '* Do not end the subject line with a period';
    }

    // If there's body an blank line should separate from the subject.
    if (count($lines) > 1 && !empty($lines[1])) {
      $errorMessages[] = '* Separate subject from body with a blank line';
    }

    if (!empty($errorMessages)) {
      $this->say('Commit messages must:');
      foreach ($errorMessages as $errorMessage) {
        $this->say($errorMessage);
      }

      return 1;
    }

    return 0;
  }

  /**
   * Get config from yml storage.
   */
  private function getConfig() {
    $configContent = file_get_contents($this->vagrantAppFolder . '/tools/config/config.yml');
    return Yaml::parse($configContent);
  }

  /**
   * Check git-added PHP files for errors.
   *
   * @param array $files
   *   List of files to check.
   *
   * @return bool
   *   Error state.
   */
  private function checkGitFiles($files) {

    // Check for PHP errors.
    foreach ($files as $file) {
      if ($file !== '') {
        // Check for PHP errors.
        $return = $this->taskExec('php -l -d display_errors=0 ' . $this->vagrantAppFolder . '/' . $file)
          ->printMetadata(FALSE)
          ->run();
        if ($return->getExitCode() !== 0) {
          $this->io()->error("Fix php errors in $file.");
          return FALSE;
        }
      }
    }

    // Check code standards.
    $noErrors = TRUE;
    foreach ($files as $file) {
      if ($file !== '') {
        $return = $this->taskExec($this->vendorBin . '/phpcs  --standard=Drupal  --encoding=utf-8 -n -p ' . $this->vagrantAppFolder . '/' . $file)
          ->printMetadata(FALSE)
          ->run();
        if ($return->getExitCode() !== 0) {
          $noErrors = FALSE;
        }
      }
    }
    return $noErrors;
  }

}
