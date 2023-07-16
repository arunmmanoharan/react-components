import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {FileInput as FileInputTemplate, FileInputProps} from "./FileInput";

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof FileInputTemplate> = {
  title: "Components/FileInput",
  component: FileInputTemplate,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof FileInputTemplate>;

const FileInput = (args: FileInputProps) => {
  const [file, setFile] = React.useState<File | null>(args.file as null);

  return <FileInputTemplate {...args} handleChange={(e) => setFile(e.target.files && e.target.files[0])} file={file} />;
};

export const Primary: Story = {
  args: {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.files),
    file: null
  },
  render: (args) => <FileInput {...args}/>,
};

