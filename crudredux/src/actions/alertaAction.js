import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../types';

// Funcion para mostrar alerta
export function mostrarAlerta(alerta) {
    return (dispatch) => {
        dispatch(mostrarAlertaDispatch(alerta));
    }
}

// Funcion para ocultar alerta
export function ocultarAlerta() {
    return (dispatch) => {
        dispatch(ocultarAlertaDispatch());
    }
}

const mostrarAlertaDispatch = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
});

const ocultarAlertaDispatch = alerta => ({
    type: OCULTAR_ALERTA
});