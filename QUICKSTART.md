# Quick Start Guide

Get the 1v1 Hero Picker up and running in 5 minutes!

## 📋 Prerequisites

- Node.js 18 or higher ([Download](https://nodejs.org/))
- npm (comes with Node.js)
- A code editor (VS Code recommended)

## 🚀 Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages:
- React 18
- Vite 5
- TypeScript 5
- styled-components 6
- And dev dependencies

### Step 2: Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

You should see:
- ✅ Hero Picker interface
- ✅ Search bar
- ✅ 200+ character cards
- ✅ Selection bar at the bottom

### Step 3: Try It Out!

1. **Search for a hero**: Type in the search bar (try "Shadow" or "Dragon")
2. **Select 5 heroes**: Click on character cards to select them
3. **Pick random**: Once you have 5 selected, click "🎲 Random Pick"
4. **View result**: See your randomly chosen hero in the modal!

## 📁 Project Structure

```
1v1-hero-web/
├── src/
│   ├── components/      # All UI components
│   ├── context/         # State management
│   ├── hooks/           # Custom hooks
│   ├── styles/          # Theme & global styles
│   ├── utils/           # Helper functions
│   └── App.tsx          # Main app component
├── public/
│   └── data/
│       └── characters.json  # Hero data (customize this!)
└── package.json
```

## 🎨 Customization

### Update Characters

Edit `public/data/characters.json`:

```json
[
  {
    "name": "Your Hero Name",
    "imageUrl": "https://your-image-url.com/hero.jpg"
  }
]
```

### Change Theme Colors

Edit `src/styles/theme.ts`:

```typescript
export const theme = {
  colors: {
    bg: '#0f1222',        // Background
    panel: '#15193a',     // Card background
    text: '#e6e8ff',      // Text color
    accent: '#7c9cff',    // Accent color
    danger: '#ff6b6b',    // Delete/error
    muted: '#95a1c3',     // Secondary text
  },
  // ...
};
```

## 🧪 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy to GitHub Pages |

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus search bar |
| `Arrow Keys` | Navigate character grid |
| `Enter` / `Space` | Select/deselect character |
| `Esc` | Close modal |

## 🌐 Deployment to GitHub Pages

### Quick Deploy

1. **Update repository name** in `vite.config.ts`:
   ```typescript
   base: '/your-repo-name/'
   ```

2. **Build and deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: `gh-pages` branch
   - Save

Your site will be live at: `https://your-username.github.io/your-repo-name/`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🔧 Troubleshooting

### Port Already in Use

If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Build Errors

Check TypeScript errors:
```bash
npx tsc --noEmit
```

### Data Not Loading

- Ensure `public/data/characters.json` exists
- Check browser console for errors
- Verify JSON is valid (use [JSONLint](https://jsonlint.com/))

### Images Not Loading

- Check image URLs are accessible
- Use HTTPS URLs (not HTTP)
- Consider using placeholder services:
  - [pravatar.cc](https://pravatar.cc)
  - [picsum.photos](https://picsum.photos)
  - [UI Avatars](https://ui-avatars.com/)

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [styled-components Docs](https://styled-components.com/docs)

## 🆘 Need Help?

- Read the [README.md](./README.md)
- Check [CONTRIBUTING.md](./CONTRIBUTING.md)
- Review [DEPLOYMENT.md](./DEPLOYMENT.md)
- Open an issue on GitHub

## ✨ Next Steps

- [ ] Customize character data
- [ ] Update theme colors
- [ ] Deploy to GitHub Pages
- [ ] Add more features (see CHANGELOG.md)
- [ ] Share with friends!

---

**Happy hero picking!** 🎲🎉

