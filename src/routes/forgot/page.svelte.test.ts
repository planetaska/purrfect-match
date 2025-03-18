import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Forgot from './+page.svelte';

describe('forgot Page', () => {
  it('renders the forgot password form', () => {
    render(Forgot);
    
    expect(screen.getByText('Forgot Password')).toBeInTheDocument();
    expect(screen.getByText('Where should we send you a link for password reset?')).toBeInTheDocument();
  });

  it('has email input', () => {
    render(Forgot);
    const emailInput = document.getElementById('email');

    expect(emailInput).not.toBeNull();
    expect(emailInput?.getAttribute('type')).toBe('email');
  });

  it('has a submit button', () => {
    render(Forgot);
    
    const submitButton = document.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    expect(submitButton?.textContent).toContain('Submit');
  });
});