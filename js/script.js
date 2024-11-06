localStorage.setItem("catalogo",JSON.stringify([
    {
        "id": 1,
        "nombre": "Campera Rodil Negro",
        "precio": 135000
    },
    {
        "id": 2,
        "nombre": "Campera Ronnie Celeste",
        "precio": 115000
    },
    {
        "id": 3,
        "nombre": "Campera Roma Negro",
        "precio": 145000
    },
    {
        "id": 4,
        "nombre": "Campera Ruros Negro",
        "precio": 145000
    },
    {
        "id": 5,
        "nombre": "Campera Render Negro",
        "precio": 65000
    }
]));

function obtenerCatalogoData(){
    return JSON.parse(localStorage.getItem("catalogo"));
}

function agregarProductoStorage(producto){
    let catalogo = JSON.parse(localStorage.getItem("catalogo"));
    catalogo.push(producto);
    localStorage.setItem("catalogo", JSON.stringify(catalogo));
    
}

function editarProductoStorage(index, producto){
    let catalogoData = obtenerCatalogoData();
    catalogoData[index] = producto;
    localStorage.setItem("catalogo", JSON.stringify(catalogoData));
}

function eliminarProductoStorage(id){
    let catalogoData = obtenerCatalogoData();
    let index = catalogoData.findIndex(producto => producto.id == id);
    if (index !== -1)
        catalogoData.splice(index, 1);
    localStorage.setItem("catalogo", JSON.stringify(catalogoData));   
}



let vistaCatalogo = document.querySelector('.catalogo');
let vistaInput = document.querySelector('.vista-input');
let indexEditar;

document.querySelector('.agregar').addEventListener("click", () => abrirVistaAgregar());

cargarCatalogo();

function cargarCatalogo() {
    obtenerCatalogoData().forEach(v => {
        let cardProducto = document.createElement('div');
        cardProducto.innerHTML = productoItemHtml(v);
        vistaCatalogo.append(cardProducto);
    });

    let botonesEliminar = document.getElementsByClassName('eliminar');
    for (const boton of botonesEliminar) {
        boton.addEventListener("click", () => eliminarProducto(boton.id));
    }

    let botonesEditar = document.getElementsByClassName('editar');
    for (const boton of botonesEditar) {
        boton.addEventListener("click", () => abrirVistaEditar(boton.id));
    }



}

function abrirVistaAgregar() {
    vistaInput.innerHTML = vistaInputHtml('Agregar producto');

    let catalogoData = obtenerCatalogoData();
    let ultimoIndex = catalogoData.length - 1;
    let UltimoProducto = catalogoData[ultimoIndex];

    if (UltimoProducto != null)
        document.getElementById('input-id').value = Number(UltimoProducto.id) + 1;
    else
        document.getElementById('input-id').value = 1;

    document.querySelector('.guardar').addEventListener("click", () => agregar());
    document.querySelector('.cancelar').addEventListener("click", () => limpiar());
}

function agregar() {
    let producto = {};
    producto.id = document.getElementById('input-id').value;
    producto.nombre = document.getElementById('input-nombre').value;
    producto.precio = document.getElementById('input-precio').value;
    agregarProductoStorage(producto);

    limpiar();

    actualizarCatalogo();
}

function eliminarProducto(id) {
    eliminarProductoStorage(id);
    actualizarCatalogo();
}

function abrirVistaEditar(id) {
    let catalogoData = obtenerCatalogoData();
    indexEditar = catalogoData.findIndex(producto => producto.id == id);
    if (indexEditar !== -1) {
        vistaInput.innerHTML = vistaInputHtml('Editar producto');
        let producto = catalogoData.at(indexEditar);
        document.getElementById('input-id').value = producto.id;
        document.getElementById('input-nombre').value = producto.nombre;
        document.getElementById('input-precio').value = producto.precio;

        document.querySelector('.guardar').addEventListener("click", () => editar());
        document.querySelector('.cancelar').addEventListener("click", () => limpiar());
    }
}

function editar() {
    let producto = {}
    producto.id = document.getElementById('input-id').value;
    producto.nombre = document.getElementById('input-nombre').value;
    producto.precio = document.getElementById('input-precio').value;
    editarProductoStorage(indexEditar, producto);
   

    limpiar();
    actualizarCatalogo();
}

function actualizarCatalogo() {
    vistaCatalogo.innerHTML = '';
    cargarCatalogo();
}

function limpiar() {
    vistaInput.innerHTML = '';
}

function productoItemHtml(data) {
    return `
        <div class="producto" id=${data.id}>
            <span>${data.id}</span>
            <span>${data.nombre}</span>
            <span>$ ${data.precio}</span>
            <button type="button" class="btn btn-primary editar" id=${data.id}>Editar</button>
            <button type="button" class="btn btn-danger eliminar" id=${data.id}>Eliminar</button>
        </div>
        `;
    }

function vistaInputHtml(titulo) {
    return `
        <div class="vista-input">
            <h2>${titulo}</h2>
            <label for="nombre">Id:</label>
            <input type="text" id="input-id" readonly>
            <label for="nombre">Nombre:</label>
            <input type="text" id="input-nombre">
            <label for="Precio">Precio: $</label>
            <input type="text" id="input-precio">
            <div>
                <button type="button" class="btn btn-primary guardar">Guardar</button>
                <button type="button" class="btn btn-danger cancelar">Cancelar</button>
            </div>
        </div>
    `;
}