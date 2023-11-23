import type { Meta, StoryObj } from '@storybook/react';

import Select from './Select';

import 'components/general/Select/Select.module.scss';
import 'App.scss'

const options = ['Bitcoin', 'USDC', 'XRP', 'Cardano']
let selectedOption = options[0]

function changeOptions(newSelected: string) {
    selectedOption = newSelected
}

const meta: Meta<typeof Select> = {
    title: 'General/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        name: {
            type: "string",
        },
        selectedOption: {
            defaultValue: selectedOption,
        },
    }
}

export default meta;

type Story = StoryObj<typeof meta>;
export const Default_Select: Story = {
    args: {
        name: selectedOption,
        options: options,
        onChange: changeOptions
    },
}

export const With_Label: Story = {
    args: {
        name: selectedOption,
        options: options,
        onChange: changeOptions,
        label: 'This is label:'
    },
}

export const With_Selected_Option: Story = {
    args: {
        name: 'Select with selected option',
        options: options,
        onChange: changeOptions,
        selectedOption: options[2]
    },
}