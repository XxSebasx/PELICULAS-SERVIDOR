
document.getElementById('login').addEventListener('submit', login);

async function login(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data) {
        console.log(data);
    } else {
        alert('Bienvenido');
        window.location.href = '/index.html';
    }
}