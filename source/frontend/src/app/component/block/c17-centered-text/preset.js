/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c17-centered-text', require('./c17-centered-text.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c17-centered-text @root}}
    </hbs>`,
  require('./data/default'),
);
