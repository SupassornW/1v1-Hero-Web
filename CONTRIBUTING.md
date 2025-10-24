# Contributing to 1v1 Hero Picker

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Getting Started

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/1v1-hero-web.git
   cd 1v1-hero-web
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** to `http://localhost:5173`

## Project Structure

```
src/
├── components/      # React components
│   ├── UI/         # Reusable UI primitives
│   └── ...         # Feature components
├── context/        # React context for state management
├── hooks/          # Custom React hooks
├── styles/         # Theme and global styles
├── utils/          # Utility functions
└── types.ts        # TypeScript type definitions
```

## Code Style

### TypeScript

- Use TypeScript for all new files
- Enable strict mode (already configured)
- Provide proper types, avoid `any`

### React

- Use functional components with hooks
- Keep components focused and single-purpose
- Use proper prop types with TypeScript interfaces

### Styling

- Use `styled-components` for all styling
- Follow the existing theme structure
- Use theme values for colors, spacing, etc.

### Naming Conventions

- **Components**: PascalCase (e.g., `CharacterCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useLocalStorage.ts`)
- **Utils**: camelCase (e.g., `random.ts`)
- **Types**: PascalCase (e.g., `Character`)

## Making Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Use prefixes:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `style/` - Style/UI improvements

### 2. Make Your Changes

- Write clean, readable code
- Follow existing patterns and conventions
- Add comments for complex logic
- Keep commits focused and atomic

### 3. Test Your Changes

- Ensure the dev server runs without errors
- Test on multiple screen sizes (responsive)
- Test keyboard navigation
- Check browser console for errors

### 4. Commit Your Changes

Write clear commit messages:

```bash
git commit -m "feat: add character sorting feature"
git commit -m "fix: resolve selection limit bug"
git commit -m "docs: update README with new features"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting)
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Screenshots (if UI changes)
- Testing steps
- Related issue numbers

## What to Contribute

### Good First Issues

- Fix typos in documentation
- Improve error messages
- Add loading states
- Enhance accessibility
- Add unit tests

### Feature Ideas

- Sort/filter options (by name, recently added)
- Theme switcher (light/dark mode)
- Export selected heroes list
- History of previously picked heroes
- Character favorites
- Custom character upload

### Bug Reports

Include:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots/videos if applicable

## Accessibility Guidelines

All contributions must maintain accessibility:

- ✅ Proper semantic HTML
- ✅ ARIA labels where needed
- ✅ Keyboard navigation support
- ✅ Focus indicators visible
- ✅ Sufficient color contrast
- ✅ Responsive to screen readers

Test with:
- Keyboard only (no mouse)
- Screen reader (NVDA, JAWS, or VoiceOver)
- Browser accessibility tools

## Performance Guidelines

- Keep bundle size minimal
- Lazy load images
- Debounce expensive operations
- Avoid unnecessary re-renders
- Use pagination for large lists

## Review Process

1. Automated checks run on all PRs
2. Maintainer reviews code
3. Feedback/changes requested if needed
4. Once approved, PR is merged
5. Changes deployed automatically

## Questions?

- Open an issue for discussion
- Check existing issues/PRs first
- Be respectful and constructive

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

Thank you for contributing! 🎉

