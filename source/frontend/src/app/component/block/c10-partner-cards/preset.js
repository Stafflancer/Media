/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c10-partner-cards', require('./c10-partner-cards.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c10-partner-cards @root}}
    </hbs>`,
  require('./data/default'),
);
