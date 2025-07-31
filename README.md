# Personal Website

A clean, responsive personal website built with React, TypeScript, and Vite.

## Features

- **Left Sidebar**: Personal information including avatar, contact details, and social links
- **Right Content Area**: Tabbed navigation with three main sections:
  - **Blog**: Recent blog posts with tags and excerpts
  - **Publications**: Academic papers and research publications
  - **Projects**: Portfolio of personal and professional projects
- **Clean White UI**: Minimalist design focusing on content and readability
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **TypeScript**: Full type safety throughout the application

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: CSS3 with custom properties
- **Development**: ESLint for code quality

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation


2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Quick Start Commands

For a quick local setup, run these commands in your terminal:

```bash
# Clone and navigate to the project
git clone https://github.com/yourusername/personal-website.git
cd personal-website

# Install dependencies and start dev server
npm install && npm run dev
```

The website will be available at `http://localhost:5173` with hot module replacement for instant updates during development.

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Customization

### Personal Information

Edit the props in `src/App.tsx` to customize your personal information:

```tsx
<PersonalInfo 
  name="Your Name"
  title="Your Title"
  email="your.email@example.com"
  // ... other props
/>
```

### Content Sections

Modify the content in `src/components/ContentArea.tsx` to add your own:
- Blog posts
- Publications
- Projects

### Styling

The website uses a clean white theme. You can customize colors and styling by modifying:
- `src/index.css` - Global styles
- `src/App.css` - Layout styles
- `src/components/*.css` - Component-specific styles

## Project Structure

```
src/
├── components/
│   ├── PersonalInfo.tsx     # Left sidebar component
│   ├── PersonalInfo.css
│   ├── ContentArea.tsx      # Right content area with tabs
│   └── ContentArea.css
├── App.tsx                  # Main application component
├── App.css                  # Application layout styles
├── index.css                # Global styles
└── main.tsx                 # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Deployment

### GitHub Pages

This website can be easily deployed to GitHub Pages:

1. Update the `vite.config.ts` to set the correct base path
2. Build the project: `npm run build`
3. Deploy the `dist` folder to GitHub Pages

### Other Platforms

The built website (in the `dist` folder) can be deployed to any static hosting service like:
- Vercel
- Netlify
- Firebase Hosting
- AWS S3

---

**Note**: Remember to replace placeholder content with your actual information and customize the styling to match your personal brand.
