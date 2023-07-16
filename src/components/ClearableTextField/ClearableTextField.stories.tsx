import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {ClearableTextField as ClearableTextFieldTemplate, ClearableTextFieldProps} from "./ClearableTextField";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof ClearableTextFieldTemplate> = {
  title: "Components/ClearableTextField",
  component: ClearableTextFieldTemplate,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof ClearableTextFieldTemplate>;

const ClearableTextField = (args: ClearableTextFieldProps) => {
  const [value, setValue] = React.useState('');

  return <ClearableTextFieldTemplate {...args} onHandleChange={(e: string) => setValue(e)} value={value} />;
};

export const Primary: Story = {
  args: {
    onHandleChange: (e: string) => console.log(e),
    value: ''
  },
  render: (args) => <ClearableTextField {...args}/>,
};

