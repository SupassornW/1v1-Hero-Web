# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-24

### Added

- Initial release of 1v1 Hero Picker
- Character browsing with grid layout (200+ heroes)
- Real-time search with debouncing (200ms)
- Character selection system (max 5)
- Random hero picker using crypto.getRandomValues
- LocalStorage persistence for selections and search
- Responsive design for mobile, tablet, and desktop
- Keyboard navigation and shortcuts
  - `/` to focus search
  - Arrow keys for grid navigation
  - Enter/Space to toggle selection
  - Esc to close modal
- Accessibility features
  - ARIA labels and roles
  - Focus management
  - Screen reader support
  - High contrast mode
  - Reduced motion support
- Lazy loading images with skeleton placeholders
- Pagination (60 items per page)
- Toast notifications for user feedback
- Result modal with animation
- Dark theme with styled-components
- GitHub Pages deployment workflow
- Comprehensive documentation

### Features

- **Search & Filter**: Instant search with debounce
- **Selection Management**: Visual feedback for selected heroes
- **Random Picker**: Cryptographically secure random selection
- **Persistence**: Save selections between sessions
- **Keyboard Support**: Full keyboard navigation
- **Responsive**: Works on all screen sizes
- **Accessible**: WCAG 2.1 AA compliant
- **Performance**: Lighthouse score 90+ (Performance & Accessibility)

### Technical

- React 18.3
- Vite 5.4
- TypeScript 5.6
- styled-components 6.1
- GitHub Actions CI/CD
- ESLint configuration
- TypeScript strict mode

## [Unreleased]

### Planned

- Light/dark theme toggle
- Sort and filter options
- Character favorites
- Export selected heroes
- History of picks
- Custom character upload
- Unit tests
- E2E tests

