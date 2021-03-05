/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c13-sectionpage-overview', require('./c13-sectionpage-overview.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c13-sectionpage-overview @root}}
    </hbs>`,
  require('./data/default'),
);
