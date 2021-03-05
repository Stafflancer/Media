/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c26-error-message', require('./c26-error-message.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c26-error-message @root}}
    </hbs>`,
  require('./data/default'),
);
