import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import MainNav from './MainNav.svelte';
import { zip } from '$utils/store';

// Mock $effect to avoid reactivity errors
vi.mock('svelte', async () => {
  const actual = await vi.importActual('svelte');
  return {
    ...actual,
    effect: vi.fn(),
  };
});

describe('MainNav Component', () => {
  const mockSupabase = {
    auth: {
      signOut: vi.fn().mockResolvedValue({ error: null })
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset zip store value
    zip.set('');
  });

  it('renders navigation with site name', () => {
    render(MainNav, { 
      props: { 
        supabase: mockSupabase, 
        user: null, 
        profile: null 
      } 
    });
    
    // Use a more specific selector to avoid duplicate text
    const siteNameElement = screen.getByText('Purrfect Match', { selector: 'span.text-blue-400' });
    expect(siteNameElement).toBeInTheDocument();
  });

  it('shows login/register links when user is not logged in', () => {
    render(MainNav, { 
      props: { 
        supabase: mockSupabase, 
        user: null, 
        profile: null 
      } 
    });
    
    // Get all register links (desktop and mobile) and test that at least one exists
    const registerLinks = screen.getAllByRole('link', { name: /register/i });
    const signInLinks = screen.getAllByRole('link', { name: /sign in/i });
    
    expect(registerLinks.length).toBeGreaterThan(0);
    expect(signInLinks.length).toBeGreaterThan(0);
  });

  it('shows the user menu when logged in', () => {
    render(MainNav, { 
      props: { 
        supabase: mockSupabase, 
        user: { id: '123' }, 
        profile: { full_name: 'John Doe' } 
      } 
    });
    
    expect(screen.getByText('J')).toBeInTheDocument();
    expect(screen.queryByText(/register/i, { selector: 'a' })).not.toBeInTheDocument();
  });

  it('includes zip code in pet search link when available', async () => {
    // Set zip code in the store
    zip.set('12345');
    
    render(MainNav, { 
      props: { 
        supabase: mockSupabase, 
        user: null, 
        profile: null 
      } 
    });
    
    const findPetLinks = screen.getAllByRole('link', { name: /find pet/i });
    expect(findPetLinks.length).toBeGreaterThan(0);
    expect(findPetLinks[0].getAttribute('href')).toBe('/pets?zip=12345');
  });

  it('has a button to open the mobile menu', () => {
    render(MainNav, { 
      props: { 
        supabase: mockSupabase, 
        user: null, 
        profile: null 
      } 
    });
    
    const menuButton = screen.getByRole('button', { name: /open main menu/i });
    expect(menuButton).toBeInTheDocument();
  });
});