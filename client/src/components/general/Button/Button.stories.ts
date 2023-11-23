import type { Meta, StoryObj } from '@storybook/react';

import Button from 'components/general/Button/Button';

import styles from 'components/general/Button/Button.module.scss';

const meta: Meta<typeof Button> = {
    title: 'General/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'Button label'
        },
        onClick: { 
            type: 'function',
            description: '(event: React.MouseEvent) => void',
            action: "onClick" 
        },
    },
}

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        label: 'Button',
    },
}

export const Titled: Story = {
    args: {
        label: 'Point at me',
        title: 'Button with special title',
    },
};

export const Disabled: Story = {
    args: {
        label: `Can't click`,
        title: 'This button is disabled.',
        disabled: true
    },
};

export const Submit: Story = {
    args: {
        label: `Send me`,
        title: 'This button for submit.',
        type: 'submit'
    },
};

export const Styled: Story = {
    args: {
        label: `Click me`,
        title: 'This button is styled.',
        className: styles.styledButton
    },
};