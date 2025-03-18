//id de la pelicula recodigo de la anterior pagina
document.getElementById('addComentario').addEventListener('click', addComentario);
let idPelicula = localStorage.getItem('idPelicula');
let idUsuario = localStorage.getItem('usuarioID');

console.log(idPelicula);
console.log(idUsuario);

getPelicula();

async function getPelicula(){
    const response = await fetch(`/pelicula/${idPelicula}`);
    const data = await response.json();
    console.log(data);
    
}

async function addComentario(){
    const comentario = document.getElementById('comentario').value;
    console.log(comentario);
    const valoracion = document.getElementById('valoracion').value;
    console.log(valoracion);
    const response = await fetch('/comentario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comentario, valoracion, idPelicula, idUsuario })
    });
    const data = await response.json();
    console.log(data);
    if (data) {
        console.log(data);
    } else {
        alert('Error al agregar comentario');
    }
}


