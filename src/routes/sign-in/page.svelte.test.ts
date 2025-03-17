import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SignInPage from './+page.svelte';

describe('Sign In Page', () => {
  it('renders the sign in form', () => {
    render(SignInPage);
    
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByText('Not a member?')).toBeInTheDocument();
  });

  it('has email and password inputs', () => {
    render(SignInPage);
    
    // Find by id instead of label to avoid potential label issues
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    expect(emailInput).not.toBeNull();
    expect(passwordInput).not.toBeNull();
    expect(emailInput?.getAttribute('type')).toBe('email');
    expect(passwordInput?.getAttribute('type')).toBe('password');
  });

  it('has a submit button', () => {
    render(SignInPage);
    
    // Use querySelector to find the submit button instead of role
    const submitButton = document.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    expect(submitButton?.textContent).toContain('Sign in');
  });

  it('has links to register and forgot password', () => {
    const { container } = render(SignInPage);
    
    // Use more specific selectors
    const registerLink = container.querySelector('a[href="/register"]');
    const forgotPasswordLink = container.querySelector('a[href="/forgot"]');
    
    expect(registerLink).not.toBeNull();
    expect(forgotPasswordLink).not.toBeNull();
    expect(registerLink?.textContent).toContain('Join today');
    expect(forgotPasswordLink?.textContent).toContain('Forgot password');
  });

  it('has a remember me checkbox', () => {
    render(SignInPage);
    
    // Find by id instead of label
    const rememberMeCheckbox = document.getElementById('remember-me');
    expect(rememberMeCheckbox).not.toBeNull();
    expect(rememberMeCheckbox?.getAttribute('type')).toBe('checkbox');
  });

  it('form submits to correct auth endpoint', () => {
    const { container } = render(SignInPage);
    
    // Use querySelector to find the form
    const form = container.querySelector('form[action="/auth?/sign_in"]');
    expect(form).not.toBeNull();
    expect(form?.getAttribute('method')).toBe('POST');
  });
});