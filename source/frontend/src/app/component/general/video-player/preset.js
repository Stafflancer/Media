/* eslint-disable max-len */
import { storiesOf } from 'storybook/utils/utils';

storiesOf('video-player', require('./video-player.hbs')).add(
  'default',
  'No description yet...',
  `<hbs>
			{{> video-player @root}}
		</hbs>`,
  {},
);
