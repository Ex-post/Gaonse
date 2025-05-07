document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        const submitButton = document.getElementById('submit-btn');
        
        // Error display function
        function showError(input, message) {
            const formGroup = input.parentElement;
            formGroup.classList.add('error');
            
            let errorElement = formGroup.querySelector('.error-message');
            
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.style.color = '#d9534f';
                errorElement.style.fontSize = '0.85rem';
                errorElement.style.marginTop = '5px';
                formGroup.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
        }
        
        // Remove error display
        function removeError(input) {
            const formGroup = input.parentElement;
            formGroup.classList.remove('error');
            
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
        
        // Add input event listeners
        if (nameInput) {
            nameInput.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    removeError(this);
                }
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    // Basic email validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailRegex.test(this.value.trim())) {
                        removeError(this);
                    } else {
                        showError(this, 'Please enter a valid email address');
                    }
                }
            });
        }
        
        if (messageInput) {
            messageInput.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    removeError(this);
                }
            });
        }
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Validate name
            if (nameInput && nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (emailInput && emailInput.value.trim() === '') {
                showError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    showError(emailInput, 'Please enter a valid email address');
                    isValid = false;
                }
            }
            
            // Validate message
            if (messageInput && messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                // Disable submit button and show loading state
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                }
                
                // Simulate form submission (replace with actual form submission in production)
                setTimeout(function() {
                    // Reset form
                    contactForm.reset();
                    
                    // Display success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert-success';
                    successMessage.style.backgroundColor = '#d4edda';
                    successMessage.style.color = '#155724';
                    successMessage.style.padding = '15px';
                    successMessage.style.borderRadius = '5px';
                    successMessage.style.marginBottom = '20px';
                    successMessage.textContent = 'Your message has been sent successfully! We will get back to you soon.';
                    
                    contactForm.parentElement.insertBefore(successMessage, contactForm);
                    
                    // Remove success message after 5 seconds
                    setTimeout(function() {
                        successMessage.style.opacity = '0';
                        successMessage.style.transition = 'opacity 0.5s';
                        
                        setTimeout(function() {
                            successMessage.remove();
                        }, 500);
                    }, 5000);
                    
                    // Reset button
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.innerHTML = 'Send Message';
                    }
                }, 1500); // Simulate 1.5 second delay
            }
        });
    }

    // Google Maps integration (simulation since we don't have API key)
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        // Create a styled div instead of actual Google Maps
        mapContainer.innerHTML = `
            <div style="background-color: #e8e8e8; height: 400px; display: flex; align-items: center; justify-content: center; border-radius: var(--border-radius); position: relative; overflow: hidden;">
                <div style="text-align: center; padding: 20px; z-index: 2;">
                    <i class="fas fa-map-marker-alt" style="font-size: 40px; color: var(--primary-color); margin-bottom: 15px;"></i>
                    <h3>Our Location</h3>
                    <p>Pratap Enterprises, Munger, Bihar, India</p>
                </div>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(93, 138, 72, 0.1); z-index: 1;"></div>
            </div>
        `;
    }
});
