# Star Wars Character Browser

A modern, responsive web application for exploring Star Wars characters using the [SWAPI (Star Wars API)](https://swapi.dev/). Built with React, TypeScript, Vite, and Redux Toolkit.

## 🚀 How to Run the Project

### Prerequisites

- Node.js (v20 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd zippee-assignment
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## ✨ What Was Implemented

### Core Features

1. **Character Listing**

   - Display Star Wars characters in a responsive grid layout
   - Pagination support for navigating through character pages
   - Loading states with skeleton components
   - Error handling for API failures

2. **Character Search**

   - Real-time search functionality
   - Search across multiple character attributes:
     - Name
     - Gender
     - Hair color
     - Skin color
     - Eye color
   - Client-side filtering for instant results

3. **Character Filtering**

   - Filter characters by gender
   - Dynamic filter options based on available data
   - Clear filters functionality
   - Results count display

4. **Character Details Modal**

   - Detailed character information view
   - Fetches and displays:
     - Basic information (name, height, mass, appearance details)
     - Homeworld details (planet name, terrain, climate, population)
     - Species information
     - Film, starship, and vehicle counts
   - Beautiful modal UI with character images

5. **Favorites System**

   - Add/remove characters to/from favorites
   - Visual indicator (heart icon) on character cards
   - Dedicated favorites page to view all saved characters
   - Persistent favorites stored in Redux state

6. **Authentication Page**

   - Login form with validation
   - Form handling using React Hook Form
   - Zod schema validation

7. **Responsive Design**
   - Mobile-first approach
   - Responsive grid layouts
   - Adaptive UI components
   - Touch-friendly interactions

### Bonus Features

1. **Advanced UI/UX Enhancements**

   - Smooth animations and transitions
   - Hover effects on character cards
   - Loading skeletons for better perceived performance
   - Empty states with helpful messages
   - Error boundaries and graceful error handling

2. **Character Image Handling**

   - Dynamic image generation using Picsum Photos
   - Fallback to placeholder images on load errors
   - Lazy loading for better performance

3. **Gender Badge System**

   - Visual gender indicators with icons
   - Color-coded badges for different genders
   - Custom utility functions for gender display

4. **Search & Filter Persistence**

   - Search query and filters stored in Redux state
   - State synchronization between local and global state

5. **Optimized Performance**
   - Memoized filtered results using `useMemo`
   - Callback optimization with `useCallback`
   - Efficient re-renders with React best practices

## 🏗️ Technology Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.2
- **State Management**: Redux Toolkit 2.10.1
- **Routing**: React Router DOM 7.9.6
- **Styling**: Tailwind CSS 4.1.17
- **UI Components**: Radix UI primitives
- **Form Handling**: React Hook Form 7.66.0 + Zod 4.1.12
- **HTTP Client**: Axios 1.13.2
- **Icons**: Lucide React 0.553.0

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── global/         # Global components (Navbar, Header, etc.)
│   ├── ui/             # Base UI components (Button, Card, Dialog, etc.)
│   ├── characer-card.tsx
│   ├── character-modal.tsx
│   ├── characters-pagination.tsx
│   └── login-form.tsx
├── pages/              # Page components
│   ├── home.tsx
│   ├── favorites.tsx
│   └── login.tsx
├── redux/              # Redux store and slices
│   ├── slices/        # Redux slices (auth, character)
│   ├── mooks/         # API mock/service layer
│   └── store/         # Store configuration
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
├── config/            # Configuration files
├── hooks/             # Custom React hooks
├── assets/            # Static assets
├── App.tsx            # Main app component
└── main.tsx           # Application entry point
```
