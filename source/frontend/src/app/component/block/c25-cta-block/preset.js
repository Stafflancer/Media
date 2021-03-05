/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c25-cta-block', require('./c25-cta-block.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c25-cta-block @root}}
    </hbs>`,
  require('./data/default'),
);
