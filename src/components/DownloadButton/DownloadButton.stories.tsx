import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {DownloadButton, DownloadButtonProps} from "./DownloadButton";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof DownloadButton> = {
  title: "Components/DownloadButton",
  component: DownloadButton,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof DownloadButton>;

export const Primary: Story = {
  args: {
    size: "large",
    color: "primary",
  },
};
