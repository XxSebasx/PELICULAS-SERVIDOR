
getCatalogo();
async function getCatalogo() {
    const response = await fetch('/pelicula');
    const data = await response.json();
    console.log(data);
    const catalogo = document.getElementById('catalogo');
    data.forEach(pelicula => {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${pelicula.imagen}" alt="${pelicula.titulo}">
            <h3>${pelicula.titulo}</h3>
            <p>${pelicula.descripcion}</p>
            <button onclick="verPelicula(${pelicula.id})">Ver</button>
        `;
        catalogo.appendChild(div);
    });
}

async function verPelicula(id) {
    localStorage.setItem('idPelicula', id);
    window.location.href = '/pelicula.html';
}



