# Andrisca Property Services - File Structure

## 📁 Organized Folder Structure

```
andrisca-property-services/
│
├── 📄 index.html                    # Main homepage
├── 📄 thank-you.html                # Form submission thank you page
├── 📄 privacy-policy.html           # Privacy policy page
├── 📄 terms-of-service.html         # Terms of service page
├── 📄 cookie-policy.html            # Cookie policy page
├── 📄 README.md                     # Project documentation
│
├── 📁 assets/
│   │
│   ├── 📁 css/
│   │   └── styles.css               # Main stylesheet
│   │
│   ├── 📁 js/
│   │   └── script.js                # Main JavaScript file
│   │
│   ├── 📁 images/
│   │   ├── aps - logo .svg          # Main logo (SVG)
│   │   ├── aps-logo-transparent.svg # Transparent logo
│   │   ├── aps-logo.svg             # Alternative logo
│   │   ├── Logo.png                 # Logo PNG version
│   │   ├── og-image.jpg             # Social media preview image (1200×630)
│   │   ├── favicon-16x16.png        # Favicon 16px
│   │   ├── favicon-32x32.png        # Favicon 32px
│   │   ├── apple-touch-icon.png     # iOS home screen icon
│   │   ├── bathroom.jpg             # About section image
│   │   ├── Bathroom.png             # Bathroom video poster
│   │   ├── Garage to Annex.png      # Garage conversion video poster
│   │   ├── garage.png               # Garage video poster
│   │   ├── Orangrey.png             # Orangery video poster
│   │   ├── conservatory.png         # Conservatory video poster
│   │   ├── house.png                # House renovation video poster
│   │   ├── Hero.png                 # Hero section image
│   │   ├── background.png           # Background image
│   │   └── Screenshot...png         # Misc screenshot
│   │
│   └── 📁 videos/
│       ├── andrisca bathroom.mp4    # Bathroom renovation video
│       ├── Andrisca.mp4             # Main company video
│       ├── Conservatory.mp4         # Conservatory project video
│       ├── Garage to Annex.mp4      # Garage conversion video
│       ├── Garage.mp4               # Garage extension video
│       └── Orangry Extension.mp4    # Orangery extension video
```

## 📝 What Was Organized

### ✅ Before:
- All files mixed in root directory
- Hard to find specific assets
- Messy file structure

### ✅ After:
- **CSS** → `assets/css/`
- **JavaScript** → `assets/js/`
- **Images** → `assets/images/`
- **Videos** → `assets/videos/`
- **HTML pages** → Remain at root for proper navigation

## 🔗 Updated References

All file paths have been updated in:
- ✅ `index.html`
- ✅ `thank-you.html`
- ✅ Image sources
- ✅ Video sources
- ✅ CSS links
- ✅ JavaScript links
- ✅ Logo references
- ✅ Favicon links
- ✅ Open Graph images

## 🚀 Benefits

1. **Professional Structure** - Industry-standard organization
2. **Easy Maintenance** - Find files quickly
3. **Better Performance** - Easier to implement caching rules
4. **Scalability** - Easy to add more assets
5. **Clean Root** - Only essential files at root level

## 📱 Social Media Assets

- **og-image.jpg** is now at: `assets/images/og-image.jpg`
- Updated in meta tags with full URL for social sharing
- Proper dimensions: 1200×630 pixels

## 🎯 Deployment Ready

All paths are updated and tested. Ready to deploy to Netlify!

