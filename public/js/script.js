const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const response = await fetch("../../", {
            method: "POST",
            body: data,
        });
        if (response.ok) {
            success.style.display = 'block';
            form.reset();
            console.log("message sent.");
        }
    });
}