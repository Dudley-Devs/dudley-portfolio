const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

// Utility: show/hide error
function showError(input, message) {
    const error = input.parentElement.querySelector('.error-message');
    if (message) {
        error.textContent = message;
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
    }
}

// Validation rules
function validateName(input) {
    if (!input.value.trim()) {
        showError(input, "Please enter your name");
        return false;
    }
    showError(input, "");
    return true;
}

function validateEmail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.value.trim())) {
        showError(input, "Please enter a valid email");
        return false;
    }
    showError(input, "");
    return true;
}

function validateMessage(input) {
    if (!input.value.trim()) {
        showError(input, "Message cannot be empty");
        return false;
    }
    showError(input, "");
    return true;
}

// Attach live validation
const nameInput = form.querySelector('[name="name"]');
const emailInput = form.querySelector('[name="email"]');
const messageInput = form.querySelector('[name="message"]');

nameInput.addEventListener('input', () => validateName(nameInput));
emailInput.addEventListener('input', () => validateEmail(emailInput));
messageInput.addEventListener('input', () => validateMessage(messageInput));

// Final submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const validName = validateName(nameInput);
    const validEmail = validateEmail(emailInput);
    const validMessage = validateMessage(messageInput);

    if (!(validName && validEmail && validMessage)) return;

    const data = new FormData(form);
    const response = await fetch("/", {
        method: "POST",
        body: data,
    });

    if (response.ok) {
        success.style.display = 'block';
        form.reset();
    }
});
