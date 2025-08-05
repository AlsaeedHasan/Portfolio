<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Portfolio Website Development Instructions

This is a portfolio website for a Back-End Engineer specializing in Django and Python. The website is built with modern HTML5, CSS3, and JavaScript, designed to be fully static and deployable on Netlify.

## Project Structure
- `index.html` - Main HTML file with all sections
- `styles.css` - Custom CSS with CSS variables for theming
- `script.js` - JavaScript for interactivity and animations
- `assets/` - Directory for resume and other static assets
- `netlify.toml` - Netlify configuration for deployment

## Key Features to Maintain
1. **Responsive Design**: Mobile-first approach using Tailwind CSS classes
2. **Dark/Light Mode**: Theme toggle with localStorage persistence
3. **Smooth Animations**: CSS animations and JavaScript-driven interactions
4. **Contact Form**: Netlify Forms integration (data-netlify="true")
5. **SEO Optimization**: Semantic HTML, meta tags, and proper structure

## Coding Guidelines
- Use semantic HTML5 elements
- Maintain accessibility (ARIA labels, keyboard navigation)
- Keep CSS organized with logical grouping
- Use modern JavaScript (ES6+) features
- Implement progressive enhancement
- Optimize for performance (minimize reflows/repaints)

## When making changes:
- Test responsive behavior on multiple screen sizes
- Verify dark/light mode functionality
- Check animation performance
- Validate HTML and CSS
- Test contact form functionality
- Ensure fast loading times

## Deployment Notes
- The site is static and requires no build process
- Netlify automatically handles form submissions
- All assets should be optimized for web
- Use CDN links for external dependencies
