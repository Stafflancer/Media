/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c11-blue-header', require('./c11-blue-header.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c11-blue-header @root}}
    </hbs>`,
  require('./data/default'),
);
