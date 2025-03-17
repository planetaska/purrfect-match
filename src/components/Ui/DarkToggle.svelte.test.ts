import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import DarkToggle from './DarkToggle.svelte';

describe('DarkToggle Component', () => {
  it('renders the dark mode toggle', () => {
    render(DarkToggle);
    
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('class', 'theme-controller');
    expect(toggle).toHaveAttribute('value', 'dark');
  });

  it('has both sun and moon icons', () => {
    render(DarkToggle);
    
    // Check for SVG elements with specific classes
    const svgs = document.querySelectorAll('svg');
    
    // Find the sun and moon SVGs
    const sunSvg = Array.from(svgs).find(svg => 
      svg.classList.contains('swap-off'));
    const moonSvg = Array.from(svgs).find(svg => 
      svg.classList.contains('swap-on'));
      
    expect(sunSvg).toBeInTheDocument();
    expect(moonSvg).toBeInTheDocument();
  });

  it('allows toggling theme', async () => {
    render(DarkToggle);
    
    const toggle = screen.getByRole('checkbox');
    
    // Initial state should be unchecked
    expect(toggle).not.toBeChecked();
    
    // Toggle the checkbox
    await fireEvent.click(toggle);
    
    // Should now be checked
    expect(toggle).toBeChecked();
  });
});