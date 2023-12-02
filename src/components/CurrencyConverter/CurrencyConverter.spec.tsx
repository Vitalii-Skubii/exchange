/* eslint-disable testing-library/prefer-screen-queries */
// CurrencyConverter.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CurrencyConverter from './CurrencyConverter';

jest.mock('./CurrencyConverter.state', () => ({
  __esModule: true,
  default: jest.requireActual('./CurrencyConverter.state').default,
}));

describe('CurrencyConverter', () => {
  it('handles amount change', () => {
    render(<CurrencyConverter />);
    const getByLabelText = screen.getByLabelText;

    fireEvent.change(getByLabelText('Change'), { target: { value: '5' } });
  });

  it('handles currency change', () => {
    render(<CurrencyConverter />);
    const getByLabelText = screen.getByLabelText;

    fireEvent.change(getByLabelText('Get'), { target: { value: 'USD' } });
  });

  it('handles click on change button', () => {
    render(<CurrencyConverter />);
    const getByText = screen.getByText;

    fireEvent.click(getByText('Change'));
  });
});
