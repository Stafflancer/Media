/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c18-image-set', require('./c18-image-set.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c18-image-set @root}}
    </hbs>`,
  require('./data/default'),
);
