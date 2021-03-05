/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c24-footer-notes', require('./c24-footer-notes.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c24-footer-notes @root}}
    </hbs>`,
  require('./data/default'),
);
