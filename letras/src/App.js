import React, {Fragment, useEffect, useState} from 'react';
import Formulario from "./components/Formulario";
import Letra from "./components/Letra";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import Info from "./components/Info";

function App() {
  const [busquedaLetra, updateBusquedaLetra] = useState({});
  const [infoLetra, updateinfoLetra] = useState('');
  const [infoArtista, updateinfoArtista] = useState({});

  useEffect(() => {
    const consultarApiLetra = async () => {
      const urlApiLetra = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const urlApiArtista = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
       const[responseLetra, responseArtista] = await Promise.all([
         axios.get(urlApiLetra),
         axios.get(urlApiArtista)
       ]);

      updateinfoLetra(responseLetra.data.lyrics);
      updateinfoArtista(responseArtista.data.artists[0]);
    }

    const {artista, cancion} = busquedaLetra;

    if (Object.keys(busquedaLetra).length !== 0) {
      consultarApiLetra();
    }
  }, [busquedaLetra]);

  return (
    <Fragment>
      <Formulario
        updateBusquedaLetra={updateBusquedaLetra}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info
              infoArtista={infoArtista}
            />
          </div>
          <div className="col-md-6">
            <Letra
              infoLetra={infoLetra}
            />
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
