import type { Meta, StoryObj } from '@storybook/react';

import IconButton from 'components/general/IconButton/IconButton';

import confirmIcon from '../../../../public/images/buttons/confirm.svg';
import editIcon from '../../../../public/images/buttons/edit.svg';
import plusIcon from '../../../../public/images/buttons/plus.svg';
import removeIcon from '../../../../public/images/buttons/remove.svg';
import returnIcon from '../../../../public/images/buttons/return.svg';
import themeIcon from '../../../../public/images/buttons/theme.svg';

const meta: Meta<typeof IconButton> = {
    title: 'General/IconButton',
    component: IconButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onClick: { 
            type: 'function',
            action: "onClick" 
        },
        iconSVG: {
            type: 'string',
            description: 'Icon svg adress',
            defaultValue: '/images/imgNotFound.svg',
            control: {
                type: 'text'
            }
        },
        sizePX: {
            type: 'number',
            description: 'Size of icon in PX',
            defaultValue: 25,
            control: {
                type: 'number'
            }
        },
        disabled: {
            type: 'boolean',
            description: 'Button disabled status',
            defaultValue: false,
            control: 'boolean'
        }
    },
}

export default meta;

type Story = StoryObj<typeof meta>;
export const Confirm: Story = {
    args: {
        iconSVG: confirmIcon
    },
}

export const Edit_With_Size_15PX: Story = {
    args: {
        iconSVG: editIcon,
        sizePX: 15,
    },
};

export const Add_With_Size_50PX: Story = {
    args: {
        iconSVG: plusIcon,
        sizePX: 50,
    },
};

export const Remove: Story = {
    args: {
        iconSVG: removeIcon,
    },
};

export const Remove_Disabled: Story = {
    args: {
        iconSVG: removeIcon,
        disabled: true
    },
};

export const Return: Story = {
    args: {
        iconSVG: returnIcon
    },
};

export const Theme: Story = {
    args: {
        iconSVG: themeIcon
    },
};