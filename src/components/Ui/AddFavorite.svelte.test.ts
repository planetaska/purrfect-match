import { describe, test, expect, vi, it} from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import AddFavorites from './AddFavorite.svelte';

describe('AddToFavorites.svelte', () => {
    // Mock supabase and user
    const mockSupabase = {
      from: vi.fn().mockReturnThis(),
      insert: vi.fn().mockResolvedValue({ data: [], error: null }),
    };
  
    const mockUser = { id: 'aebdnfd' };
    const mockAnimal = {
      id: '223759',
      name: 'Cash',
      type: 'dog',
      description: 'Cash wants love',
      photos: [{ large: 'photo_url' }],
      url: 'https://petfinder.com/223759',
    };

    it('should call addToFav function when button clicked', async() => {
        render(AddFavorites, {
            props: {supabase: mockSupabase, user: mockUser, animal: mockAnimal },
        });

        // Mock the addToFav function
        const addToFavButton = screen.getByLabelText('Add to favorite');
        await fireEvent.click(addToFavButton);

        // Verify that supabase.insert was called with the correct parameters
        expect(mockSupabase.from).toHaveBeenCalledWith('favorites');
        expect(mockSupabase.insert).toHaveBeenCalledWith({
        id: mockUser.id,
        petID: mockAnimal.id,
        petName: mockAnimal.name,
        petType: mockAnimal.type,
        petDescription: mockAnimal.description,
        petPhoto: mockAnimal.photos[0].large,
        petURL: mockAnimal.url,
        });

        // Check if the alert for success was called (You may want to mock alert here too)
        // expect(global.alert).toHaveBeenCalledWith('Pet added successfully!');
    });

    it('should handle error when supabase insert fails', async () => {
      // spy on console.error
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Simulate an error in the insert function
      mockSupabase.insert.mockResolvedValueOnce({ data: null, error: { code: '42501' } });
  
      render(AddFavorites, {
        props: { supabase: mockSupabase, user: mockUser, animal: mockAnimal },
      });
  
      const addToFavButton = screen.getByLabelText('Add to favorite');
      await fireEvent.click(addToFavButton);
      
      // Verify if the error handling logic is triggered (e.g., alert for failure)
      expect(errorSpy).toHaveBeenCalledWith('Error adding pet', { code: '42501' });
    });
});