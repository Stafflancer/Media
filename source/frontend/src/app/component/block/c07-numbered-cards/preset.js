/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c07-numbered-cards', require('./c07-numbered-cards.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c07-numbered-cards @root}}
    </hbs>`,
  require('./data/default'),
);
