cargarPerfil();

async function cargarPerfil() {
    const usuarioID = localStorage.getItem('usuarioID');
    if (!usuarioID) {
        alert('No has iniciado sesión');
        window.location.href = './login.html';
        return;
    }

    const response = await fetch(`/usuario/${usuarioID}`);
    const data = await response.json();
    console.log(usuarioID);
    console.log(data);
    document.getElementById('userName').innerText = data.nombre;
    document.getElementById('userEmail').innerText = data.email;
    document.getElementById('userRole').innerText = data.rol;

    if (data.rol != 'admin') {
        document.getElementById('admin').style.visibility = 'hidden';
    }
}

document.getElementById('updateForm').addEventListener('submit', updateUsuario);

async function updateUsuario(e) {
    e.preventDefault();
    const usuarioID = localStorage.getItem('usuarioID');
    const nombre = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;
    const password = document.getElementById('updatePassword').value;

    const response = await fetch(`/usuario/${usuarioID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert('Datos actualizados correctamente');
        cargarPerfil(); // Recargar el perfil para mostrar los datos actualizados
    } else {
        alert('Error al actualizar los datos');
        console.error(data.message);
    }
}