/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c06-visual-cards', require('./c06-visual-cards.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c06-visual-cards @root}}
    </hbs>`,
  require('./data/default'),
);
