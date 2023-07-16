import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {SideDrawer, SideDrawerProps} from "./SideDrawer";
import {Button} from '@mui/material';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof SideDrawer> = {
  title: "Components/SideDrawer",
  component: SideDrawer,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof SideDrawer>;

const SideDrawerTemplate = (args: SideDrawerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Drawer
        </Button>
        <SideDrawer {...args} open={open} onClose={() => setOpen(false)}>
          {lorem.generateParagraphs(100)}
        </SideDrawer>
      </>
  );
};

export const Primary: Story = {
  args: {
    title: 'Sample Drawer',
    children: <div>Sample Drawer Content</div>,
  },
  render: (args) => <SideDrawerTemplate {...args}/>,
};
