<?php

namespace Drupal\c01_fixed_header\Plugin\ThemeEntityProcessor\Menu;

use Drupal\handlebars_theme_handler\Plugin\ThemeEntityProcessorBase;

/**
 * Returns the structured data of an entity.
 *
 * @ThemeEntityProcessor(
 *   id = "c01_fixed_header",
 *   label = @Translation("C01 Hero"),
 *   entity_type = "menu",
 *   bundle = "main",
 *   view_mode = "default"
 * )
 */
class MenuC01FixedHeader extends ThemeEntityProcessorBase {

  /**
   * {@inheritdoc}
   */
  public function preprocessItemData(&$variables) {
    //$image = $this->themeFieldProcessorManager->getFieldData($variables['elements']['field_image']);
    //$title = $this->themeFieldProcessorManager->getFieldData($variables['elements']['field_title']);
    //$body = $this->themeFieldProcessorManager->getFieldData($variables['elements']['field_body']);
    $variables['fixedHeader'] = [
      'nav' => [
        ['copy' => 'Products', 'url' => ''],
        ['copy' => 'Canton Fair', 'url' => '', 'class' => 'with-dot'],
        ['copy' => 'Products', 'url' => ''],
      ]
    ];
  }
}