import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Register from './+page.svelte';

describe('Register Page', () => {
  it('renders the register form', () => {
    render(Register);
    
    expect(screen.getByText('Create new account')).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Full name')).toBeInTheDocument();
    expect(screen.getByText('Email address')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Location (Zip code)')).toBeInTheDocument();

  });

  it('has name, email, password, location inputs', () => {
    render(Register);
    
    const nameInput = document.getElementById('full_name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const locationInput = document.getElementById('location');

    expect(nameInput).not.toBeNull();
    expect(emailInput).not.toBeNull();
    expect(locationInput).not.toBeNull();
    expect(passwordInput).not.toBeNull();
    expect(emailInput?.getAttribute('type')).toBe('email');
    expect(passwordInput?.getAttribute('type')).toBe('password');
  });

  it('has a submit button', () => {
    render(Register);
    
    const submitButton = document.querySelector('button[type="submit"]');
    expect(submitButton).not.toBeNull();
    expect(submitButton?.textContent).toContain('Register');
  });

  it('has links to sign-in', () => {
    const { container } = render(Register);
    
    const signinLink = container.querySelector('a[href="/sign-in"]');
    const forgotPasswordLink = container.querySelector('a[href="/forgot"]');
    
    expect(signinLink).not.toBeNull();
    expect(forgotPasswordLink).not.toBeNull();
    expect(signinLink?.textContent).toContain('Sign in!');
    expect(forgotPasswordLink?.textContent).toContain('Forgot password');
  });

  it('has a remember me checkbox', () => {
    render(Register);
    
    const rememberMeCheckbox = document.getElementById('remember-me');
    expect(rememberMeCheckbox).not.toBeNull();
    expect(rememberMeCheckbox?.getAttribute('type')).toBe('checkbox');
  });

  it('form submits to correct auth endpoint', () => {
    const { container } = render(Register);
    
    const form = container.querySelector('form[action="/auth?/register"]');
    expect(form).not.toBeNull();
    expect(form?.getAttribute('method')).toBe('POST');
  });
});