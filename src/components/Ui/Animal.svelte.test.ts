import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Animal from './Animal.svelte';

describe('Animal Component', () => {
  const mockAnimal = {
    id: '1234',
    name: 'Fluffy',
    breeds: { primary: 'Maine Coon' },
    colors: { primary: 'Black' },
    contact: { address: { city: 'New York' } },
    photos: [{ large: '/images/cats/cat1.jpg' }]
  };

  const mockAnimalNoPhotos = {
    id: '5678',
    name: 'Whiskers',
    breeds: { primary: 'Siamese' },
    colors: { primary: 'White' },
    contact: { address: { city: 'Los Angeles' } },
    photos: []
  };

  it('renders animal with information and photo', () => {
    const { container } = render(Animal, { props: { animal: mockAnimal, type: 'cat' } });
    
    // Test link
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/pets/cat/1234');
    
    // Test text content
    expect(screen.getByText('Fluffy')).toBeInTheDocument();
    expect(screen.getByText('Maine Coon')).toBeInTheDocument();
    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    
    // Test image - using querySelector since the img has no role (alt is empty)
    const image = container.querySelector('img');
    expect(image).not.toBeNull();
    expect(image?.getAttribute('src')).toBe('/images/cats/cat1.jpg');
  });

  it('uses placeholder image when animal has no photos', () => {
    const { container } = render(Animal, { props: { animal: mockAnimalNoPhotos, type: 'cat' } });
    
    // Test image - using querySelector since the img has no role (alt is empty)
    const image = container.querySelector('img');
    expect(image).not.toBeNull();
    expect(image?.getAttribute('src')).toBe('/images/layout/placeholder/cat.png');
  });
});