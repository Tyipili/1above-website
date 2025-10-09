# 1Above - Premium Cannabis Products Website

![1Above Logo](imqages\logo.png)

A professional, responsive website for 1Above cannabis products featuring an age verification system, product catalogs, and certificate of analysis (COA) lookup functionality.

## Project Overview

This is a single-page application (SPA) website built with vanilla HTML, CSS, and JavaScript. The site showcases 1Above's premium cannabis product lines including Juice Bar vapes, Live Rosin concentrates, and Hash Hole infused pre-rolls. It provides customers with detailed product information, retailer locations, and access to quality assurance certificates.

## Key Features

### Age Verification
- Compliant age gate on initial page load
- Session-based verification using localStorage
- Cannot be bypassed without user interaction

### Product Showcases
- **Juice Bar Rosin AIO** - 0.5g vaporizer devices
- **73u Live Rosin** - 1g solventless concentrates  
- **Hash Hole** - 2g infused pre-rolls

Each product page includes:
- High-resolution product imagery with thumbnail gallery
- THC/CBD content gauges with visual indicators
- Detailed product specifications
- Growing and extraction process information
- Expandable "Learn More" sections

### Interactive Features
- Responsive mobile-first design
- Hamburger navigation menu for mobile devices
- Dynamic page routing without page reloads
- Smooth animations and transitions
- Image gallery with thumbnail switching

### Certificate of Analysis (COA)
- Search functionality by lot number
- Browse COAs by product type
- Direct PDF document links
- Product variant tracking

### Retailer Locator
- Integration with HiBuddy retailer network
- Direct links to purchase locations

## Technology Stack

### Frontend
- **HTML5** - Semantic markup with UTF-8 encoding
- **CSS3** - Custom responsive design with mobile-first approach
- **JavaScript (ES6+)** - Vanilla JS, no frameworks

