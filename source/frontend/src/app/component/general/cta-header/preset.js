/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('cta-header', require('./cta-header.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> cta-header @root}}
    </hbs>`,
  {},
);
