/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c21-contact-form', require('./c21-contact-form.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c21-contact-form @root}}
    </hbs>`,
  require('./data/default'),
);
