import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('<Button />', () => {
  it('renders with label text', () => {
    const { getByRole } = render(<Button label="Click me" />);

    expect(getByRole('button', { name: 'Click me' })).toBeVisible();
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const { getByRole } = render(
      <Button label="Click me" onClick={handleClick} />
    );

    await user.click(getByRole('button', { name: 'Click me' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as disabled when disabled prop is true', () => {
    const { getByRole } = render(<Button label="Disabled" disabled />);

    expect(getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });
});
