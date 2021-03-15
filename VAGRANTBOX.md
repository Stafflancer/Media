# Vagrant box for MediaMonks Drupal projects

This vagrant box should provide a kickstart for developing Drupal 8 websites.

This package is meant to work with the MediaMonks Drupal skeleton, but can be used in other contexts.
Drupal skeleton info: https://mediamonks.assembla.com/spaces/mediamonks-drupal/git/source

## Use existing box

Execute:
```
vagrant up
```

## Install
Make sure dependencies are installed:
- Composer (https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)
- GIT (follow up instructions: https://wiki.mediamonks.net/Git)
- Virtualbox (https://www.virtualbox.org/wiki/Downloads)
- Vagrant (https://www.vagrantup.com/downloads.html)

Make sure Vagrant plugins are installed, execute:
```
vagrant plugin install vagrant-vbguest vagrant-docker-compose vagrant-bindfs
vagrant plugin update
```

For Windows users only:
```
vagrant plugin install vagrant-winnfsd
vagrant plugin update
```

## Create new box

Create an empty project:
```
git clone -b master --depth=1 git@mediamonks-git.assembla.com:mediamonks/mediamonks-drupal.generator-mediamonks-project.git  <project-dir>
cd <project-dir>
composer install-box
```

Optionally remove git reference:
```
rm -rf .git
```
Run the box with 'vagrant up' in the chosen project-dir.

With `composer require ...` you can download new dependencies to your Drupal site.
Please make sure you do this from the 'source/drupal' directory!


The `composer install-box` command passes ownership of all files to the
project that is created. You should create a new git repository, and commit
all files not excluded by the .gitignore file.

## What does the installer do?

When installing the given `composer.json` some tasks are taken care of:

* Install docker host VM mediamonks/linux-docker
* Generates config files for Vagrant provisioning and docker, based on questions asked by VagrantBox.php Installer:
** /tools/config/config.yml
** /tools/config/docker-compose.yml
* Provisions docker with containers as configured in /tools/config/docker-compose.yml.
* Optionally converts to a client-project-repository-ready codebase by:
** renaming README's
** replacing .gitignore

## Updating the Vagrant box
There is an automated script that basically replaces /tools/vm:
1. From the host execute on root of halted VM: "composer run-script update-box"
2. Inspect all changes with git-diff, prevent to loose any project specific customisations!
3. Manually update container versions in /tools/config/docker-compose.yml with the versions in /tools/vm/docker/docker-compose.dist.yml

## Using different VM settings
For local usage you can copy tools/config/config.yml to tools/config/config.local.yml to use more RAM for example.
Dont just change the hostname here. This will need editing of "docker-compose.yml" and a "vagrant provision". Not recommended but possible.

## Behat testing
Behat Drupal Extension is integrated in Vagrant box. The behat command is routed to Robo and executed on the PHP container.

After creating the project and `vagrant up`, you can check and modify configuration of Behat in /tests/behat.yml file.
There is also homepage test file `homepage.feature`, which tests does homepage work.

There are two ways to run behat tests:
1. On host machine, in root of the box, run `vagrant ssh -c behat` command
2. In vagrant machine, go to /vagrant folder and run `behat` command

You can find more information about Behat testing on the link: https://www.drupal.org/project/drupalextension

## CodeSniffer and code errors check
In order to the vagrant box check the code of your custom modules you can run: robo test
it will also automatically run when you commit a new code

When you commit the files, pre-commit hook will do the following on diff files:
1. Check the commit message if it follow the mediamonks standards
2. Run CodeSniffer to check the code
3. Run PHPUnit tests
4. Run Behat tests

## Robo task runner
Robo is a task runner written in PHP which is responsible to run common tasks in our projects, currently we have the following tasks:

 * robo update - Runs the database updates, should should do that every time that you pull from the repository
 * robo test - Runs the codesniffer, PHPUnit and Behat in the custom modules folder
 * robo commit:msg-hook - Check if your commit message is right, normally you should not run this one, it will automatically called when you create a new commit
 ** If some test fails, changes will not be committed until everything is fixed.

Run "robo" to see al commands available.
Note: run robo from vagrant, not your local host.

## Fixing problems
Windows users:
* Can have trouble with line-endings. Make sure you keep "linux" line endings. Read: https://help.github.com/articles/dealing-with-line-endings/
* error "Vagrant was unable to mount VirtualBox shared folders". Execute: bcdedit /set hypervisorlaunchtype off.gitattributes
* Win10 cant SSH, execute: set VAGRANT_PREFER_SYSTEM_BIN=0
