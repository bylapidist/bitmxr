import type { Meta, StoryObj } from '@storybook/react-vite';
import TrackList from './TrackList';
import { useStore } from '../state/useStore';

const meta: Meta<typeof TrackList> = {
  title: 'Components/TrackList',
  component: TrackList,
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
export const Default: StoryObj<typeof TrackList> = {};
