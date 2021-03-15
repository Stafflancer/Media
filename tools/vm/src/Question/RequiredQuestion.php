<?php

namespace VagrantBox\Question;

use Symfony\Component\Console\Question\Question;

class RequiredQuestion extends Question {

  /**
   * RequiredQuestion constructor.
   *
   * @param string $question
   * @param null $default
   */
  public function __construct($question, $default = null) {
    parent::__construct($question, $default);
    $this->setValidator($this->getDefaultValidator());
  }

  /**
   * @return \Closure
   */
  private function getDefaultValidator() {
    return function ($selected) {
      if (empty($selected)) {
        throw new \Exception('This field is required');
      }

      return $selected;
    };
  }
}