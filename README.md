# 🐾 Purrfect Match

Find your purrfect pet companion based on your lifestyle and preferences!

## 📋 Description

Purrfect Match is a web application designed to connect potential pet owners with adoptable pets.
The app uses a matching mechanism to recommend pets based on user lifestyle and preferences, 
increasing the likelihood of successful pet adoptions.

## ✨ Features

- **Matching Quiz**: Find your ideal pet through a personalized questionnaire
- **User Accounts**: Create an account to save favorite matches and pet preferences
- **Advanced Filtering**: Search for pets by breed, size, age, and specific characteristics
- **Breed Information**: Learn detailed information about different pet breeds
- **Favorites**: Save pets you're interested in for future reference

## 🥞 Tech Stack

### Frontend
- **SvelteKit** - Fast, efficient front-end framework
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library

### Backend
- **SvelteKit** - Server-side rendering and API endpoints
- **Supabase** - PostgreSQL database for user accounts and preferences
- **PetFinder API** - External data source for pet listings

### Deployment
- **Vercel** - Hosting and CDN

## 🗿Site Structure

### User-Facing Site
- **Home**: Landing page with key features
- **Match for Me**: Questionnaire to find compatible pets
- **Find Pets**: Browse pets by category and breed
- **Pet Details**: View detailed information about specific pets
- **My Favorites**: Save and manage favorite pets
- **User Profile**: Manage account and preferences

### Admin Portal
- **Categories Management**: Create and manage pet categories
- **Breeds Management**: Add and edit breed information
- **User Management**: Admin tools for user accounts

## 👩‍💻 Development Setup

```bash
# Install dependencies
npm install

# Set up environment variables
touch .env
# Add your API keys to the .env file
# You will need these API keys:
# PUBLIC_SUPABASE_URL=""
# PUBLIC_SUPABASE_ANON_KEY=""
# PRIVATE_SUPABASE_SERVICE_KEY=""
# PRIVATE_PETFINDER_KEY="" # PetFinder API key
# PRIVATE_PETFINDER_SECRET="" # PetFinder API secret

# Start development server
npm run dev
```

## 🔑 API Integration

Purrfect Match uses the [PetFinder API](https://www.petfinder.com/developers/v2/docs/) to access pet adoption data:
- Authentication via access token
- 1,000 requests per day limit (50 per second)
- Rich data including pet type, breed, size, compatibility factors, and more

## 👥 Contributors

- Jing
- Aska

## 📄 License

[MIT License](LICENSE)

## 🙏 Acknowledgements

- [PetFinder API](https://www.petfinder.com/developers/v2/docs/) for providing access to their extensive pet adoption database
- [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/) for the awesome framework
- [Tailwind CSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/) for styling
- [Supabase](https://supabase.io/) for database services
- [Vercel](https://vercel.com/) for hosting