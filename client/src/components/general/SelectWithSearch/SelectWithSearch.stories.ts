import type { Meta, StoryObj } from '@storybook/react';

import SelectWithSearch from 'components/general/SelectWithSearch/SelectWithSearch';

import 'components/general/SelectWithSearch/SelectWithSearch.module.scss';
import 'App.scss'

const list = ['Bitcoin', 'USDC', 'XRP', 'Cardano']
let selectedOption = list[0]

function changeOptions(newSelected: string) {
    selectedOption = newSelected
}

const meta: Meta<typeof SelectWithSearch> = {
    title: 'General/SelectWithSearch',
    component: SelectWithSearch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            type: "string",
        },
        placeholderValue: {
            type: "string",
        },
        onSearchChange: {
            type: 'function',
        },
        list: list
    }
}

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        value: selectedOption,
        placeholderValue: 'Search...',
        onSearchChange: changeOptions,
        list: list
    },
}