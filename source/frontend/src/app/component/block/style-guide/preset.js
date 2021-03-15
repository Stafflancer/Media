/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('style-guide', require('./style-guide.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/style-guide @root}}
    </hbs>`,
  require('./data/default'),
);
