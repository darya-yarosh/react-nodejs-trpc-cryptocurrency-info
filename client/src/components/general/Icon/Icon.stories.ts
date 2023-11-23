import type { Meta, StoryObj } from '@storybook/react';

import Icon from 'components/general/Icon/Icon';

import confirmIcon from '../../../../public/images/buttons/confirm.svg';
import editIcon from '../../../../public/images/buttons/edit.svg';
import plusIcon from '../../../../public/images/buttons/plus.svg';
import removeIcon from '../../../../public/images/buttons/remove.svg';
import returnIcon from '../../../../public/images/buttons/return.svg';
import themeIcon from '../../../../public/images/buttons/theme.svg';

const meta: Meta<typeof Icon> = {
    title: 'General/Icon',
    component: Icon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        iconSVG: {
            type: 'string',
            description: 'Icon svg adress',
            defaultValue: '/images/imgNotFound.svg',
            control: {
                type: 'string'
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
        alt: {
            type: 'string',
            description: 'Alt text of icon',
            control: {
                type: 'string'
            }
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

export const Edit_With_Alt: Story = {
    args: {
        iconSVG: editIcon,
        alt: 'This is alt for edit icon'
    },
};

export const Add_With_Size_15PX: Story = {
    args: {
        iconSVG: plusIcon,
        sizePX: 15
    },
};

export const Remove_With_Size_50PX: Story = {
    args: {
        iconSVG: removeIcon,
        sizePX: 50
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