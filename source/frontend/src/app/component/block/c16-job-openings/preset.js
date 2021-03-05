/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('c16-job-openings', require('./c16-job-openings.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/c16-job-openings @root}}
    </hbs>`,
  require('./data/default'),
);
