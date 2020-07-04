import React, {Fragment, useEffect, useState} from 'react';
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListadoNoticias from "./components/ListadoNoticias";


function App() {
  const [categoria, updateCategoria] = useState('');
  const [noticias, updateNoticias] = useState([]);

  useEffect(() => {
    const cargarNoticias = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=co&category=${categoria}&apiKey=22860384e33544478316fbdf6186d77a`;

      const noticias = await axios.get(url);
      updateNoticias(noticias.data.articles);
    }

    cargarNoticias();
  }, [categoria])

  return (
    <Fragment>
      <Header mensaje="Buscador de Noticias"/>
      <div className="container">
        <Formulario
          updateCategoria={updateCategoria}
        />
        <br/>
        <ListadoNoticias
          noticias={noticias}
        />
      </div>
    </Fragment>
  );
}

export default App;
