//id de la pelicula recodigo de la anterior pagina

const ID = localStorage.getItem('idPelicula');
async function getPelicula(){
    const response = await fetch(`/pelicula/${ID}`);
    const data = await response.json();
    console.log(data);
}

async function getComentarios(){
    const response = await fetch(`/pelicula/${ID}/comentarios`);
    const data = await response.json();
    console.log(data);
}