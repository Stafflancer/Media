# MediaMonks Drupal Skeleton Project
### midea - finance-system

## Project documentation
Please check /documentation folder.
Check the wiki for more project information.
https://mediamonks.assembla.com/spaces/midea-catalog-digitalization

## Getting started

Make sure you follow the "install" manual in /VAGRANTBOX.md

Run box:
  vagrant up

Login to box:
  vagrant ssh
The welcome screen shows you important info like the hostname.

Now you can import database dump(s) for your project. You can use "importdb" script, terminal or adminer.

## Developer information
With `composer require ...` you can download new dependencies to your Drupal site.
Please make sure you do this from the 'source/drupal' directory!

You can use drush commands from within vagrant, they are routed to the docker php container and executed there.

## Vagrantbox documentation
Please check /VAGRANTBOX.md.
