import type { Meta, StoryObj } from '@storybook/react';

import SortIcon from './SortIcon';

import { SortOrder } from 'models/Interface';

import 'App.scss'

const meta: Meta<typeof SortIcon> = {
    title: 'General/SortIcon',
    component: SortIcon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        sortType: {
            type: 'string',
            description: 'Sort type',
            control: {
                type: 'text'
            }
        },
        sortOrder: {
            type: 'string',
            description: 'Sort order',
            options: [SortOrder.asc, SortOrder.desc, SortOrder.none],
            control: {
                type: 'radio'
            }
        },
        isEnabled: {
            type: 'boolean',
        },
        isSelected: {
            type: 'boolean',
        }
    },
}

export default meta;

type Story = StoryObj<typeof meta>;
export const Asc: Story = {
    args: {
        sortType: 'Price',
        sortOrder: SortOrder.asc,
        isEnabled: true,
        isSelected: true,
    },
}

export const Desc: Story = {
    args: {
        sortType: 'Price',
        sortOrder: SortOrder.desc,
        isEnabled: true,
        isSelected: true,
    },
};

export const None: Story = {
    args: {
        sortType: 'Price',
        sortOrder: SortOrder.none,
        isEnabled: true,
        isSelected: true,
    },
};

export const Disabled_Selected: Story = {
    args: {
        sortType: 'Price',
        sortOrder: SortOrder.asc,
        isEnabled: true,
        isSelected: true,
    },
};

export const Disabled_nonselected: Story = {
    args: {
        sortType: 'Price',
        sortOrder: SortOrder.asc,
        isEnabled: true,
        isSelected: false,
    },
};

export const Enabled_Selected: Story = {
    args: {
        sortType: 'Price',
        sortOrder: SortOrder.asc,
        isEnabled: true,
        isSelected: true,
    },
};

export const Enabled_nonselected: Story = {
    args: {
        sortType: 'Price',
        sortOrder: SortOrder.asc,
        isEnabled: true,
        isSelected: false,
    },
};