/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c14-iconic-cards', require('./c14-iconic-cards.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c14-iconic-cards @root}}
    </hbs>`,
  require('./data/default'),
);
