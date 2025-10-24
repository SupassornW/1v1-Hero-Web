# 1v1 Hero Picker

A static character picker web application built with React, Vite, TypeScript, and styled-components. Select 5 heroes and randomly pick one for your next 1v1 match!

## Features

- 🔍 **Search & Filter**: Debounced search with real-time filtering (200ms delay)
- ✅ **Selection Management**: Select up to 5 characters with visual feedback
- 🎲 **Random Picker**: Randomly select one hero from your 5 chosen characters using cryptographically secure randomness
- 💾 **Persistence**: Selections and search terms saved to localStorage
- ⌨️ **Keyboard Navigation**: Full keyboard support with shortcuts
  - Press `/` to focus search
  - Arrow keys to navigate grid
  - Enter/Space to toggle selection
  - Esc to close modal
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- ♿ **Accessible**: WCAG compliant with proper ARIA labels and focus management
- 🎨 **Modern UI**: Clean, dark theme with smooth animations

## Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **TypeScript 5** - Type safety
- **styled-components 6** - CSS-in-JS styling with theming
- **GitHub Pages** - Static hosting

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
src/
├── components/
│   ├── UI/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Toast.tsx
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── CharacterCard.tsx
│   ├── CharacterGrid.tsx
│   ├── SelectedBar.tsx
│   ├── Actions.tsx
│   └── ResultModal.tsx
├── context/
│   └── AppContext.tsx   # Global state management
├── hooks/
│   ├── useDebouncedValue.ts
│   └── useLocalStorage.ts
├── utils/
│   ├── random.ts        # Cryptographically secure random picker
│   └── accessibility.ts  # Focus management & keyboard nav
├── styles/
│   ├── theme.ts         # Theme configuration
│   └── global.ts        # Global styles
├── App.tsx
└── main.tsx
public/
└── data/
    └── characters.json  # Character data (200+ heroes)
```

## Data Format

Characters are stored in `public/data/characters.json`:

```json
[
  {
    "name": "Shadow Assassin",
    "imageUrl": "https://example.com/image.jpg"
  }
]
```

## Customization

### Updating the Theme

Edit `src/styles/theme.ts` to customize colors, spacing, and other design tokens:

```typescript
export const theme = {
  colors: {
    bg: '#0f1222',
    panel: '#15193a',
    text: '#e6e8ff',
    accent: '#7c9cff',
    // ...
  },
  // ...
};
```

### Adding More Characters

Edit `public/data/characters.json` and add your hero data. Images can be hosted anywhere or use placeholder services.

## GitHub Pages Deployment

1. Update the `base` path in `vite.config.ts` to match your repository name
2. Run `npm run build` to create a production build
3. Run `npm run deploy` to publish to GitHub Pages
4. Enable GitHub Pages in your repository settings (source: gh-pages branch)

## Performance & Accessibility

- ✅ Lighthouse Performance Score: 90+
- ✅ Lighthouse Accessibility Score: 95+
- ✅ Lazy loading images with skeleton placeholders
- ✅ Pagination (60 items per page) for optimal DOM size
- ✅ Debounced search to reduce re-renders
- ✅ Respects `prefers-reduced-motion`
- ✅ High contrast text and visible focus indicators

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT

## Attribution

Character images sourced from [pravatar.cc](https://pravatar.cc) and [picsum.photos](https://picsum.photos) for demonstration purposes.

