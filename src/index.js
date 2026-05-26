function obtenerdatos() {
    const contenido = document.getElementById('Contenido');
    fetch('http://localhost:3000/tasks')
        .then((response) => response.json())
        .then((json) => {
            let datos = json;
            contenido.innerHTML = '';
            for (let tarea of datos) {
                contenido.innerHTML += `<div class=" my-5 text-center h4">ID: ${tarea.clave}. Tarea: ${tarea.tarea}, Fue Completado?: ${tarea.completado}</div>`;
                contenido.innerHTML += `<div class="mx-5 text-center">${JSON.stringify(tarea)}</div>`;
            }
        });
}

document.getElementById('Select').addEventListener('click', () => {
    const contenido = document.getElementById('Contenido');
    (contenido.innerHTML !== '') ? contenido.innerHTML = '' : obtenerdatos();

});

function agregarDatos(idTarea, tarea, estado) {
    const idNumerico = Number(idTarea);
    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify({
            clave: idNumerico,
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
    document.getElementById("modalUpdate"),
    document.getElementById("modalDelete")
);

function actualizarDatos() {
    const idTareaUpdate = document.getElementById('idTareaUpdate');
    //idTareaUpdate.innerHTML = 'hola';
    fetch('http://localhost:3000/tasks')
        .then((response) => response.json())
        .then((json) => {
            let datos = json;
            let formIdTarea = `<label for="" class="form-label">Tareas</label>
                                        <select class="form-select form-select-lg" name="" id="idTareaValue">
                                        <option selected>Select one</option>`;
            for (let tarea of datos) {
                formIdTarea += `
                    <option value="${tarea.id}">${tarea.clave}</option>`;
            }
            formIdTarea += `</select>`;
            idTareaUpdate.innerHTML = formIdTarea;
        });
    

    const botonUpdate = document.getElementById('update');
    const nuevoBotonUpdate = botonUpdate.cloneNode(true);
    botonUpdate.parentNode.replaceChild(nuevoBotonUpdate, botonUpdate);

    nuevoBotonUpdate.addEventListener('click', () => {
        const idTareaValue = document.getElementById('idTareaValue');
        const valorIdTarea = idTareaValue.value;

        if (!valorIdTarea || valorIdTarea === "Select one") {
            alert("Por favor, selecciona una tarea válida.");
            return;
        }

        
        fetch(`http://localhost:3000/tasks/${valorIdTarea}`)
            .then(response => response.json())
            .then(tareaIndividual => {
                
                
                idTareaUpdate.innerHTML = `
                    <div class="mb-3">
                        <label class="form-label fw-bold">ID Tarea (No editable)</label>
                        <input type="text" id="editId" class="form-control" value="${tareaIndividual.id}" disabled>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Nombre de la Tarea</label>
                        <input type="text" id="editClave" class="form-control" value="${tareaIndividual.clave || ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Nombre de la Tarea</label>
                        <input type="text" id="editTarea" class="form-control" value="${tareaIndividual.tarea || ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Estado</label>
                        <select id="editEstado" class="form-select">
                            <option value="false" ${tareaIndividual.completado === false || tareaIndividual.completado === 'false' ? 'selected' : ''}>Pendiente</option>
                            <option value="true" ${tareaIndividual.completado === true || tareaIndividual.completado === 'true' ? 'selected' : ''}>Completado</option>
                        </select>
                    </div>
                `;

                
                nuevoBotonUpdate.innerText = "Guardar Cambios";
                
                
                nuevoBotonUpdate.addEventListener('click', () => {
                    const nuevoNombre = document.getElementById('editTarea').value;
                    const nuevaClave = document.getElementById('editClave').value;
                    const nuevoEstado = document.getElementById('editEstado').value === "true"; 

                    
                    fetch(`http://localhost:3000/tasks/${valorIdTarea}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            id: Number(valorIdTarea), 
                            clave: nuevaClave, 
                            tarea: nuevoNombre,
                            completado: nuevoEstado
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log("Actualizado con éxito:", json);
                        alert("¡Tarea actualizada correctamente!");
                        location.reload(); 
                    })
                    .catch(error => console.error("Error al actualizar mediante PUT:", error));
                }); 

            })
    });
}

function borrarDatos() {
    const idTareaDelete = document.getElementById('idTareaDelete');
    //idTareaUpdate.innerHTML = 'hola';
    fetch('http://localhost:3000/tasks')
        .then((response) => response.json())
        .then((json) => {
            let datos = json;
            let formIdTarea = `<label for="" class="form-label">Tareas</label>
                                        <select class="form-select form-select-lg" name="" id="idTareaValue">
                                        <option selected>Select one</option>`;
            for (let tarea of datos) {
                formIdTarea += `
                    <option value="${tarea.id}">${tarea.clave}</option>`;
            }
            formIdTarea += `</select>`;
            idTareaDelete.innerHTML = formIdTarea;
        });
    
    const botonDelete = document.getElementById('delete');
    const nuevoBotonDelete = botonDelete.cloneNode(true);
    botonDelete.parentNode.replaceChild(nuevoBotonDelete, botonDelete);

    nuevoBotonDelete.addEventListener('click', () => {
        const idTareaValue = document.getElementById('idTareaValue');
        const valorIdTarea = idTareaValue.value;

        if (!valorIdTarea || valorIdTarea === "Select one") {
            alert("Por favor, selecciona una tarea válida.");
            return;
        }

        
        fetch(`http://localhost:3000/tasks/${valorIdTarea}`)
            .then(response => response.json())
            .then(tareaIndividual => {
                
                
                idTareaDelete.innerHTML = `
                    <div class="mb-3">
                        <label class="form-label fw-bold">ID Tarea (No editable)</label>
                        <input type="text" id="editId" class="form-control" value="${tareaIndividual.id}" disabled>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Nombre de la Tarea</label>
                        <input type="text" id="editClave" class="form-control" value="${tareaIndividual.clave || ''}" disabled>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Nombre de la Tarea</label>
                        <input type="text" id="editTarea" class="form-control" value="${tareaIndividual.tarea || ''}" disabled>
                    </div>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Estado</label>
                        <select id="editEstado" class="form-select" disabled>
                            <option value="false" ${tareaIndividual.completado === false || tareaIndividual.completado === 'false' ? 'selected' : ''}>Pendiente</option>
                            <option value="true" ${tareaIndividual.completado === true || tareaIndividual.completado === 'true' ? 'selected' : ''}>Completado</option>
                        </select>
                    </div>
                `;

                
                nuevoBotonDelete.innerText = "Eliminar Tarea";
                
                
                nuevoBotonDelete.addEventListener('click', () => {
                    const nuevoNombre = document.getElementById('editTarea').value;
                    const nuevaClave = document.getElementById('editClave').value;
                    const nuevoEstado = document.getElementById('editEstado').value === "true";

                    
                    fetch(`http://localhost:3000/tasks/${valorIdTarea}`, {
                        method: 'DELETE'
                    })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log("Actualizado con éxito:", json);
                        alert("¡Tarea actualizada correctamente!");
                        location.reload(); 
                    })
                    .catch(error => console.error("Error al actualizar mediante PUT:", error));
                }); 

            })
    });
}
