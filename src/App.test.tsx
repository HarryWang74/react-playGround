import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('<App />', () => {
  it('renders the hello heading', () => {
    render(<App />);

    const heading = screen.getByRole('heading', { name: /hello/i });

    expect(heading).toBeVisible();
  });
});
