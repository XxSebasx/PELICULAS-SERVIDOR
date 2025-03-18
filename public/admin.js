document.getElementById('addPelicula').addEventListener('submit', addPelicula);
document.getElementById('addEnlace').addEventListener('submit', addEnlace);
document.getElementById('deletePelicula').addEventListener('submit', deletePelicula);
document.getElementById('deleteEnlace').addEventListener('submit', deleteEnlace);

async function addPelicula(e) {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const duracion = document.getElementById('duracion').value;
    const director = document.getElementById('director').value;
    const genero = document.getElementById('genero').value;
    const anio_estreno = document.getElementById('anio_estreno').value;
    const descripcion = document.getElementById('sinopsis').value;
    const portada = document.getElementById('poster').value;
    const trailer = document.getElementById('trailer').value;

    const response = await fetch('/pelicula', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo,
            duracion,
            director,
            genero,
            anio_estreno,
            descripcion,
            portada,
            trailer
        })
    });

    const data = await response.json();
    console.log(data);
    
    if (response.ok) {
        alert('Pelicula agregada');
    }
}

async function addEnlace(e) {
    e.preventDefault();
    const peliculaID = document.getElementById('idPelicula').value;
    const amazon = document.getElementById('amazon').value;
    const netflix = document.getElementById('netflix').value;
    const disney = document.getElementById('disney').value;
    const hbo = document.getElementById('hbo').value;
    const movistar = document.getElementById('movistar').value;

    const data = {
        peliculaID,
        amazon,
        netflix,
        disney,
        hbo,
        movistar
    }

    console.log(data);
    const response = await fetch('/enlace', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Enlace agregado');
    } else {
        alert('Error al agregar enlace');
    }
}

async function deletePelicula() {
    
    const idPelicula = document.getElementById('idPeliculaDelete').value;

    const response = await fetch(`/pelicula/${idPelicula}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Pelicula eliminada');
    } else {
        alert('Error al eliminar pelicula');
    }
}

async function deleteEnlace() {
    const idPelicula = document.getElementById('idPeliculaDelete').value;
    const response = await fetch(`/enlace/${idPelicula}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Enlace eliminado');
    } else {
        alert('Error al eliminar enlace');
    }
}