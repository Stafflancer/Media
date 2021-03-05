/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c01-hero', require('./c01-hero.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c01-hero @root}}
    </hbs>`,
  require('./data/default'),
);
