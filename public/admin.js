
async function addPelicula() {
    const titulo = document.getElementById('titulo').value;
    const duracion = document.getElementById('duracion').value;
    const director = document.getElementById('director').value;
    const genero = document.getElementById('genero').value;
    const anio_estreno = document.getElementById('anio_estreno').value;
    const descripcion = document.getElementById('descripcion').value;
    const portada = document.getElementById('portada').value;
    const trailer = document.getElementById('trailer').value;
    const calificacion = document.getElementById('calificacion').value;

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
            trailer,
            calificacion
        })
    });

}

async function deletePelicula() {
    const id = document.getElementById('id').value;
    const response = await fetch(`/pelicula/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Pelicula eliminada');
    }
}