import { Meta } from '@muban/storybook/dist/client/preview/types-6-0';

export default {
  title: 'C09MediaBoxScrollIndicator',
  component: require('./c09-media-box-scroll-indicator'),
  argTypes: {
    // title: { control: 'text' },
  },
  parameters: {
    source: {
      data: require('./data/default.yaml'),
    },
    docs: {
      description: {
        component: 'Component Description',
      },
    },
  },
} as Meta;

export const Default = () => ({});
Default.args = require('./data/default.yaml');

// export const Variation = Default.bind({});
// Variation.args = require('./data/variation.yaml');
