/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c22-map', require('./c22-map.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c22-map @root}}
    </hbs>`,
  require('./data/default'),
);
