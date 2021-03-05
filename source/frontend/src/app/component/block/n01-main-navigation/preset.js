/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('n01-main-navigation', require('./n01-main-navigation.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/n01-main-navigation @root}}
    </hbs>`,
  require('./data/default'),
);
