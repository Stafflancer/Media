# MediaMonks Drupal Vagrant box
Docker based Vagrant box for Drupal 8 development.

## Architecture
Vagrant machine that runs as a docker host.
On that machine we run the development stack as docker containers.
It should be able to run docker-compose directly if youre on Linux with some minor tweaks though thats not tested/supported atm.

## Scripts

### For development
Inside the vagrant machine we can run commands that route directly to the containers using .sh scripts. E.g. "drush".
A list of these can be found in /tools/vm/vagrant/scripts.
Some of these are routed to "robo" commands, which are php executed.
Reason for using "robo" is that we can read and use settings from yml like "docroot", and use OOP syntax in a language we know.

### For installing
We have another roboFile with script specifically for installing/updating the vagrant box.

### For vagrant
For easy access to vagrant we have helper scripts to modify the hosts file in /tools/vm/vagrant.
For provisioning and running vagrant we have helperscripts in /tools/vm/vagrant/provision to setup the vagrant box as docker host, modify permissions, create shared directories amongst other things.


## Extra containers
Some extra containers are available to select in the install process.
They come from /tools/vm/docker/docker-extra-containers.dist.yml.
Can be added later to /tools/config/docker-compose.yml manually.
Please note also to update /tools/config/hosts.yml to match the docker-compose file.

## SOLR
Use "http://solr:8983" as a host from the solr API configuration.
By default the index "drupal" is created.

## elasticsearch
Use "http://elasticsearch:9200" as a host from the solr API configuration.
