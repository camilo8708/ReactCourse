import React, {Fragment, useState} from "react";
import Error from "./Error";
import PropTypes from 'prop-types';

const Pregunta = ({asignarPresupuesto}) => {

  //States
  const [cantidad, guardarCantidad] = useState(0);
  const [error, guardarError] = useState(false);

  const definirPresupuesto = event => {
    guardarCantidad(parseInt(event.target.value, 10));
  }

  const agregarPresupuesto = event => {
    event.preventDefault();
    guardarError(false);
    //Validar
    if (cantidad <= 0 || isNaN(cantidad)) {
      guardarError(true);
      return;
    }

    //Guardar
    asignarPresupuesto(cantidad);
  }

  return (
    <Fragment>
      <form onSubmit={agregarPresupuesto}>
        <h2>Coloca tu presupuesto</h2>
        {error && <Error mensaje="El presupuesto es invalido"/>}
        <input
          type="number"
          placeholder="Ingresa tu presupuesto"
          name="cantidad"
          className="form-control"
          onChange={definirPresupuesto}
        />
        <br/>
        <button
          type="submit"
          className="btn btn-primary btn-block"
        >Definir Presupuesto
        </button>
      </form>
    </Fragment>
  );
}

Pregunta.propType = {
  asignarPresupuesto: PropTypes.func.isRequired
}

export default Pregunta;