/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c02-title-and-text', require('./c02-title-and-text.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c02-title-and-text @root}}
    </hbs>`,
  require('./data/default'),
);
