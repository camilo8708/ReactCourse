import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export const tokenAuth = token => {
    if (token)
        clienteAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    else
        delete clienteAxios.defaults.headers.common['Authorization'];
}

export default clienteAxios;