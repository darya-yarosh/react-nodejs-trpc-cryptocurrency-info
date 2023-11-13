import { screen, render, act } from "@testing-library/react";

import Modal from './Modal';
import userEvent from "@testing-library/user-event";

describe('Modal component module', () => {
    test('Has valid structure of childs', () => {
        render(
            <Modal handleDismiss={() => { }}>
                <p>Test element</p>
            </Modal>
        )

        const modalComponent = screen.getByTestId('modal');
        expect(modalComponent).toContainHTML('div');
        expect(modalComponent.childNodes[0].nodeName).toBe('DIV');
        expect(modalComponent.childNodes[1].nodeName).toBe('DIV');
        expect(modalComponent.childNodes[1]).toContainHTML('p');
        expect(modalComponent.childNodes[1].childNodes[0]).toHaveTextContent('Test element')
    })
    test('Closing when clicking on the backdrop', () => {
        let isClosed = false;
        function handleDismiss() {
            isClosed = true;
        }
        render(
            <Modal handleDismiss={handleDismiss}>
                <p>Test element</p>
            </Modal>
        )

        const backdropComponent = screen.getByTestId('modal-backdrop');
        const closeModal = () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() => {
                userEvent.click(backdropComponent);
            });
        }

        expect(isClosed).toBeFalsy();
        closeModal();
        expect(isClosed).toBeTruthy();
    })
    test('Not closing when clicking on the drawer', () => {
        let isClosed = false;
        function handleDismiss() {
            isClosed = true;
        }
        render(
            <Modal handleDismiss={handleDismiss}>
                <p>Test element</p>
            </Modal>
        )

        const drawerComponent = screen.getByTestId('modal-drawer');
        const clickToDrawer = () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() => {
                userEvent.click(drawerComponent);
            });
        }

        expect(isClosed).toBeFalsy();
        clickToDrawer();
        expect(isClosed).toBeFalsy();
    })
    test('Not closing when clicking on the modal', () => {
        let isClosed = false;
        function handleDismiss() {
            isClosed = true;
        }
        render(
            <Modal handleDismiss={handleDismiss}>
                <p>Test element</p>
            </Modal>
        )

        const modalComponent = screen.getByTestId('modal');
        const clickToModal = () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() => {
                userEvent.click(modalComponent);
            });
        }

        expect(isClosed).toBeFalsy();
        clickToModal();
        expect(isClosed).toBeFalsy();
    })
});