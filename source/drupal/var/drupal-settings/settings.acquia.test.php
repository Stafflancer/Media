<?php
/**
 * @file
 * Custom settings for test environment on acquia.
 */

$config['system.logging']['error_level'] = 'hide';
$config['system.performance']['cache']['page']['max_age'] = 86400;
$config['dblog.settings']['row_limit'] = 1000;
$config['system.performance']['css']['preprocess'] = TRUE;
$config['system.performance']['js']['preprocess'] = TRUE;
$config['system.performance']['css']['gzip'] = TRUE;
$config['system.performance']['js']['gzip'] = TRUE;
$config['system.performance']['response']['gzip'] = TRUE;
$config['system.cron']['threshold.autorun'] = 0;