import { combineReducers } from 'redux';
import prodcutosReducer from './productosReducer';
import alertaReducer from './alertaReducer';

export default combineReducers({
    productos: prodcutosReducer,
    alerta: alertaReducer
});