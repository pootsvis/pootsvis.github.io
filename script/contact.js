const form = document.getElementById('contactform');
const statusDiv = document.getElementById('form-status');

const validators = {
    name: (value) => {
        if (value.trim().length < 2) return 'Vul een naam in van minstens 2 tekens.';
        if (/\d/.test(value)) return 'Een naam mag geen cijfers bevatten.';
        return '';
    },
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? '' : 'Vul een geldig e-mailadres in.',
    message: (value) => value.trim().length >= 10
        ? '' : 'Je bericht moet minstens 10 tekens bevatten.',
};

const showError = (field, message) => {
    const input = document.getElementById(field);
    const errorSpan = document.getElementById(`${field}-error`);
    errorSpan.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
};

const validateField = (field) => {
    const input = document.getElementById(field);
    const message = validators[field](input.value);
    showError(field, message);
    return message === '';
};

// Live validatie: fout verdwijnt zodra gebruiker het corrigeert
Object.keys(validators).forEach((field) => {
    const input = document.getElementById(field);
    input.addEventListener('blur', () => validateField(field));
    input.addEventListener('input', () => {
        if (input.getAttribute('aria-invalid') === 'true') {
            validateField(field);
        }
    });
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const results = Object.keys(validators).map(validateField);
    const isValid = results.every(Boolean);

    if (isValid) {
        statusDiv.textContent = 'Bedankt! Je bericht is verstuurd.';
        statusDiv.style.color = 'green';
        form.reset();
    } else {
        statusDiv.textContent = 'Er zijn nog fouten in het formulier, controleer de velden.';
        statusDiv.style.color = 'red';
    }
});