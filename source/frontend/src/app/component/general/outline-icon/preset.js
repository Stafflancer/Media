/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('outline-icon', require('./outline-icon.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> outline-icon @root}}
    </hbs>`,
  {},
);
