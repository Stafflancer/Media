<?php
/**
 * @file
 * Memcache configurations.
 */

$settings['cache']['bins']['container'] = 'cache.backend.memcache';
$settings['cache']['bins']['bootstrap'] = 'cache.backend.memcache';
$settings['cache']['bins']['render'] = 'cache.backend.memcache';
$settings['cache']['bins']['discovery'] = 'cache.backend.memcache';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.memcache';
$settings['cache']['bins']['data'] = 'cache.backend.memcache';
$settings['cache']['bins']['config'] = 'cache.backend.memcache';
$settings['cache']['bins']['container'] = 'cache.backend.memcache';
$settings['cache']['bins']['toolbar'] = 'cache.backend.memcache';
$settings['cache']['bins']['menu'] = 'cache.backend.memcache';
$settings['cache']['bins']['entity'] = 'cache.backend.memcache';
$settings['cache']['bins']['default'] = 'cache.backend.memcache';
$settings['cache']['default'] = 'cache.backend.memcache';
$settings['memcache']['stampede_protection'] = TRUE;
$settings['memcache']['key_hash_algorithm'] = 'sha1';
$conf['memcache_stampede_semaphore'] = 15;
$conf['memcache_stampede_wait_time'] = 5;
$conf['memcache_stampede_wait_limit'] = 3;


if (class_exists(\Composer\Autoload\ClassLoader::class)) {
  $loader = new \Composer\Autoload\ClassLoader();
  $loader->addPsr4('Drupal\\memcache\\', 'modules/contrib/memcache/src');
  $loader->register();

  $settings['container_yamls'][] = DRUPAL_ROOT . "/../var/drupal-settings/services/services.memcached.yml";

  // Overriding the bootstrap continer definition to never store inside database and use memcached instead.
  // This is really relying on memcache module. When the module changes we need to take care.
  $settings['bootstrap_container_definition'] = [
    'parameters' => [],
    'services' => [
      'database' => [
        'class' => 'Drupal\Core\Database\Connection',
        'factory' => 'Drupal\Core\Database\Database::getConnection',
        'arguments' => ['default'],
      ],
      'settings' => [
        'class' => 'Drupal\Core\Site\Settings',
        'factory' => 'Drupal\Core\Site\Settings::getInstance',
      ],
      'memcache.config' => [
        'class' => 'Drupal\memcache\DrupalMemcacheConfig',
        'arguments' => ['@settings'],
      ],
      'memcache.backend.cache.factory' => [
        'class' => 'Drupal\memcache\DrupalMemcacheFactory',
        'arguments' => ['@memcache.config']
      ],
      'memcache.backend.cache.container' => [
        'class' => 'Drupal\memcache\DrupalMemcacheFactory',
        'factory' => ['@memcache.backend.cache.factory', 'get'],
        'arguments' => ['container'],
      ],
      'lock.container' => [
        'class' => 'Drupal\memcache\Lock\MemcacheLockBackend',
        'arguments' => ['container', '@memcache.backend.cache.container'],
      ],
      'cache.container' => [
        'class' => 'Drupal\memcache\MemcacheBackend',
        'arguments' => ['container', '@memcache.backend.cache.container', '@lock.container', '@memcache.config', '@cache_tags_provider.container'],
      ],
      'cache_tags_provider.container' => [
        'class' => 'Drupal\Core\Cache\DatabaseCacheTagsChecksum',
        'arguments' => ['@database'],
      ],
    ],
  ];
}