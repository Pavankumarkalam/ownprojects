// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.updateThemeIcon();
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    updateThemeIcon() {
        const icon = this.themeToggle.querySelector('i');
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Form Validation
class FormValidator {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.email = document.getElementById('email');
        this.password = document.getElementById('password');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.email.addEventListener('blur', () => this.validateEmail());
        this.password.addEventListener('blur', () => this.validatePassword());
        this.email.addEventListener('input', () => this.clearErrors(this.email));
        this.password.addEventListener('input', () => this.clearErrors(this.password));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();

        if (isEmailValid && isPasswordValid) {
            this.simulateLogin();
        }
    }

    validateEmail() {
        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isBasicValid = emailRegex.test(this.email.value.trim());
        
        // Specific Gmail format check
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const isGmailValid = gmailRegex.test(this.email.value.trim());
        
        // Check if email is entered but not valid
        if (this.email.value.trim()) {
            if (!isBasicValid) {
                this.showError(this.email, 'Please enter a valid email address');
                return false;
            }
            else if (!isGmailValid) {
                this.showError(this.email, 'Only Gmail addresses are accepted (example@gmail.com)');
                return false;
            }
        }
        
        this.clearErrors(this.email);
        return isGmailValid;
    }

    validatePassword() {
        const password = this.password.value;
        const isValid = password.length >= 6;
        
        if (!isValid && password) {
            this.showError(this.password, 'Password must be at least 6 characters long');
            return false;
        }
        
        this.clearErrors(this.password);
        return true;
    }

    showError(input, message) {
        this.clearErrors(input);
        
        input.style.borderColor = 'var(--danger-color)';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--danger-color);
            font-size: 0.85rem;
            margin-top: 5px;
            animation: slideIn 0.3s ease-out;
        `;
        
        input.parentNode.parentNode.appendChild(errorElement);
    }

    clearErrors(input) {
        input.style.borderColor = 'var(--border-color)';
        
        const errorElement = input.parentNode.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    simulateLogin() {
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.innerHTML;
        
        // Show loading state
        loginBtn.classList.add('loading');
        loginBtn.innerHTML = '<span>Signing In...</span>';
        loginBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            loginBtn.classList.remove('loading');
            loginBtn.innerHTML = originalText;
            loginBtn.disabled = false;
            
            // Show success message
            this.showSuccessMessage();
            
            // Redirect to chat (simulate) - reduced timer from 2000ms to 800ms for faster redirect
            setTimeout(() => {
                window.location.href = 'chat.html'; // This would be your chat page
            }, 800);
        }, 1000);
    }

    showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Login successful! Redirecting...</span>
        `;
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--success-color);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            animation: slideIn 0.5s ease-out;
        `;
        
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 1500);
    }
}

// Password Toggle
class PasswordToggle {
    constructor() {
        this.toggleBtn = document.getElementById('togglePassword');
        this.passwordInput = document.getElementById('password');
        this.init();
    }

    init() {
        this.toggleBtn.addEventListener('click', () => this.toggle());
    }

    toggle() {
        const type = this.passwordInput.type === 'password' ? 'text' : 'password';
        this.passwordInput.type = type;
        
        const icon = this.toggleBtn.querySelector('i');
        if (type === 'text') {
            icon.className = 'fas fa-eye-slash';
        } else {
            icon.className = 'fas fa-eye';
        }
    }
}

// Social Login Handlers
class SocialLogin {
    constructor() {
        this.googleBtn = document.querySelector('.google-btn');
        this.facebookBtn = document.querySelector('.facebook-btn');
        this.init();
    }

    init() {
        this.googleBtn.addEventListener('click', () => this.handleGoogleLogin());
        this.facebookBtn.addEventListener('click', () => this.handleFacebookLogin());
    }

    handleGoogleLogin() {
        this.showSocialLoginMessage('Google');
        // Here you would integrate with Google OAuth
        console.log('Google login initiated');
    }

    handleFacebookLogin() {
        this.showSocialLoginMessage('Facebook');
        // Here you would integrate with Facebook Login
        console.log('Facebook login initiated');
    }

    showSocialLoginMessage(provider) {
        const message = document.createElement('div');
        message.className = 'social-message';
        message.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>${provider} login would be integrated here</span>
        `;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--info-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(23, 162, 184, 0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            animation: slideIn 0.5s ease-out;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
}

// Animation Utilities
class AnimationUtils {
    static addFadeIn(element, delay = 0) {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, delay);
    }

    static addSlideIn(element, delay = 0) {
        setTimeout(() => {
            element.classList.add('slide-in');
        }, delay);
    }

    static staggerAnimation(elements, className, delayIncrement = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(className);
            }, index * delayIncrement);
        });
    }
}

// Input Focus Effects
class InputEffects {
    constructor() {
        this.inputs = document.querySelectorAll('input');
        this.init();
    }

    init() {
        this.inputs.forEach(input => {
            input.addEventListener('focus', (e) => this.handleFocus(e));
            input.addEventListener('blur', (e) => this.handleBlur(e));
        });
    }

    handleFocus(e) {
        const wrapper = e.target.parentNode;
        wrapper.style.transform = 'scale(1.02)';
        wrapper.style.transition = 'transform 0.2s ease';
    }

    handleBlur(e) {
        const wrapper = e.target.parentNode;
        wrapper.style.transform = 'scale(1)';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    const themeManager = new ThemeManager();
    const formValidator = new FormValidator();
    const passwordToggle = new PasswordToggle();
    const socialLogin = new SocialLogin();
    const inputEffects = new InputEffects();

    // Add entrance animations
    const loginCard = document.querySelector('.login-card');
    const features = document.querySelectorAll('.feature');
    
    AnimationUtils.addFadeIn(loginCard, 200);
    AnimationUtils.staggerAnimation(features, 'slide-in', 150);

    // Handle signup link
    const signupLink = document.getElementById('signupLink');
    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Signup page would be implemented here');
    });

    // Handle forgot password link
    const forgotPassword = document.querySelector('.forgot-password');
    forgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Password reset functionality would be implemented here');
    });

    // Add some interactive feedback
    const buttons = document.querySelectorAll('button:not(.theme-btn)');
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Console welcome message
    console.log('%cWeChat Login Page', 'color: #007bff; font-size: 24px; font-weight: bold;');
    console.log('%cBuilt with modern web technologies', 'color: #6c757d; font-size: 14px;');
    console.log('%c• Responsive Design\n• Dark/Light Theme\n• Form Validation\n• Smooth Animations', 'color: #28a745; font-size: 12px;');
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for potential module usage
window.WeChat = {
    ThemeManager,
    FormValidator,
    PasswordToggle,
    SocialLogin,
    AnimationUtils,
    InputEffects
};
