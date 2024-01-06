import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown, { DropdownOption } from './Dropdown';

describe('Dropdown Component Tests', () => {
  const mockOptions = [
    { label: 'Option 1', icon: 'icon1' },
    { label: 'Option 2', icon: 'icon2' }
  ];
  let mockSetOptions = jest.fn();

  test('renders dropdown button and input', () => {
    render(<Dropdown options={mockOptions} setOptions={mockSetOptions} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('toggle dropdown menu', () => {
    render(<Dropdown options={mockOptions} setOptions={mockSetOptions} />);
    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.click(dropdownButton);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('input value change and add new option', () => {
    render(<Dropdown options={mockOptions} setOptions={mockSetOptions} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Option' } });
    expect(input.value).toBe('New Option');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockSetOptions).toHaveBeenCalledWith([...mockOptions, { label: 'New Option' }]);
  });

  // Additional tests can be added here
});
