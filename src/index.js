function obtenerdatos() {
    const contenido = document.getElementById('Contenido');
    fetch('http://localhost:3000/tasks')
        .then((response) => response.json())
        .then((json) => {
            let datos = json;
            contenido.innerHTML = '';
            for (let tarea of datos) {
                contenido.innerHTML += `<div class=" mb-5 text-center h4">ID: ${tarea.id}. Tarea: ${tarea.tarea}, Fue Completado?: ${tarea.completado}</div>`;
            }

            contenido.innerHTML += `<div class="mx-5 text-center">${JSON.stringify(datos)}</div>`;
        });
}

document.getElementById('Select').addEventListener('click', () => {
    const contenido = document.getElementById('Contenido');
    (contenido.innerHTML !== '') ? contenido.innerHTML = '' : obtenerdatos();

});

function agregarDatos() {
    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

// document.getElementById('Insert').addEventListener('click', () => {
//     const contenido = document.getElementById('Contenido');
//     agregarDatos();

// });
const myModal = new bootstrap.Modal(
    document.getElementById("modalId"),
    options,
);