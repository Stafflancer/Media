/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c04-image-text', require('./c04-image-text.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c04-image-text @root}}
    </hbs>`,
  require('./data/default'),
);