### Design Features
- Custom color palette (Dark Green: #1C352D, Gold: #C8A951)
- Google Fonts integration (Helvetica Neue fallback)
- SVG graphics for scalable icons
- CSS animations and transitions
- Responsive breakpoints: 968px, 768px, 640px, 480px

### No Dependencies
- Zero external JavaScript libraries
- No build process required
- Pure vanilla code for maximum performance

## Project Structure

```
1above-website/
├── index.html              # Main HTML file (single-page app)
├── styles.css              # All styling and responsive design
├── script.js               # All JavaScript functionality
├── favicon.ico             # Browser favicon
├── images/                 # All visual assets
│   ├── logo.png           # 1Above brand logo
│   ├── products/          # Product photography
│   │   ├── hashhole-joint.jpg
│   │   ├── hashhole-tube.jpg
│   │   ├── hashhole-packaging.jpg
│   │   ├── juicebar-device.jpg
│   │   ├── juicebar-package.jpg
│   │   ├── juicebar-box.jpg
│   │   ├── liverosin-product.jpg
│   │   ├── liverosin-jar.jpg
│   │   └── liverosin-jar-label.jpg
│   └── documents/         # Certificates and PDFs
│       ├── hashhole-coa.pdf
│       ├── juicebar-coa.pdf
│       └── liverosin-coa.pdf
└── README.md              # This file
```

### File Organization

**HTML Structure**
- Single HTML file with multiple page containers
- Pages toggled via CSS display property
- Semantic HTML5 elements throughout

**CSS Architecture**
- Mobile-first responsive design
- Component-based class naming
- Media queries at end of file
- Mobile menu styles must remain last (marked with comment)

**JavaScript Modules**
- Age verification system
- Page navigation router
- Mobile menu toggle
- Image gallery functionality
- Product detail toggles (3 separate functions for each product)

## Installation & Setup

### Prerequisites
- Web server (Apache, Nginx, or equivalent)
- Modern web browser with JavaScript enabled
- No Node.js or npm required

### Local Development

1. **Clone or download the repository**
   ```bash
   git clone [repository-url]
   cd 1above-website
   ```

2. **Verify folder structure**
   Ensure the `images/` folder structure exists:
   ```bash
   images/
   ├── logo.png
   ├── products/
   └── documents/
   ```

3. **Start a local server**
   
   Option A - Python:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   Option B - PHP:
   ```bash
   php -S localhost:8000
   ```
   
   Option C - VS Code Live Server extension

4. **Open in browser**
   ```
   http://localhost:8000
   ```

### File Encoding
All files must use UTF-8 encoding to display special characters correctly (©, ›, etc.)

## Development Guidelines

### Code Style

**HTML**
- Use semantic HTML5 elements
- Maintain proper indentation (4 spaces)
- Include alt text for all images
- Keep inline event handlers for simplicity (onclick, etc.)

**CSS**
- Mobile-first approach
- Use clamp() for responsive font sizes
- Maintain consistent spacing units
- Group related styles together
- **Critical:** Do not modify the mobile menu section at the bottom

**JavaScript**
- Use camelCase for variables and functions
- Keep functions focused and single-purpose
- Add comments for complex logic
- Maintain consistency in toggle functions

### Adding New Products

To add a new product line:

1. **Add images** to `images/products/`
   - Main product image
   - Product variations/angles
   - Packaging shots

2. **Add COA PDF** to `images/documents/`

3. **Create product page** in `index.html`
   - Copy existing product page structure
   - Update all IDs to be unique
   - Update image paths

4. **Add JavaScript functions** in `script.js`
   - Create `changeProductImage()` function
   - Create `toggleProductDetails()` function
   - Add page to `showPage()` function's pageMap

5. **Add navigation link** in navigation menu

6. **Add footer link** if appropriate

### Responsive Design

The site uses breakpoints at:
- **968px** - Tablet/product page adjustments
- **768px** - Mobile navigation activates
- **640px** - Small tablet refinements
- **480px** - Small phone optimizations

Test all changes across these breakpoints.

### Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android 8+)

## Architecture & How It Works

### Single Page Application (SPA)

The website uses a simple SPA architecture without a framework:

1. **All content loads on page load** - No separate HTML files
2. **Page containers** - Each "page" is a hidden div with class `page-container`
3. **JavaScript routing** - `showPage()` function toggles visibility
4. **No URL changes** - Hash-based or pushState routing not implemented

### Page Navigation System

```javascript
showPage('products') 
→ Hides all .page-container elements
→ Shows #productsPage element
→ Scrolls to top
```

### Age Verification

```javascript
// First visit
User clicks "I AM 19+" 
→ localStorage.setItem('ageVerified', 'true')
→ Age gate hidden

// Return visit  
→ Check localStorage
→ Skip age gate if verified
```

**Security Note:** This is client-side only. Server-side verification recommended for production.

### Image Gallery System

Each product has its own set of functions:
- `changeProductImage()` - Hash Hole
- `changeJuicebarImage()` - Juice Bar
- `changeLiverosinImage()` - Live Rosin

This approach keeps each product's state independent.

### Mobile Menu

The hamburger menu uses:
1. **CSS classes** for styling
2. **JavaScript toggle** for .active state
3. **Flexbox order property** for layout
4. **Fixed positioning** for slide-in effect

The mobile menu CSS **must remain at the bottom** of styles.css with `!important` declarations to override conflicting styles.

## Deployment

### Pre-Deployment Checklist

- [ ] All images optimized and in correct folders
- [ ] COA PDFs uploaded to `images/documents/`
- [ ] Test age verification on fresh browser session
- [ ] Test all product pages and image galleries
- [ ] Test mobile menu on various screen sizes
- [ ] Verify all external links (HiBuddy, etc.)
- [ ] Test COA PDF downloads
- [ ] Check browser console for errors
- [ ] Verify UTF-8 encoding on all files

### Server Requirements

**Minimum Requirements:**
- Web server (Apache/Nginx/IIS)
- PHP support (optional, not required for site function)
- HTTPS recommended for production

**Server Configuration:**
- Enable gzip compression
- Set proper MIME types for all file types
- Configure caching headers for static assets
- Enable HTTPS and force redirect from HTTP

**Apache .htaccess example:**
```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript
</IfModule>
```

### Deployment Steps

1. **Upload all files** maintaining folder structure
2. **Set file permissions:**
   - Files: 644
   - Directories: 755
3. **Test the live site** using the checklist above
4. **Monitor server logs** for any 404 errors
5. **Test from multiple devices** and browsers

### Performance Optimization

For production, consider:
- Image compression (use WebP format with JPG fallback)
- Minify CSS and JavaScript
- Implement lazy loading for images
- Add service worker for offline functionality
- Use CDN for static assets

## Troubleshooting

### Common Issues

**Images not displaying:**
- Check file paths are correct (case-sensitive)
- Verify images are in `images/products/` folder
- Check file extensions match exactly (.jpg not .JPG)

**Age gate not saving:**
- localStorage must be enabled in browser
- Check browser console for errors
- Clear browser cache and test again

**Mobile menu not working:**
- Ensure mobile menu CSS is at bottom of styles.css
- Check JavaScript console for errors
- Verify hamburger button has correct ID

**Product details not expanding:**
- Check unique IDs for each product page
- Verify JavaScript functions are named correctly
- Look for console errors

**Special characters displaying incorrectly:**
- Verify all files saved as UTF-8
- Check `<meta charset="UTF-8">` in HTML
- Convert files if showing as ANSI or Windows-1252

### Browser Console Errors

Open browser Developer Tools (F12) and check:
1. **Console tab** - JavaScript errors
2. **Network tab** - Failed resource loads (404s)
3. **Elements tab** - Verify DOM structure

## Version History

### Current Version
- Age verification system
- Three product lines with detailed pages
- COA lookup and download system
- Responsive design with mobile menu
- Organized image folder structure
- UTF-8 encoding fixes

## Notes for Stakeholders

### Content Management

To update content without a developer:

**Product Information:**
- Edit text directly in `index.html`
- Look for product names and descriptions
- Update percentages and mg/g values as needed

**Images:**
- Replace images in `images/products/` folder
- Keep same filename or update in HTML
- Recommended size: 1200x1200px minimum

**COA Documents:**
- Upload new PDFs to `images/documents/`
- Keep filename format: `productname-coa.pdf`

**Contact a developer for:**
- Adding new product pages
- Changing site structure
- Adding new features
- Complex styling changes

### Analytics & Tracking

The site currently has no analytics installed. Consider adding:
- Google Analytics 4
- Facebook Pixel
- Conversion tracking
- Heat mapping tools

### Future Enhancements

Potential improvements:
- Content Management System (CMS) integration
- E-commerce functionality
- Advanced COA search with filters
- Customer accounts and login
- Product reviews system
- Newsletter signup
- Social media integration
- Blog/news section

### Maintenance Schedule

Recommended maintenance tasks:
- **Weekly:** Check for broken links
- **Monthly:** Update product information and COAs
- **Quarterly:** Review analytics and user behavior
- **Annually:** Major design refresh evaluation

---

**Last Updated:** October 2025  
**Project Status:** Active Development
