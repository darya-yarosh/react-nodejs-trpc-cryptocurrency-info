import type { Meta, StoryObj } from '@storybook/react';

import Graphic from './Graphic';

import 'components/general/Graphic/Graphic.module.scss';
import 'App.scss'

const meta: Meta<typeof Graphic> = {
    title: 'General/Graphic',
    component: Graphic,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export default meta;

const title = 'Price'
const chartData = [100, 120, 112, 98, 103];
const labels = ['19.11.2023', '20.11.2023', '21.11.2023', '22.11.2023', '23.11.2023']

type Story = StoryObj<typeof meta>;
export const Default_Graphic: Story = {
    args: {
        title: title,
        chartData: chartData,
        labels: labels
    },
}