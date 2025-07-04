import type { Meta, StoryObj } from '@storybook/react-vite';
import Home from './home';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof Home> = {
  title: 'Pages/Home',
  component: Home,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
export const Default: StoryObj<typeof Home> = {};
