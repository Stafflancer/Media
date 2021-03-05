/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('n02-footer-navigation', require('./n02-footer-navigation.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/n02-footer-navigation @root}}
    </hbs>`,
  require('./data/default'),
);
