/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c27-navigation', require('./c27-navigation.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c27-navigation @root}}
    </hbs>`,
  require('./data/default'),
);
