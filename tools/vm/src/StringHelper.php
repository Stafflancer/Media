<?php

namespace VagrantBox;

use Symfony\Component\Filesystem\Filesystem;

trait StringHelper {
  protected function normalizeString($value) {
    return strtolower(str_replace(' ', '', preg_replace('/[^a-zA-Z0-9]+/', '', $value)));
  }

  protected function echoWelcome($rootPath) {
    $ascii = file_get_contents($rootPath . '/tools/vagrant/misc/druplicon-color-text.txt');
    echo $ascii;
  }

  protected function replaceInFile($filename, $search, $replace) {
    file_put_contents(
      $filename,
      str_replace(
        $search,
        $replace,
        file_get_contents($filename)
      )
    );
  }

  protected static function findLineInFile($file, $search) {
    foreach (file($file) as $i => $line) {
      $line = str_replace(array("\r", "\n"), '', $line);
      if (strpos($line, $search) !== FALSE) {
        return $i;
      }
    }
    return;
  }

  protected static function removeLinesFromFile($file, array $ignore) {
    $lines = [];
    foreach (file($file) as $i => $line) {
      if (!in_array($i, $ignore)) {
        $lines[] = $line;
      }
    }
    file_put_contents($file, implode('', $lines));
  }

  protected static function copyFile($source, $destination) {
    $filesystem = new Filesystem();
    $filesystem->copy($source, $destination, true);
  }
}