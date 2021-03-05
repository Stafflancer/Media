/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c05-masonry-grid', require('./c05-masonry-grid.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c05-masonry-grid @root}}
    </hbs>`,
  require('./data/default'),
);
