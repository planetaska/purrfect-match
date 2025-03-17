import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Update from './+page.svelte';

describe('update Page', () => {
  it('renders the update form', () => {
    render(Update);
    
    expect(screen.getByText('Change Password')).toBeInTheDocument();
    expect(screen.getByText('Enter your new password')).toBeInTheDocument();
  });

  it('has two password inputs', () => {
    render(Update);
    const newpasswordInput = document.getElementById('new-password');
    const confirmpasswordInput = document.getElementById('confirm-password');

    expect(newpasswordInput).not.toBeNull();
    expect(newpasswordInput?.getAttribute('type')).toBe('password');
    expect(confirmpasswordInput).not.toBeNull();
    expect(confirmpasswordInput?.getAttribute('type')).toBe('password');
  });

  it('has a submit button', () => {
    render(Update);
    
    const submitButton = document.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    expect(submitButton?.textContent).toContain('Update password');
  });
});