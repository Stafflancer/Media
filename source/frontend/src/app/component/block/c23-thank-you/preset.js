/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c23-thank-you', require('./c23-thank-you.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c23-thank-you @root}}
    </hbs>`,
  require('./data/default'),
);
