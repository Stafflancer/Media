/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('n04-video-overlay', require('./n04-video-overlay.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
      {{> block/n04-video-overlay @root}}
    </hbs>`,
  require('./data/default'),
);
