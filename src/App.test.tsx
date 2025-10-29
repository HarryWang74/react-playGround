import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('<App />', () => {
  it('renders the welcome heading', () => {
    render(<App />);

    const heading = screen.getByRole('heading', {
      name: /welcome to react playground/i,
    });

    expect(heading).toBeVisible();
  });
});
