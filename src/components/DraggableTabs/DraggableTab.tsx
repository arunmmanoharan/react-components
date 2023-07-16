import React, { FunctionComponent } from 'react';
import { Draggable } from 'react-beautiful-dnd';

export interface IDraggableTabProps {
  value: string;
  index: number;
  child: JSX.Element;
}

export const DraggableTab: FunctionComponent<IDraggableTabProps> = (props) => {
  return (
    <Draggable draggableId={`${props.index}`} index={props.index} disableInteractiveElementBlocking>
      {(draggableProvided) => (
        <div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps}>
          {React.cloneElement(props.child, {
            ...props,
            ...draggableProvided.dragHandleProps,
          })}
        </div>
      )}
    </Draggable>
  );
};
