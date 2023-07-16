import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {UploadButton} from "./UploadButton";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof UploadButton> = {
  title: "Components/UploadButton",
  component: UploadButton,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof UploadButton>;

export const Primary: Story = {
  args: {
    size: "large",
    color: "primary",
  },
};
