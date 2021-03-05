/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('n03-language-selector', require('./n03-language-selector.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/n03-language-selector @root}}
    </hbs>`,
  require('./data/default'),
);
