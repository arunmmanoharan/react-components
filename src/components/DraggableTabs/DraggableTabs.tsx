import React from 'react';
import { Tab, Box, Stack, Button } from '@mui/material';
import { DragDropContext, Droppable, DropResult, DroppableProvided } from 'react-beautiful-dnd';
import { map } from 'lodash';
import { DragIndicator } from '@mui/icons-material';
import { TabContext, TabList } from '@mui/lab';

import { DraggableTab } from './DraggableTab';

export interface DraggableTabsProps<TData> {
  tabs: TData[];
  handleChangeTabs: (tabs: TData[]) => void;
  activeTab: number;
  setActiveTab: (index: number) => void;
  renderLabel: (item: TData, index: number, array: TData[]) => React.ReactNode;
}

export const DraggableTabs = <T extends {}>({
  tabs,
  activeTab,
  handleChangeTabs,
  setActiveTab,
  renderLabel,
}: DraggableTabsProps<T>) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const newTabs = Array.from(tabs);
    const [removed] = newTabs.splice(result.source.index, 1);
    newTabs.splice(result.destination.index, 0, removed);
    handleChangeTabs(newTabs);
  };

  const _renderTabList = (droppableProvided: DroppableProvided) => (
    <TabList
      onChange={(_: React.SyntheticEvent, v: number) => setActiveTab(v)}
      aria-label="Draggable Tabs"
      variant="scrollable"
      scrollButtons="auto"
    >
      {map(tabs, (tab, index, tabArr) => {
        const child = (
          <Tab
            component={Button}
            sx={{ cursor: 'pointer' }}
            label={
              <Box sx={{ display: 'flex' }} alignItems="center" justifyContent="center">
                {tabArr.length > 1 && (
                  <Box>
                    <DragIndicator />
                  </Box>
                )}
                {renderLabel(tab, index, tabArr)}
              </Box>
            }
            value={`${index}`}
            key={index}
          />
        );

        return <DraggableTab value={`${index}`} index={index} key={index} child={child} />;
      })}
      {droppableProvided ? droppableProvided.placeholder : null}
    </TabList>
  );

  const _renderTabListWrappedInDroppable = () => (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', overflow: 'auto' }}>
        <Droppable droppableId="1" direction="horizontal">
          {(droppableProvided) => (
            <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
              {_renderTabList(droppableProvided)}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={`${activeTab}`}>
        <Box>
          <Stack direction="column">{_renderTabListWrappedInDroppable()}</Stack>
        </Box>
        {/*{map(tabs, (tab, index, tabArr) => (*/}
        {/*  <TabPanel value={tab.value} key={index}>*/}
        {/*    {tab.content}*/}
        {/*  </TabPanel>*/}
        {/*))}*/}
      </TabContext>
    </Box>
  );
};
