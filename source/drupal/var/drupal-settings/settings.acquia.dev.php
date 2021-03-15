<?php
/**
 * @file
 * Custom settings for dev environment on acquia.
 */

$config['system.logging']['error_level'] = 'verbose';
$config['system.performance']['cache']['page']['max_age'] = 0;
$config['dblog.settings']['row_limit'] = 1000;
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;
$config['system.performance']['css']['gzip'] = FALSE;
$config['system.performance']['js']['gzip'] = FALSE;
$config['system.performance']['response']['gzip'] = FALSE;
$config['system.cron']['threshold.autorun'] = 0;