import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders Dropdown component with initial options', async () => {
    render(<App />);

    // Open the dropdown
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      const dropdownButton = screen.getByRole('button');
      dropdownButton.click();
    });

    // Check for the presence of an option
    const option = await screen.findByText('Education 🎓');
    expect(option).toBeInTheDocument();

    // Additional checks for other options
    // ...
  });
});
