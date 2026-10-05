const form = document.getElementById('contactform');
const statusDiv = document.getElementById('form-status');

const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

// Per veld: een functie die de custom validity-boodschap bepaalt
const bepaalCustomBoodschap = {
    name: (input) => {
        if (input.value.trim().length < 2) return 'Vul een naam in van minstens 2 tekens.';
        if (/\d/.test(input.value)) return 'Een naam mag geen cijfers bevatten.';
        return '';
    },
    email: (input) => {
        if (!input.validity.valid) return 'Vul een geldig e-mailadres in.';
        return '';
    },
    message: (input) => {
        if (input.value.trim().length < 10) return 'Je bericht moet minstens 10 tekens bevatten.';
        return '';
    },
};

// Toont of verbergt de foutmelding bij een veld, op basis van checkValidity()
const toonValidatieStatus = (input) => {
    const customBoodschap = bepaalCustomBoodschap[input.id](input);
    input.setCustomValidity(customBoodschap);

    const errorSpan = document.getElementById(`${input.id}-error`);
    const isValid = input.checkValidity();

    errorSpan.textContent = isValid ? '' : input.validationMessage;
    input.setAttribute('aria-invalid', isValid ? 'false' : 'true');

    return isValid;
};

// Live validatie: bij blur altijd checken, tijdens typen alleen als het veld al fout stond
[name, email, message].forEach((input) => {
    input.addEventListener('blur', () => toonValidatieStatus(input));
    input.addEventListener('input', () => {
        if (input.getAttribute('aria-invalid') === 'true') {
            toonValidatieStatus(input);
        }
    });
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const resultaten = [name, email, message].map(toonValidatieStatus);
    const isFormValid = resultaten.every(Boolean);

    if (isFormValid) {
        statusDiv.textContent = 'Bedankt! Je bericht is verstuurd.';
        statusDiv.style.color = 'green';
        form.reset();
        [name, email, message].forEach((input) => input.setAttribute('aria-invalid', 'false'));
    } else {
        statusDiv.textContent = 'Er zijn nog fouten in het formulier, controleer de velden.';
        statusDiv.style.color = 'red';
    }
});