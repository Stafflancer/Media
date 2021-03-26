<?php

namespace Drupal\midea_components\Handlebars\Helpers;

use Handlebars\Context;
use Handlebars\Helper;
use Handlebars\Template;

/**
 * Handlebars condition helper.
 */
class ConditionHelper implements Helper {

  /**
   * {@inheritdoc}
   */
  public function execute(Template $template, Context $context, $args, $source) {
    $parsedArgs = $template->parseArguments($args);
    switch ($parsedArgs[1]) {
      case '===':
        if (!empty($context->get($parsedArgs[2]))) {
          $buffer = (string) $context->get($parsedArgs[0]) === (string) $context->get($parsedArgs[2]);
        }
        else {
          $buffer = (string) $context->get($parsedArgs[0]) === (string) $parsedArgs[2];
        }
        break;

      case '==':
        $buffer = $context->get($parsedArgs[0]) == (string) $parsedArgs[2];
        break;

      case '>=':
        $buffer = $context->get($parsedArgs[0]) >= (string) $parsedArgs[2];
        break;

      case '>':
        $buffer = $context->get($parsedArgs[0]) > (string) $parsedArgs[2];
        break;

      case '!==':
        $buffer = (string) $context->get($parsedArgs[0]) !== (string) $parsedArgs[2];
        break;

      case '||':
        $buffer = ($context->get($parsedArgs[0]) || $context->get($parsedArgs[2]) ? TRUE : FALSE);
        break;

      default:
        throw new \Exception("Unknown operation: $parsedArgs[1] for condition helper");
    }

    return $buffer;
  }