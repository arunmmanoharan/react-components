import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {ExcelIcon} from "./ExcelIcon";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof ExcelIcon> = {
  title: "Components/ExcelIcon",
  component: ExcelIcon,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof ExcelIcon>;

export const Primary: Story = {
};
