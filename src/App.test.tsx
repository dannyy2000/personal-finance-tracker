import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
// import { expect } from '@vites/globals';


describe('Finance Tracker', () => {
  test('renders main components', () => {
    render(<App />);
    expect(screen.getByText('Finance Tracker')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Transaction' })).toBeInTheDocument();
  });

  test('adds new transaction', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Amount'), '100');
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));

    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  test('deletes transaction', async () => {
    render(<App />);
    const user = userEvent.setup();

    // Add transaction first
    await user.type(screen.getByLabelText('Amount'), '100');
    await user.click(screen.getByRole('button', { name: 'Add Transaction' }));

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(screen.queryByText('$100.00')).not.toBeInTheDocument();
  });
});