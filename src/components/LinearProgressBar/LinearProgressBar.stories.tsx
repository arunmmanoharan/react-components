import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {LinearProgressBar, LinearProgressBarProps} from "./LinearProgressBar";
import {Box,Typography} from '@mui/material';

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof LinearProgressBar> = {
  title: "Components/LinearProgressBar",
  component: LinearProgressBar,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof LinearProgressBar>;

const LinearProgressWithLabel = (props: LinearProgressBarProps & { value: number }) => {
  return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgressBar variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
  );
};

const IndeterminateTemplate = (args: LinearProgressBarProps) => {
  return <LinearProgressBar variant="indeterminate" {...args} />;
};

const DeterminateTemplate = (args: LinearProgressBarProps) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;

        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <LinearProgressBar {...args} variant="determinate" value={progress} />;
};

const BufferTemplate = (args: LinearProgressBarProps) => {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <LinearProgressBar {...args} variant="buffer" value={progress} valueBuffer={buffer} />;
};

const WithLabelTemplate = (args: LinearProgressBarProps) => {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <LinearProgressWithLabel {...args} value={progress} />;
};

export const Primary: Story = {
  name: "Indeterminate",
  render: (args) => <IndeterminateTemplate {...args} />,
};

export const Secondary: Story = {
  name: "Determinate",
  render: (args) => <DeterminateTemplate {...args} />,
}

export const Tertiary: Story = {
  name:"Buffer",
  render: (args) => <BufferTemplate {...args} />,
}

export const Quaternary: Story = {
  name:"With Label",
  render: (args) => <WithLabelTemplate {...args} />,
}

