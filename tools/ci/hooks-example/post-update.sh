#!/bin/sh

cd ../drupal/docroot
echo "Perform Drush commands"
../vendor/bin/drush sset system.maintenance_mode 1
../vendor/bin/drush cr
../vendor/bin/drush updb -y
../vendor/bin/drush cr
../vendor/bin/drush entity-updates -y
../vendor/bin/drush cim -y
../vendor/bin/drush locale-update
../vendor/bin/drush langimp
../vendor/bin/drush cr
../vendor/bin/drush sset system.maintenance_mode 0
../vendor/bin/drupal cache:rebuild all
