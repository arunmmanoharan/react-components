import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {GoToTop} from "./GoToTop";
import {Box} from '@mui/material';
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
const meta: Meta<typeof GoToTop> = {
  title: "Components/GoToTop",
  component: GoToTop,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof GoToTop>;

export const Primary: Story = {
  render: () => <Box>
    {lorem.generateParagraphs(100)}
    <GoToTop />
  </Box>,
};

