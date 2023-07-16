import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {FullScreenProgress} from "./FullScreenProgress";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof FullScreenProgress> = {
  title: "Components/FullScreenProgress",
  component: FullScreenProgress,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof FullScreenProgress>;

export const Primary: Story = {
};
