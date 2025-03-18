import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import PreferencesForm from './PreferencesForm.svelte';

// Mock superForm
vi.mock('sveltekit-superforms', () => {
  return {
    superForm: vi.fn(() => ({
      form: {
        subscribe: vi.fn(fn => {
          fn({
            size: [],
            age: [],
            gender: '',
            coat: '',
            env_children: false,
            env_dogs: false,
            env_cats: false
          });
          return { unsubscribe: vi.fn() };
        })
      },
      message: {
        subscribe: vi.fn(fn => {
          fn('');
          return { unsubscribe: vi.fn() };
        })
      },
      enhance: vi.fn(),
      delayed: {
        subscribe: vi.fn(fn => {
          fn(false);
          return { unsubscribe: vi.fn() };
        })
      }
    }))
  };
});

describe('PreferencesForm Component', () => {
  it('renders form with accessible fieldsets and legends', () => {
    render(PreferencesForm, { props: { data: {} } });
    
    // Test fieldset legends
    expect(screen.getByText('Size')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    
    // Test checkbox labels in Size fieldset
    expect(screen.getByLabelText('Small')).toBeInTheDocument();
    expect(screen.getByLabelText('Medium')).toBeInTheDocument();
    expect(screen.getByLabelText('Large')).toBeInTheDocument();
    expect(screen.getByLabelText('Extra Large')).toBeInTheDocument();
    
    // Test checkbox labels in Age fieldset
    expect(screen.getByLabelText('Baby')).toBeInTheDocument();
    expect(screen.getByLabelText('Young')).toBeInTheDocument();
    expect(screen.getByLabelText('Adult')).toBeInTheDocument();
    expect(screen.getByLabelText('Senior')).toBeInTheDocument();
  });
  
  it('renders form with accessible select elements', () => {
    render(PreferencesForm, { props: { data: {} } });
    
    // Test select elements have associated labels
    const genderSelect = screen.getByLabelText('Gender');
    expect(genderSelect).toBeInTheDocument();
    expect(genderSelect.tagName.toLowerCase()).toBe('select');
    
    const coatSelect = screen.getByLabelText('Coat');
    expect(coatSelect).toBeInTheDocument();
    expect(coatSelect.tagName.toLowerCase()).toBe('select');
  });
  
  it('renders environmental checkboxes with proper labels', () => {
    render(PreferencesForm, { props: { data: {} } });
    
    // Test environment checkbox labels
    const childrenCheckbox = screen.getByLabelText('Children in environment?');
    expect(childrenCheckbox).toBeInTheDocument();
    expect(childrenCheckbox).toHaveAttribute('type', 'checkbox');
    
    const dogsCheckbox = screen.getByLabelText('Dogs in environment?');
    expect(dogsCheckbox).toBeInTheDocument();
    expect(dogsCheckbox).toHaveAttribute('type', 'checkbox');
    
    const catsCheckbox = screen.getByLabelText('Cats in environment?');
    expect(catsCheckbox).toBeInTheDocument();
    expect(catsCheckbox).toHaveAttribute('type', 'checkbox');
  });
  
  it('has an accessible submit button', () => {
    render(PreferencesForm, { props: { data: {} } });
    
    const submitButton = screen.getByRole('button', { name: 'Save' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });
});