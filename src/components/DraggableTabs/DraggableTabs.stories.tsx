import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {DraggableTabs as DraggableTabsTemplate, DraggableTabsProps} from "./DraggableTabs";

interface ITabs {
  id: string;
  label: string;
  component: JSX.Element;
}


// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof DraggableTabsTemplate> = {
  title: "Components/DraggableTabs",
  component: DraggableTabsTemplate,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof DraggableTabsTemplate<ITabs>>;

const DraggableTabs = (args: DraggableTabsProps<ITabs>) => {
  // Sets the hooks for both the label and primary props
  const [tabs, setTabs] = React.useState<ITabs[]>(args.tabs);
  const [activeTab, setActiveTab] = React.useState(args.activeTab);

  const reorderChartTabs = (tabs: ITabs[]) => {
    setTabs(tabs);
  };

  return (
      <DraggableTabsTemplate<ITabs>
          tabs={tabs}
          handleChangeTabs={reorderChartTabs}
          activeTab={activeTab}
          setActiveTab={(id) => setActiveTab(id)}
          renderLabel={item => item.label}
      />
  );
};

export const Primary: Story = {
  args: {
    tabs: [
      {
        id: 'tab1',
        label: 'Tab 1',
        component: <div>Tab 1</div>,
      },
      {
        id: 'tab2',
        label: 'Tab 2',
        component: <div>Tab 2</div>,
      },
    ],
    activeTab: 0,
  },
  render: (args) => <DraggableTabs {...args} />
};
