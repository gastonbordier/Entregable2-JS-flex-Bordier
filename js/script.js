const catalogoData = [
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
];

let finalizar = false;
let carritoData = [];

while (!finalizar) {

    let textoMenu = 'Bienvenido al shop! Que desea hacer? Ingrese el numero de la accion que desea realizar: \n' +
        '1 -> Comprar en Catalogo \n' +
        '2 -> Ver carrito \n' +
        '3 -> Comprar \n' +
        '4 -> Finalizar \n';

    let opcion = prompt(textoMenu);


    switch (opcion) {
        case "1":
            catalogo();
            break;
        case "2":
            carrito();
            break;
        case "3":
            comprar();
        case "4":
            finalizar = true;
            alert("Hasta luego!")
            break;

        default:
            alert("Ha ingresado una opcion invalida. Intentelo de nuevo");
            break;
    }

}

function catalogo() {
    let textoCatalogo = 'Este es nuestro catalogo. Ingrese el numero del articulo que desea agregar al carrito:\n';
    textoCatalogo += imprimirArticulos(catalogoData);

    let itemElegido = prompt(textoCatalogo);

    switch (itemElegido) {
        case "1":
            carritoData.push(catalogoData[0]);
            break;
        case "2":
            carritoData.push(catalogoData[1]);
            break;
        case "3":
            carritoData.push(catalogoData[2]);
            break;
        case "4":
            carritoData.push(catalogoData[3]);
            break;
        case "5":
            carritoData.push(catalogoData[4]);
            break;

        default:
            alert("Ha ingresado una opcion invalida. Intentelo de nuevo");
            break;
    }

}

function carrito() {
    let textoCarrito = 'Este es tu carrito: \n';
    textoCarrito += imprimirArticulos(carritoData);
    textoCarrito += 'Total: $ ' + calcularTotal(carritoData);

    alert(textoCarrito);
}

function comprar() {
    let textoCarrito = 'Felicidades! Has comprado los siguientes articulos: \n';
    textoCarrito += imprimirArticulos(carritoData);
    textoCarrito += 'Total: $ ' + calcularTotal(carritoData);

    alert(textoCarrito);

}

function imprimirArticulos(articulosData) {
    let texto = '';
    for (item of articulosData) {
        texto += item.id + ': ' + item.nombre + '. Precio: $' + item.precio + '.\n';
    }

    return texto;
}

function calcularTotal(articulosData) {
    let total = 0;

    for (item of articulosData) {
        total += item.precio;
    }

    return total;
}