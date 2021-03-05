/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c19-image-grid', require('./c19-image-grid.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c19-image-grid @root}}
    </hbs>`,
  require('./data/default'),
);
