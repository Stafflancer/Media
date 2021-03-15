<?php
/**
 * @file
 * My settings file.
 */

$settings['update_free_access'] = FALSE;

$settings['trusted_host_patterns'] = [
  '^mideafinancesystem\.local$',
];

# Configuration for acquia cloud.
if (file_exists('/var/www/site-php')) {
  $settings['update_free_access'] = FALSE;

  # You have to override this file with the right one for your project on acquia.
  // require('/var/www/site-php/[MY-SITE-NAME]/[MY-SITE-NAME]-settings.inc');

  // Import the acquia settings, if available.
  if (file_exists(DRUPAL_ROOT . '/../var/drupal-settings/settings.acquia.php')) {
    require DRUPAL_ROOT . '/../var/drupal-settings/settings.acquia.php';
  }

  // Per environment settings.
  if (file_exists(DRUPAL_ROOT . '/../var/drupal-settings/settings.acquia.' . $_ENV['AH_SITE_ENVIRONMENT'] . '.php')) {
    require DRUPAL_ROOT . '/../var/drupal-settings/settings.acquia.' . $_ENV['AH_SITE_ENVIRONMENT'] . '.php';
  }
}

if (isset($_SERVER['VAGRANT_MACHINE']) || isset($_SERVER['vagrant_machine'])) {
  require DRUPAL_ROOT . '/../var/drupal-settings/settings.vagrant.php';
}
