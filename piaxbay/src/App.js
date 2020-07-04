import React, {useEffect, useState} from 'react';
import Formulario from "./components/Formulario";
import axios from "axios";
import ListaImagenes from "./components/ListaImagenes";

function App() {
  const [busqueda, updateBusqueda] = useState('');
  const [imagenes, updateImagenes] = useState([]);
  const [totalPaginas, updateTotalPaginas] = useState(1);
  const [paginaActual, updatePaginaActual] = useState(1);

  useEffect(() => {
    const buscarImagenes = async () => {
      const numResultados = 24;
      const key = '16809797-9a80b1d1cdb740441f51a27b7'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${numResultados}&page=${paginaActual}`;

      const response = await axios.get(url);

      updateImagenes(response.data.hits);
      updateTotalPaginas(Math.ceil(response.data.totalHits / numResultados));

      //posicionamos la pagina al incio
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
    }

    if (busqueda !== '')
      buscarImagenes();
  }, [busqueda, paginaActual]);

  const botonAnterior = () => {
    if (paginaActual > 1)
      updatePaginaActual(paginaActual - 1);
  }

  const botonSiguiente = () => {
    if (paginaActual < totalPaginas) {
      updatePaginaActual(paginaActual + 1);
    }
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes Pixabay</p>
        <Formulario updateBusqueda={updateBusqueda}/>
      </div>

      <div className="row justify-content-center">
        <ListaImagenes
          imagenes={imagenes}
        />
        {(paginaActual !== 1) && <button
          className="btn btn-primary mr-1"
          onClick={botonAnterior}
        >&laquo; Anterior</button>}
        {(paginaActual !== totalPaginas) && <button
          className="btn btn-primary ml-1"
          onClick={botonSiguiente}
        >Siguiente &raquo;</button>}
      </div>
    </div>
  );
}

export default App;
