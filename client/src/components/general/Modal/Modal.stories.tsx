import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Modal, { ModalProps } from 'components/general/Modal/Modal';
import Button from 'components/general/Button/Button';

function SearchWrapper({
    children
}: ModalProps) {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(true);

    function changeModalStatus() {
        setIsOpenModal(currentStatus => !currentStatus)
    }

    return <div style={{
        display: 'flex',
        justifyContent: 'center',

        backgroundColor: 'var(--color-bg)',

        height: '500px',
        padding: '24px',
    }}
    >
        <div>
            <Button
                label={'Open modal'}
                onClick={changeModalStatus}
            />
        </div>
        {isOpenModal &&
            <Modal handleDismiss={changeModalStatus}>
                {children}
            </Modal>}
    </div>
}

const meta: Meta<typeof Modal> = {
    title: 'General/Modal',
    component: Modal,
    parameters: {
        layout: "fullscreen",
    },
    tags: ['autodocs'],
    argTypes: {
        handleDismiss: {
            description: 'Function for closing the form.',
            type: "function",
        },
        children: {
            description: 'The JSX.element displayed inside the modal window.'
        }
    }
}
export default meta;

type Story = StoryObj<typeof meta>;
export const Form: Story = {
    render: ({ handleDismiss }: ModalProps) => (
        <SearchWrapper handleDismiss={handleDismiss}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',

                backgroundColor: 'white',
                border: 'white 4px solid',
                borderRadius: '4px',
                
                height: '300px',
                width: '200px',

                padding: '16px',
            }}>
                <h1>This is opened form in modal!</h1> 
                <p>Click on the gray area behind the form.</p>
            </div>

        </SearchWrapper>
    ),
};

export const Text: Story = {
    render: ({ handleDismiss }: ModalProps) => (
        <SearchWrapper handleDismiss={handleDismiss}>
            <div style={{
                textAlign: 'center',
                color: 'white',
            }}>
                <h1>This is opened text in modal!</h1> 
                <p>Click on the gray area behind the text.</p>
            </div>
        </SearchWrapper>
    ),
};