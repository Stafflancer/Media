<?php
/**
 * @file
 * Custom settings for testing environment.
 */

$config['system.logging']['error_level'] = 'hide';
$config['system.performance']['cache']['page']['max_age'] = 3600;
$config['dblog.settings']['row_limit'] = 1000;
$config['system.cron']['threshold.autorun'] = 0;
