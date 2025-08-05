// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initSmoothScrolling();
    initSkillAnimations();
    initScrollAnimations();
    initContactForm();
    initScrollProgress();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;
    
    // Apply initial theme
    if (currentTheme === 'dark') {
        html.classList.add('dark');
        html.setAttribute('data-theme', 'dark');
    } else {
        html.classList.remove('dark');
        html.setAttribute('data-theme', 'light');
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const isDark = html.classList.contains('dark');
        
        if (isDark) {
            html.classList.remove('dark');
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('show');
        
        // Toggle icon
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('show');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skill Progress Bar Animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animate')) {
                const width = bar.style.width;
                bar.style.setProperty('--progress-width', width);
                bar.classList.add('animate');
            }
        });
    };
    
    // Initial check
    animateSkills();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkills);
}

// Scroll Animations for Elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-category');
    animatedElements.forEach(el => observer.observe(el));
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('form[name="contact"]');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // For Netlify forms, the form will be submitted automatically
            // You can add additional client-side validation here if needed
            
            setTimeout(() => {
                // Reset button after submission attempt
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
}

// Scroll Progress Indicator
function initScrollProgress() {
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(to right, #3b82f6, #06b6d4);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        default:
            notification.style.backgroundColor = '#3b82f6';
    }
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 1.25rem; cursor: pointer; margin-left: 1rem;">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Active Navigation Link Highlight
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightNav = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
}

// Initialize active nav highlighting
document.addEventListener('DOMContentLoaded', initActiveNavHighlight);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Your scroll handlers here
}, 16)); // ~60fps

// Accessibility improvements
function initAccessibility() {
    // Add keyboard navigation for custom elements
    const customButtons = document.querySelectorAll('.btn, .social-link, .project-link');
    
    customButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Ensure focusable elements have proper tabindex
        if (!button.hasAttribute('tabindex') && button.tagName !== 'A' && button.tagName !== 'BUTTON') {
            button.setAttribute('tabindex', '0');
        }
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);
