<?php

/**
 * @file
 * Contains secret and strictly local Drupal settings, and config overrides.
 *
 * @see README.md
 */

// Config Folder.
$settings['config_sync_directory'] = DRUPAL_ROOT . '/../var/drupal-config/sync';
$settings['hash_salt'] = 'SALT-SALT-SALT';

// Set the temp dir.
$config['system.file']['path']['temporary'] = '/tmp';

// Show errors.
$config['system.logging']['error_level'] = 'all';

// Include services.
$settings['container_yamls'][] = DRUPAL_ROOT . "/../var/drupal-settings/services/services.vagrant.yml";
// Set no cache
$config['system.performance']['cache']['page']['max_age'] = 0;
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.null';
$settings['cache']['bins']['render'] = 'cache.backend.null';

// Activate dev config
$config['config_split.config_split.dev']['status'] = TRUE;

// Disable rename_admin_paths rewrites.
$config['rename_admin_paths.settings']['admin_path'] = FALSE;
$config['rename_admin_paths.settings']['user_path'] = FALSE;

$databases['default']['default'] = array (
  'database' => 'drupal',
  'username' => 'drupal',
  'password' => 'drupal',
  'host' => 'mariadb',
  'port' => '3306',
  'driver' => 'mysql',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
);

//// Example config for stage_file_proxy.
// $config['stage_file_proxy.settings']['origin'] = 'http://live.domain.tld';
// $config['stage_file_proxy.settings']['use_imagecache_root'] = TRUE;
// $config['stage_file_proxy.settings']['origin_dir'] = 'sites/default/files';

//// In the case that you want to use memcache (Testing purpouses).
// $settings['memcache']['servers'] = [
//   'memcached:11211' => 'default',
// ];
// require DRUPAL_ROOT . '/../var/drupal-settings/settings.memcached.php';
