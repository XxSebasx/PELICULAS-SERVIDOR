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
            <button class="ver-pelicula" data-id="${pelicula.ID}">Ver</button>
        `;
        catalogo.appendChild(div);
    });

    // Agregar controladores de eventos a los botones
    document.querySelectorAll('.ver-pelicula').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            verPelicula(id);
        });
    });
}

async function verPelicula(id) {
    localStorage.setItem('idPelicula', id);
    window.location.href = '/pelicula.html';
}



