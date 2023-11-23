import type { Meta, StoryObj } from '@storybook/react';

import SearchInput, { SearchInputProps } from 'components/general/SearchInput/SearchInput';

import 'components/general/SearchInput/SearchInput.module.scss';
import 'App.scss';

let searchFilter = ''

function changeSearchFilter(newSelected: string) {
    searchFilter = newSelected
}

function SearchWrapper({
    value,
    placeholderValue,
    onChange
}: SearchInputProps) {
    return <div style={{ backgroundColor: 'var(--color-bg)', padding: '16px'}}>
        <SearchInput
            value={value}
            placeholderValue={placeholderValue}
            onChange={onChange}
        />
    </div>
}

const meta: Meta<typeof SearchInput> = {
    title: 'General/SearchInput',
    component: SearchWrapper,
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
        onChange: {
            type: 'function',
        },
    }
}

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        value: searchFilter,
        placeholderValue: 'Search...',
        onChange: changeSearchFilter,
    },
}