# 1Above Cannabis Website

A modern, responsive website for 1Above premium cannabis products with an integrated admin panel for product management.

![1Above Logo](logo.png)

## 🌿 Features

### Public Website
- **Age Verification Gate** - Compliant age verification modal
- **Product Catalog** - Dynamic product display with category filtering
- **Certificates of Analysis (COA)** - Lab test results and product verification
- **Store Locator** - Find products at authorized retailers
- **Mobile Responsive** - Optimized for all devices
- **Modern Design** - Clean UI with brand colors (Green: #1C352D, Gold: #C8A951)

### Admin Panel
- **Product Management** - Add, edit, and delete products
- **Password Protected** - Secure access with login system
- **Import/Export** - JSON file management
- **Real-time Updates** - Changes reflect immediately
- **Browser Storage** - LocalStorage for session persistence

## 📁 Project Structure

```
1above-website/
├── index.html              # Main website
├── styles.css              # Main website styles
├── script.js               # Main website functionality
├── admin.html              # Admin panel (password protected)
├── admin-styles.css        # Admin panel styles
├── admin-script.js         # Admin panel functionality
├── products.json           # Product database
├── logo.png                # 1Above logo
├── .htaccess              # Optional: Server-level protection
└── .htpasswd              # Optional: Password file for .htaccess
```

## 🚀 Installation

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/1above-website.git
   cd 1above-website
   ```

2. **Add your logo**
   - Place your `logo.png` file in the root directory

3. **Serve locally** (choose one method)
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx http-server -p 8000
   ```

4. **Access the site**
   - Main site: `http://localhost:8000/index.html`
   - Admin panel: `http://localhost:8000/admin.html`

## 🔐 Admin Panel Setup

### Default Password
```javascript
Username: (none required)
Password: admin123
```

### Change Password
Edit `admin-script.js` line 4:
```javascript
const ADMIN_PASSWORD = 'your-secure-password';
```

### Enhanced Security (Recommended)

#### Option 1: .htaccess Protection

**Create `.htpasswd` file:**
```bash
htpasswd -c .htpasswd admin
```

**Create `.htaccess` file:**
```apache
<Files "admin.html">
AuthType Basic
AuthName "Admin Access - 1Above"
AuthUserFile /full/path/to/.htpasswd
Require valid-user
</Files>
```

Replace `/full/path/to/.htpasswd` with your actual server path.

#### Option 2: Rename Admin File
Rename `admin.html` to something obscure:
```
admin.html → manage-x7k2p9m3.html
```

## 📝 Product Management

### Adding Products

1. Access admin panel: `yoursite.com/admin.html`
2. Login with password
3. Click "Add New Product"
4. Fill in the form:
   - **Name**: Product name
   - **Description**: Product details
   - **Price**: Format as `$45.99`
   - **Emoji**: Single emoji (e.g., 💨)
   - **Category**: Select from dropdown
   - **Badge**: Optional (e.g., "Best Seller")
5. Click "Save Product"

### Exporting Products

1. Make changes in admin panel
2. Click "Export Products JSON"
3. Download `products.json`
4. Replace the file on your server

### products.json Format

```json
[
  {
    "id": 1,
    "name": "Premium Vape Cartridge",
    "description": "Smooth and potent vape experience with natural terpenes.",
    "price": "$45.99",
    "emoji": "💨",
    "category": "vapes",
    "badge": "Best Seller"
  }
]
```

**Categories:** `vapes`, `edibles`, `flower`, `concentrates`

## 🎨 Customization

### Brand Colors
Edit in CSS files:
```css
--green: #1C352D;
--gold: #C8A951;
--offwhite: #FAFAFA;
```

### Logo
Replace `logo.png` with your logo (recommended size: 200x200px, transparent PNG)

### Age Verification
Minimum age is set to 19. Change in `index.html` if needed.

## 🌐 Deployment

### Static Hosting (Recommended)

**Netlify:**
1. Connect GitHub repository
2. Deploy automatically
3. URL: `https://your-site.netlify.app`

**Vercel:**
1. Import Git repository
2. Deploy with one click
3. URL: `https://your-site.vercel.app`

**GitHub Pages:**
1. Go to repository Settings → Pages
2. Select branch: `main`
3. URL: `https://yourusername.github.io/1above-website`

### Traditional Hosting
Upload all files via FTP/cPanel to your web host.

## 🔒 Security Recommendations

- ✅ Change default admin password immediately
- ✅ Use .htaccess protection for admin panel
- ✅ Keep admin URL private
- ✅ Regular backups of `products.json`
- ✅ Use HTTPS (SSL certificate)
- ✅ Hide admin panel on production sites

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome)

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling (with mobile-first responsive design)
- **JavaScript (ES6+)** - Functionality
- **LocalStorage** - Client-side data persistence
- **JSON** - Data storage format

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: [your-email@example.com]

## ⚠️ Legal Compliance

This website template is designed for legal cannabis businesses operating in jurisdictions where cannabis is legal. Ensure compliance with all local laws and regulations regarding:
- Age verification requirements
- Cannabis marketing and advertising
- Product labeling and testing
- License requirements

## 🙏 Acknowledgments

- Inspired by modern cannabis brands
- Design influenced by Debunk.life
- Built for the legal cannabis industry

## 📊 Project Status

**Version:** 1.0.0  
**Status:** Production Ready  
**Last Updated:** 2024

---

**Made with 💚 for the cannabis industry**

For questions or custom development, please reach out!
