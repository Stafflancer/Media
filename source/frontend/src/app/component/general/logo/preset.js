/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('logo', require('./logo.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> logo @root}}
    </hbs>`,
  {},
);
