import { screen, render } from "@testing-library/react";

import Select from "./Select";

describe('Select component module', () => {
    test('Has valid structure of childs', () => {
        const options = ['1', '2', '3']
        render(<Select
            label={"Test label"}
            name={"Test name"}
            options={options}
            selectedOption={"2"}
            onChange={() => { }}
        />)

        const selectElement = screen.getByTestId('select');
        expect(selectElement.hasChildNodes()).toBeTruthy();

        expect(selectElement).toContainHTML('label');
        expect(selectElement).toContainHTML('select');
        expect(selectElement).toContainHTML('option');
    })
    test('Is selected specified option', () => {
        render(<Select
            label={"Test label"}
            name={"Test name"}
            options={['1', '2', '3']}
            selectedOption={'2'}
            onChange={() => { }}
        />)

        const selectElement = screen.getByTestId('select');
        expect(selectElement.childNodes[1]).toHaveValue('2');
        expect(selectElement.childNodes[1]).not.toHaveValue('1');
        expect(selectElement.childNodes[1]).not.toHaveValue('3');
    })
    test('Has label', () => {
        render(<Select
            label={"Test label"}
            name={"Test name"}
            options={['1', '2', '3']}
            onChange={() => { }}
        />)

        const selectElement = screen.getByTestId('select');
        expect(selectElement.childNodes[0]).toHaveTextContent('Test label');
    })
    test(`Hasn't label`, () => {
        render(<Select
            label={""}
            name={""}
            options={['1', '2', '3']}
            onChange={() => { }}
        />)

        const selectElement = screen.getByTestId('select');
        expect(selectElement.childNodes[0]).not.toHaveTextContent('Test label');
    })
});