document.addEventListener('DOMContentLoaded', function() {
    setupPasswordStrength();
    setupRegistrationLinks();

    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-btn';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    const header = document.querySelector('.header .container');
    if (header) {
        header.insertBefore(mobileMenuButton, header.firstChild);
        mobileMenuButton.addEventListener('click', function() {
            const nav = document.querySelector('.nav');
            if (nav) {
                nav.classList.toggle('active');
            }
        });
    }

    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.classList.add('invalid');
                let errorMessage = this.nextElementSibling;
                if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                    errorMessage = document.createElement('span');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'DÃ¼zgÃ¼n email formatÄ± daxil edin.';
                    this.parentNode.insertBefore(errorMessage, this.nextSibling);
                }
            } else {
                this.classList.remove('invalid');
                const errorMessage = this.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.remove();
                }
            }
        });
    });

    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.classList.add('invalid');
                let errorMessage = this.nextElementSibling;
                if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                    errorMessage = document.createElement('span');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'DÃ¼zgÃ¼n telefon formatÄ± daxil edin. (mÉs: +994 50 123 45 67)';
                    this.parentNode.insertBefore(errorMessage, this.nextSibling);
                }
            } else {
                this.classList.remove('invalid');
                const errorMessage = this.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.remove();
                }
            }
        });
    });

    const confirmPasswordInputs = [
        document.getElementById('student-password-confirm'),
        document.getElementById('company-password-confirm')
    ];
    confirmPasswordInputs.forEach(function(input) {
        if (input) {
            input.addEventListener('blur', function() {
                const passwordId = this.id.replace('-confirm', '');
                const passwordInput = document.getElementById(passwordId);
                if (passwordInput && this.value !== passwordInput.value) {
                    this.classList.add('invalid');
                    let errorMessage = this.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('span');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'ÅifrÉlÉr eyni deyil.';
                        this.parentNode.insertBefore(errorMessage, this.nextSibling);
                    }
                } else {
                    this.classList.remove('invalid');
                    const errorMessage = this.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
errorMessage.remove();
                    }
                }
            });
        }
    });
});

function setupPasswordStrength() {
    const passwordInputs = [
        document.getElementById('student-password'),
        document.getElementById('company-password')
    ];

    passwordInputs.forEach(function(input) {
        if (input) {
            input.addEventListener('input', function() {
                const password = this.value;
                let strength = 0;

                if (password.length === 0) {
                    updatePasswordStrength(this, 0, 'Ãox zÉif');
                    return;
                }

                if (password.length >= 8) strength += 1;
                if (password.match(/[a-z]+/)) strength += 1;
                if (password.match(/[A-Z]+/)) strength += 1;
                if (password.match(/[0-9]+/)) strength += 1;
                if (password.match(/[^a-zA-Z0-9]+/)) strength += 1;

                let strengthText = '';
                let strengthColor = '';
                let strengthPercentage = 0;

                switch (strength) {
                    case 1:
                        strengthText = 'Ãox zÉif';
                        strengthColor = '#f43f5e';
                        strengthPercentage = 20;
                        break;
                    case 2:
                        strengthText = 'ZÉif';
                        strengthColor = '#fb923c';
                        strengthPercentage = 40;
                        break;
                    case 3:
                        strengthText = 'Orta';
                        strengthColor = '#facc15';
                        strengthPercentage = 60;
                        break;
                    case 4:
                        strengthText = 'GÃ¼clÃ¼';
                        strengthColor = '#84cc16';
                        strengthPercentage = 80;
                        break;
                    case 5:
                        strengthText = 'Ãox gÃ¼clÃ¼';
                        strengthColor = '#22c55e';
                        strengthPercentage = 100;
                        break;
                    default:
                        strengthText = 'Ãox zÉif';
                        strengthColor = '#f43f5e';
                        strengthPercentage = 20;
                }

                updatePasswordStrength(this, strengthPercentage, strengthText, strengthColor);
            });
        }
    });
}

function updatePasswordStrength(inputElement, percentage, text, color = '') {
    const formGroup = inputElement.closest('.form-group');
    if (!formGroup) return;

    const strengthBar = formGroup.querySelector('.strength-level');
    const strengthText = formGroup.querySelector('.strength-text');

    if (strengthBar && strengthText) {
        strengthBar.style.width = ${percentage}%;
        if (color) strengthBar.style.backgroundColor = color;
        strengthText.textContent = text;
    }
}

function setupRegistrationLinks() {
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form tÉsdiqlÉndi! Real tÉtbiqdÉ mÉlumatlar gÃ¶ndÉrilÉcÉk.');
        });
    });

    const captchaRefresh = document.querySelector('.captcha-refresh');
    if (captchaRefresh) {
        captchaRefresh.addEventListener('click', function() {
            alert('Captcha yenilÉndi!');
        });
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^\+994\s?([50|51|55|70|77|99])\s?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})$/;
    return re.test(String(phone));
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

window.addEventListener('load', function() {
    const animateElements = document.querySelectorAll('.animate');
    animateElements.forEach(function(element) {
        element.classList.add('animated');
    });

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            const nav = document.querySelector('.nav');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
});
