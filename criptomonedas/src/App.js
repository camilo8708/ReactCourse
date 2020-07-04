import React, {useEffect, useState} from 'react';
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";
import axios from "axios";
import styled from "@emotion/styled";
import imagen from './cryptomonedas.png'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align:left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display:block;
  }
`;

function App() {

  const [moneda, updateMoneda] = useState('');
  const [cripto, updateCripto] = useState('');
  const [cotizacion, updateCotizacion] = useState({});
  const [load, updateLoad] = useState(false);

  useEffect(() => {

    const consultarCotizacion = async () => {
      if (moneda === '') return;

      updateLoad(true);
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      const request = await axios.get(url);
      setTimeout(()=>{
        updateLoad(false);
        updateCotizacion(request.data.DISPLAY[cripto][moneda]);
      }, 3000)
    }

    consultarCotizacion();
  }, [moneda, cripto]);

  const componente = load ? <Spinner /> : <Cotizacion cotizacion={cotizacion}/>;

  return (
    <Contenedor>
      <div>
        <Imagen className="Imagen" src={imagen} alt="Imagen Crito"/>
      </div>
      <div>
        <Heading className="Heading">
          Cotiza criptomonedas al instante
        </Heading>

        <Formulario
          updateMoneda={updateMoneda}
          updateCripto={updateCripto}
        />

        {componente}

      </div>
    </Contenedor>
  );
}

export default App;
