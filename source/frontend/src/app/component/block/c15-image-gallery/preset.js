/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c15-image-gallery', require('./c15-image-gallery.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c15-image-gallery @root}}
    </hbs>`,
  require('./data/default'),
);
