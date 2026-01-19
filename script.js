/**
 * Main form validation function
 * Validates all required form fields and displays appropriate error messages
 */
function validateForm() {
    let isValid = true;
    
    // Define form fields to validate with their validation types
    const fields = [
        { id: "email", type: "email" },
        { id: "fullname", type: "name" },
        { id: "phone", type: "phone" },
        { id: "country" },
        { id: "address" },
        { id: "zip" },
        { id: "city" },
        { id: "state" }
    ];
    
    // Validate each field
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const error = input.parentElement.querySelector(".error-text");
        
        // Reset previous error states
        input.classList.remove("input-error");
        if (error) error.style.display = "none";
        
        // Check for empty required field
        if (!input.value.trim()) {
            showError(input, error, "This field is required");
            isValid = false;
        }
        
        // Email validation
        if (field.type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showError(input, error, "Enter a valid email address");
                isValid = false;
            }
        }
        
        // Name validation (letters and spaces only)
        if (field.type === "name") {
            const nameRegex = /^[A-Za-z\s]+$/;
            if (!nameRegex.test(input.value)) {
                showError(input, error, "Only letters and spaces allowed");
                isValid = false;
            }
        }
        
        // Phone number validation (minimum length)
        if (field.type === "phone" && input.value.length < 7) {
            showError(input, error, "Enter a valid phone number");
            isValid = false;
        }
    });
    
    // If all validations pass, show success message
    if (isValid) {
        alert("Form validated successfully ✅");
    }
}

/**
 * Display error message for a form field
 * @param {HTMLElement} input - The input element with error
 * @param {HTMLElement} error - The error message element
 * @param {string} message - The error message to display
 */
function showError(input, error, message) {
    input.classList.add("input-error");
    if (error) {
        error.innerText = message;
        error.style.display = "block";
    }
}

/**
 * Toggle the country flag dropdown visibility
 */
function toggleDropdown() {
    const flagOptions = document.getElementById("flagOptions");
    flagOptions.style.display = flagOptions.style.display === "block" ? "none" : "block";
}

/**
 * Select a country flag and update the display
 * @param {string} code - Country code for the flag image
 * @param {string} dial - International dialing code
 */
function selectFlag(code, dial) {
    document.querySelector(".selected-flag img").src = `https://flagcdn.com/w20/${code}.png`;
    document.querySelector(".selected-flag span").innerText = dial;
    document.getElementById("flagOptions").style.display = "none";
}

/**
 * Initialize event listeners when DOM is fully loaded
 */
document.addEventListener("DOMContentLoaded", function() {
    // Close flag dropdown when clicking outside
    document.addEventListener("click", function(e) {
        if (!document.getElementById("flagSelect").contains(e.target)) {
            document.getElementById("flagOptions").style.display = "none";
        }
    });
    
    // Add click handlers to flag options
    document.querySelectorAll('.flag-options div').forEach(option => {
        option.addEventListener('click', function() {
            const country = this.getAttribute('data-country');
            const dial = this.getAttribute('data-dial');
            selectFlag(country, dial);
        });
    });
    
    // Add click handler to selected flag to toggle dropdown
    document.querySelector('.selected-flag').addEventListener('click', toggleDropdown);
    
    // Payment method selection functionality
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', () => {
            // Remove active class from all payment methods
            document.querySelectorAll('.payment-method').forEach(m => {
                m.classList.remove('active');
                m.querySelector('input[type="radio"]').checked = false;
            });
            
            // Add active class to clicked payment method
            method.classList.add('active');
            method.querySelector('input[type="radio"]').checked = true;
        });
    });
    
    // Add click handler to place order button
    document.getElementById('placeOrderBtn').addEventListener('click', validateForm);
});