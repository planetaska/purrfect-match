import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import HomePage from './+page.svelte';

// Mock onMount to handle the zip_input binding issue
vi.mock('svelte', async () => {
  const actual = await vi.importActual('svelte');
  return {
    ...actual,
    onMount: vi.fn(),
  };
});

// Mock global fetch
vi.stubGlobal('fetch', vi.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({ zip: '12345' }),
  })
));

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the homepage with heading', () => {
    // Provide mock binding for zip_input
    render(HomePage, {
      props: {
        // Mock any props needed for the component
      }
    });
    
    // Use a more specific query for the heading text
    expect(screen.getByText('Because every happy tail begins with the right match.')).toBeInTheDocument();
    expect(screen.getByText('Find your perfect companion, not just any pet.')).toBeInTheDocument();
  });

  it('displays the main call-to-action buttons', () => {
    render(HomePage);
    
    const matchButton = screen.getByRole('link', { name: /match for me/i });
    const findButton = screen.getByRole('button', { name: /find near me/i });
    
    expect(matchButton).toBeInTheDocument();
    expect(findButton).toBeInTheDocument();
    expect(matchButton.getAttribute('href')).toBe('/match');
  });

  it('has a zip code search form that submits to pets page', () => {
    render(HomePage);
    
    // Find by class instead of role
    const form = document.querySelector('form[action="/pets"]');
    const zipInput = screen.getByPlaceholderText(/zip code/i);
    
    expect(form).not.toBeNull();
    expect(zipInput).toBeInTheDocument();
    expect(form?.getAttribute('action')).toBe('/pets');
  });
});