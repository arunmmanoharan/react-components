import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {ChipInput as ChipInputTemplate, ChipInputProps} from "./ChipInput";
import {replace, trimStart} from 'lodash';

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof ChipInputTemplate> = {
  title: "Components/ChipInput",
  component: ChipInputTemplate,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof ChipInputTemplate>;

const ChipInput = (args: ChipInputProps) => {
  // Sets the hooks for both the label and primary props
  const [values, setValues] = React.useState(args.values);

  const handleChipInputChange = React.useCallback(
      (value: string): void => {
        value = replace(value, /(\r\n|\n|\r)/gm, '');
        // const valueArr = compact(split(value, ','));
        React.startTransition(() => {
          setValues(trimStart(value));
        });
      },
      [values],
  );

  return <ChipInputTemplate {...args} values={values} onHandleChange={handleChipInputChange} />;
};

export const Primary: Story = {

  args: {
    label: 'Movies List',
    name: 'movies',
    chipLimit: 5,
    disabled: false,
  },
  render: (args) => <ChipInput {...args}/>,
};
