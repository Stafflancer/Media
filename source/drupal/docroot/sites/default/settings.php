<?php
/**
 * @file
 * My settings file.
 */

$settings['update_free_access'] = FALSE;

$settings['trusted_host_patterns'] = [
  '^mideafinancesystem\.local$',
];

# Configuration for AWS hosting.
if (defined('PHP_ENV') && defined('DB_NAME')) {
  $settings['update_free_access'] = FALSE;

  require DRUPAL_ROOT . '/../var/drupal-settings/settings.mmaws-all.php';
  // Per environment settings.
  if (file_exists(DRUPAL_ROOT . '/../var/drupal-settings/settings.mmaws-' . PHP_ENV . '.php')) {
    require DRUPAL_ROOT . '/../var/drupal-settings/settings.mmaws-' . PHP_ENV . '.php';
  }
}

if (isset($_SERVER['VAGRANT_MACHINE']) || isset($_SERVER['vagrant_machine'])) {
  require DRUPAL_ROOT . '/../var/drupal-settings/settings.vagrant.php';
}
