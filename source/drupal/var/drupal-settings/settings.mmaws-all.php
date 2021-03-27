<?php
/**
 * @file
 * Settings for all environment on MM AWS.
 */

$databases['default']['default'] = [
  'database' => DB_NAME,
  'username' => DB_USER,
  'password' => DB_PASS,
  'host' => DB_HOST,
  'port' => '3306',
  'driver' => 'mysql',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
  'pdo' => [
    PDO::MYSQL_ATTR_SSL_CA => DB_SSL_CA,
    PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => FALSE,
  ],
];

$settings['hash_salt'] = 'ac53dde9661daf47a428efea28c81a02c';

// Trusted host config to prevent HTTP Host header spoofing.
$settings['trusted_host_patterns'] = [
  '.mideavision.com$',
  $_SERVER['HTTP_HOST'],
  ELB_HOST
];

// Config Folder.
$settings['config_sync_directory'] = DRUPAL_ROOT . '/../var/drupal-config/sync';

// Set the temp dir.
$config['system.file']['path']['temporary'] = '/tmp';

// Set the log dir.
$config['filelog.settings']['location'] = LOGDIR;

// Show errors.
$config['system.logging']['error_level'] = 'none';

// CSS/JS aggregation fails on S3, set to TRUE for debug reasons.
$config['system.performance']['css']['preprocess'] = TRUE;
$config['system.performance']['js']['preprocess'] = FALSE;
$config['system.performance']['css']['gzip'] = TRUE;
$config['system.performance']['js']['gzip'] = TRUE;
$config['system.performance']['response']['gzip'] = TRUE;

//S3FS.
$settings['s3fs.use_s3_for_public'] = TRUE;
$config['s3fs.settings']['root_folder'] = 'data/' . PHP_ENV;
$config['s3fs.settings']['use_instance_profile'] = TRUE;
$config['s3fs.settings']['bucket'] = S3_BUCKET;
$config['s3fs.settings']['root_folder'] = 'data/' . PHP_ENV;
$config['s3fs.settings']['region'] = AWS_DEFAULT_REGION;
$config['s3fs.settings']['version'] = 'latest';
$config['s3fs.settings']['use_cname'] = TRUE;
$config['s3fs.settings']['use_https'] = TRUE;
$config['s3fs.settings']['no_rewrite_cssjs'] = TRUE;
// S3 Domain
$config['s3fs.settings']['domain'] = $_SERVER['HTTP_HOST'];
