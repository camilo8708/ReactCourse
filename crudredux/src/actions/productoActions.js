import {
    PROCESANDO,
    ERROR,
    AGREGAR_PRODUCTO_EXITO,
    CONSULTAR_PRODUCTOS_EXITO,
    ELIMINAR_PRODUCTO_EXITO,
    SELECCIONAR_PRODUCTO_EDITAR,
    EDITAR_PRODUCTO_EXITO
} from '../types'
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevos productos
export function crearNuevoProductoAcition(producto) {
    return async (dispatch) => {
        dispatch(procesando());
        try {
            const response = await clienteAxios.post('/productos', producto);
            dispatch(agregarProdcutoExito(response.data));
            Swal.fire('Correcto', 'El producto se agregó correctamente', 'success');
        } catch (error) {
            dispatch(errorProcesando(true));
            Swal.fire({ icon: 'error', title: 'Hubo un error', text: 'Hubo un error, intenta de nuevo' });
        }
    }
}

//Inicio del proceso de agregar producto
const procesando = () => ({
    type: PROCESANDO,
    payload: true
})

//Error en los procesos
const errorProcesando = estado => ({
    type: ERROR,
    payload: estado
})

//Finalizo de forma correcta el agregar productos en la base de datos
const agregarProdcutoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})


//Consultar los productos creados
export function consultarProductos() {
    return async (dispatch) => {
        dispatch(procesando());

        try {
            const response = await clienteAxios.get('/productos');
            dispatch(agregarProdcutosExito(response.data));
        } catch (error) {
            dispatch(errorProcesando(true));
        }
    }
}

//Finalizo de forma correcta el cargar los productos
const agregarProdcutosExito = productos => ({
    type: CONSULTAR_PRODUCTOS_EXITO,
    payload: productos
})

//Eliminar producto
export function eliminarProducto(id) {
    return async (dispatch) => {
        dispatch(procesando());
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito(id));
            //Mostramos la notificacion de la eliminación exitosa
            Swal.fire("Eliminado!", "¡El producto se elimino correctamente!", "success");
        } catch (error) {
            dispatch(errorProcesando(true));
        }
    }
}

const eliminarProductoExito = id => ({
    type: ELIMINAR_PRODUCTO_EXITO,
    payload: id
});

//Seleccion del producto a ser editado
export function seleccionarProductoEditar(producto) {
    return (dispatch) => {
        dispatch(seleccionarProductoEditarAction(producto));
    }
}

const seleccionarProductoEditarAction = producto => ({
    type: SELECCIONAR_PRODUCTO_EDITAR,
    payload: producto
});

//Editar producto
export function editarProducto(producto) {
    return async (dispatch) => {
        dispatch(procesando());
        try {
            const response = await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoAction(response.data));
        } catch (error) {
            console.log(error);
            dispatch(errorProcesando(true));
        }
    }
}

const editarProductoAction = producto => ({
    type: EDITAR_PRODUCTO_EXITO,
    payload: producto
});