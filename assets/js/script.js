// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navClose = null;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Removed separate close button; hamburger acts as toggle

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form validation and submission with Netlify
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !service || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Get submit button and disable it
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Submit to Netlify using fetch
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => {
            if (response.ok) {
                // Redirect to thank you page
                window.location.href = '/thank-you.html';
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards for animation
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe about section for animation
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    aboutSection.style.opacity = '0';
    aboutSection.style.transform = 'translateY(30px)';
    aboutSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(aboutSection);
}

// Observe contact section for animation
const contactSection = document.querySelector('.contact');
if (contactSection) {
    contactSection.style.opacity = '0';
    contactSection.style.transform = 'translateY(30px)';
    contactSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(contactSection);
}

// Add loading animation for the page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click tracking for analytics (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // Here you would integrate with your analytics service
    // Example: gtag('event', eventName, eventData);
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('button_click', {
            button_text: buttonText,
            button_class: this.className
        });
    });
});

// Track form interactions
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('focus', function() {
        trackEvent('form_field_focus', {
            field_name: this.name,
            field_type: this.type
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('focus', function() {
        this.style.outline = '2px solid #5B7FA8';
        this.style.outlineOffset = '2px';
    });
    
    link.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Performance optimization: Lazy load images when they're added
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}

// Initialize Plyr Video Players
document.addEventListener('DOMContentLoaded', function() {
    const players = Array.from(document.querySelectorAll('.plyr-video')).map(video => {
        return new Plyr(video, {
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
            ratio: '9:16',
            autoplay: false,
            muted: false,
            clickToPlay: true,
            hideControls: true,
            resetOnEnd: true,
            volume: 1,
            storage: { enabled: true, key: 'plyr' },
            settings: [],
            speed: { selected: 1, options: [] },
            quality: { default: 'auto' }
        });
    });
    
    // Set initial volume and unmute on first play
    players.forEach((player, index) => {
        player.volume = 1;
        player.muted = false;
        
        // Unmute on first play
        player.once('play', () => {
            player.muted = false;
            player.volume = 1;
        });
        
        // Pause all other videos when one starts playing
        player.on('play', () => {
            players.forEach((otherPlayer, otherIndex) => {
                if (otherIndex !== index && !otherPlayer.paused) {
                    otherPlayer.pause();
                }
            });
        });
    });
});

// Cookie Banner Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieModal = document.getElementById('cookie-modal');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');
    const settingsBtn = document.getElementById('cookie-settings');
    const closeModal = document.getElementById('close-modal');
    const savePreferences = document.getElementById('save-preferences');
    const acceptAllModal = document.getElementById('accept-all-modal');

    // Check if user has already made a choice
    if (!getCookie('cookie-consent')) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    // Accept all cookies
    acceptBtn.addEventListener('click', function() {
        setCookie('cookie-consent', 'accepted', 365);
        setCookie('analytics-cookies', 'true', 365);
        setCookie('marketing-cookies', 'true', 365);
        hideBanner();
        loadAnalytics();
    });

    // Reject all cookies
    rejectBtn.addEventListener('click', function() {
        setCookie('cookie-consent', 'rejected', 365);
        setCookie('analytics-cookies', 'false', 365);
        setCookie('marketing-cookies', 'false', 365);
        hideBanner();
    });

    // Open settings modal
    settingsBtn.addEventListener('click', function() {
        cookieModal.classList.add('show');
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        cookieModal.classList.remove('show');
    });

    // Close modal when clicking outside
    cookieModal.addEventListener('click', function(e) {
        if (e.target === cookieModal) {
            cookieModal.classList.remove('show');
        }
    });

    // Save preferences
    savePreferences.addEventListener('click', function() {
        const analytics = document.getElementById('analytics-cookies').checked;
        const marketing = document.getElementById('marketing-cookies').checked;
        
        setCookie('cookie-consent', 'custom', 365);
        setCookie('analytics-cookies', analytics.toString(), 365);
        setCookie('marketing-cookies', marketing.toString(), 365);
        
        hideBanner();
        cookieModal.classList.remove('show');
        
        if (analytics) {
            loadAnalytics();
        }
    });

    // Accept all from modal
    acceptAllModal.addEventListener('click', function() {
        setCookie('cookie-consent', 'accepted', 365);
        setCookie('analytics-cookies', 'true', 365);
        setCookie('marketing-cookies', 'true', 365);
        hideBanner();
        cookieModal.classList.remove('show');
        loadAnalytics();
    });

    function hideBanner() {
        cookieBanner.classList.remove('show');
        setTimeout(() => {
            cookieBanner.style.display = 'none';
        }, 300);
    }

    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function loadAnalytics() {
        // Add your analytics code here (Google Analytics, etc.)
        console.log('Analytics cookies accepted - loading tracking scripts');
        // Example: gtag('config', 'GA_MEASUREMENT_ID');
    }
});

// Review Carousel using Slick Slider
$(document).ready(function() {
    $('.reviews-carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        pauseOnHover: true,
        pauseOnFocus: true,
        adaptiveHeight: true,
        fade: true,
        cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    dots: true
                }
            }
        ]
    });
    
    // Intersection Observer for animation
    const reviewsSection = document.querySelector('.reviews');
    if (reviewsSection) {
        reviewsSection.style.opacity = '0';
        reviewsSection.style.transform = 'translateY(30px)';
        reviewsSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        const reviewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        reviewObserver.observe(reviewsSection);
    }
});
