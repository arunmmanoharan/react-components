import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {StyledMenu, StyledMenuProps} from "./StyledMenu";
import { bindTrigger, bindMenu, usePopupState } from 'material-ui-popup-state/hooks';
import {Button, MenuItem} from '@mui/material';

// Default metadata of the story https://storybook.js.org/docs/react/api/csf#default-export
const meta: Meta<typeof StyledMenu> = {
    title: "Components/StyledMenu",
    component: StyledMenu,
};

export default meta;

// The story type for the component https://storybook.js.org/docs/react/api/csf#named-story-exports
type Story = StoryObj<typeof StyledMenu>;

const StyledMenuTemplate = (args: StyledMenuProps) => {
    // Sets the hooks for both the label and primary props
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demo-styled-menu',
    });

    return (
        <>
            <Button {...bindTrigger(popupState)} variant="contained">
                Click me
            </Button>
            <StyledMenu {...args} {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Profile</MenuItem>
                <MenuItem onClick={popupState.close}>My account</MenuItem>
                <MenuItem onClick={popupState.close}>Logout</MenuItem>
            </StyledMenu>
        </>
    );
};

export const Primary: Story = {
    render: (args) => <StyledMenuTemplate {...args}/>,
};
