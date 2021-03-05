/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c03-colored-cards', require('./c03-colored-cards.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c03-colored-cards @root}}
    </hbs>`,
  require('./data/default'),
);
