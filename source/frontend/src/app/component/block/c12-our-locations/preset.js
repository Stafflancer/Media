/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c12-our-locations', require('./c12-our-locations.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c12-our-locations @root}}
    </hbs>`,
  require('./data/default'),
);
