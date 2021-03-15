<?php

namespace Installer;

class VagrantBox {

  /**
   * Installer.
   */
  public static function install() {
    $repo_root = dirname(dirname(dirname(dirname(__DIR__))));

    // Set current directory active.
    chdir(__dir__);
    $_SERVER['argv'] = [
      $repo_root . '/vendor/bin/robo',
      'skeleton:build',
    ];

    require $repo_root . '/vendor/bin/robo';
  }

  /**
   * Updater.
   */
  public static function update() {
    $repo_root = dirname(dirname(dirname(dirname(__DIR__))));

    // Set current directory active.
    chdir(__dir__);
    $_SERVER['argv'] = [
      $repo_root . '/vendor/bin/robo',
      'update:box',
    ];

    require $repo_root . '/vendor/bin/robo';
  }
}
