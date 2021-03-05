/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c20-footer-sticky-block', require('./c20-footer-sticky-block.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c20-footer-sticky-block @root}}
    </hbs>`,
  require('./data/default'),
);
