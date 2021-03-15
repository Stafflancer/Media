/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('scaffold', require('./scaffold.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/scaffold @root}}
    </hbs>`,
  require('./data/default'),
);
