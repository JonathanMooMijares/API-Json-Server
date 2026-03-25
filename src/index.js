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

function agregarDatos(idTarea, tarea, estado) {
    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify({
            id: idTarea,
            tarea: tarea,
            completado: estado,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

document.getElementById('Insert').addEventListener('click', () => {
    const idTarea = document.getElementById('idTarea').value;
    const tarea = document.getElementById('tarea').value;
    const completado = document.getElementById('completado').value;

    agregarDatos(idTarea, tarea, completado);

});
const myModal = new bootstrap.Modal(
    document.getElementById("modalId"),
    options,
);