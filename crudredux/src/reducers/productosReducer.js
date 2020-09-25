import {
    PROCESANDO,
    ERROR,
    AGREGAR_PRODUCTO_EXITO,
    CONSULTAR_PRODUCTOS_EXITO,
    ELIMINAR_PRODUCTO_EXITO,
    SELECCIONAR_PRODUCTO_EDITAR,
    EDITAR_PRODUCTO_EXITO
} from '../types'

//Cada reducer tiene su propio State
const initialState = {
    productos: [],
    error: false,
    loading: false,
    productoEditar: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PROCESANDO:
            return {
                ...state,
                loading: action.payload
            }

        case ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                error: false,
                productos: [...state.productos, action.payload]
            }

        case CONSULTAR_PRODUCTOS_EXITO:
            return {
                ...state,
                loading: false,
                error: false,
                productos: action.payload
            }

        case ELIMINAR_PRODUCTO_EXITO:
            return {
                ...state,
                productos: state.productos.filter(producto => producto.id !== action.payload),
                error: false,
                loading: false
            }

        case SELECCIONAR_PRODUCTO_EDITAR:
            return {
                ...state,
                productoEditar: action.payload
            }

        case EDITAR_PRODUCTO_EXITO:
            return {
                ...state,
                productoEditar: null,
                productos: state.productos.map(producto => producto.id === action.payload.id ? action.payload : producto)
            }

        default:
            return state;
    }
}