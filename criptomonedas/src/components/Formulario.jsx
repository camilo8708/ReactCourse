import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import axios from 'axios';
import Error from "./Error";

import useMoneda from '../hooks/useMoneda';
import useCriptoMoneda from '../hooks/useCriptoMoneda';

const Boton = styled.button`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #FFF;
  transition: background-color .3s ease;
  
  &:hover {
    background-color: #326AC0;
    cursor:pointer;
  }
`;

const Formulario = ( {updateMoneda, updateCripto} ) => {
  const MONEDAS = [
    {codigo: 'MXN', nombre: 'Peso Mexicano'},
    {codigo: 'USD', nombre: 'Dolar Estadounidense'},
    {codigo: 'EUR', nombre: 'Euro'},
    {codigo: 'CAD', nombre: 'Dolar Canadiense'},
    {codigo: 'COP', nombre: 'Peso Colombiano'}
  ]

  const [ listaCripto, updateListaCripto ] = useState([]);
  const [ error, updateError ] = useState(false);

  const [ moneda, SelectMoneda ] = useMoneda('Elije tu Moneda', '', MONEDAS);
  const [ cripto, SelectCripto ] = useCriptoMoneda('Elije tu CriptoMoenda', '', listaCripto);

  useEffect(()=>{
    const consultarCripto = async ()=>{
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

      const response = await axios.get(url);
      updateListaCripto(response.data.Data);
    }
    consultarCripto();
  },[])

  const handleSubmit = e => {
    e.preventDefault();
    //validamos el error
    if(moneda === '' || cripto === ''){
      updateError(true);
      return;
    }
    //Pasamos al State principal
    updateError(false);

    updateMoneda(moneda);
    updateCripto(cripto);
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      {error && <Error mensaje="Todos los campos son obligatorios" /> }
      <SelectMoneda/>
      <SelectCripto/>
      <Boton type="submit"> Calcular </Boton>
    </form>
  );
};

export default Formulario;