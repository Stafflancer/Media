#!/usr/bin/env bash

THEME='midea_theme'

cd source/frontend

echo 'Updating package dependencies'
yarn

echo 'Building frontend assets'
yarn build --publicPath=/themes/custom/${THEME}

echo 'Copying assets to drupal theme'
cp -R dist/site/asset/. ../drupal/docroot/themes/custom/${THEME}/asset

echo 'Updating templates in drupal theme'
cp -R dist/templates/. ../drupal/docroot/themes/custom/${THEME}/templates
rm -rf ../drupal/docroot/themes/custom/${THEME}/templates/block
cp -R dist/templates/block/. ../drupal/docroot/themes/custom/${THEME}/templates/components
echo 'Done'
