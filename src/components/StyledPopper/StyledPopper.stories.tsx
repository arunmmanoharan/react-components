import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {StyledPopper} from "./StyledPopper";
import {Box, Button} from '@mui/material';

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof StyledPopper> = {
  title: "Components/StyledPopper",
  component: StyledPopper,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof StyledPopper>;
export const Primary: Story = {
  name: 'With Content Padding',
  args: {
    children: <Button variant="contained">Click me</Button>,
  },
  render: (args) => <StyledPopper {...args} content={<Box>The content of the popper</Box>} id='demo' />,
};

export const Secondary: Story = {
  name: 'Without Content Padding',
  args: {
    children: <Button variant="contained">Click me</Button>,
  },
  render: (args) => <StyledPopper {...args} content={<Box>The content of the popper</Box>} id='demo' useContentPadding={false} />,
};
