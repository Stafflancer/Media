/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c08-stats-component', require('./c08-stats-component.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c08-stats-component @root}}
    </hbs>`,
  require('./data/default'),
);
