<?php

namespace Drupal\midea_components\Handlebars\Helpers;

use Handlebars\Context;
use Handlebars\Helper;
use Handlebars\Template;

/**
 * Handlebars if-in helper.
 */
class IfInHelper implements Helper {

  /**
   * {@inheritdoc}
   */
  public function execute(Template $template, Context $context, $args, $source) {
    $parsedArgs = $template->parseArguments($args);
    $value = $context->get($parsedArgs[0]);
    $list = $context->get($parsedArgs[1]);

    if (is_array($list) && in_array($value, $list)) {
      $template->setStopToken('else');
      $buffer = $template->render($context);
      $template->setStopToken(FALSE);
      $template->discard($context);
    }
    else {
      $template->setStopToken('else');
      $template->discard($context);
      $template->setStopToken(FALSE);
      $buffer = $template->render($context);
    }

    return $buffer;
  }
}