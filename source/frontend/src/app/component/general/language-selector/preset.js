/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('language-selector', require('./language-selector.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> language-selector @root}}
    </hbs>`,
  {},
);
