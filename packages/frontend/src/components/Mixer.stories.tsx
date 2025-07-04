import type { Meta, StoryObj } from '@storybook/react-vite';
import Mixer from './Mixer';
import { useStore } from '../state/useStore';

const meta: Meta<typeof Mixer> = {
  title: 'Components/Mixer',
  component: Mixer,
  decorators: [
    (Story) => {
      useStore.setState({
        tracks: [
          { id: '1', name: 'Track 1' },
          { id: '2', name: 'Track 2' },
        ],
      });
      return <Story />;
    },
  ],
};

export default meta;
export const Default: StoryObj<typeof Mixer> = {};
