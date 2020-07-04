import React, {useState} from "react";
import Error from "./Error";
import PropTypes from 'prop-types';
import uuid from "react-uuid";

const Formulario = ({restante, guardarGasto, nuevoGasto}) => {
  //states
  const [nombre, cambiarNombre] = useState('');
  const [valor, cambiarValor] = useState(0);
  const [error, cambiarError] = useState(false);

  const crearGasto = event => {
    event.preventDefault();
    cambiarError(false);
    //Validar
    if (nombre.trim() === '' || isNaN(valor) || valor < 1 || valor > restante) {
      cambiarError(true);
      return;
    }

    //Construir gasto
    let gasto = {
      nombre,
      valor,
      id: uuid()
    }

    //Guardar gasto
    nuevoGasto(true);
    guardarGasto(gasto);

    //Limpiar formulario
    cambiarNombre('');
    cambiarValor(0);
  }

  return (
    <form className="container" onSubmit={crearGasto}>
      <h2>Agrega tus gastos aquí</h2>
      {error && <Error mensaje="Ambos campos son obligatorios o presupuesto invalido"/>}
      <br/>
      <div className="campo">
        <label>Nombre Gasto</label>
        <input
          type="text"
          placeholder="Ej. Transporte"
          className="form-control"
          value={nombre}
          onChange={e => {
            cambiarNombre(e.target.value)
          }}
        />
      </div>

      <div className="campo">
        <label>Valor Gasto</label>
        <input
          type="number"
          placeholder="Ej. 500"
          className="form-control"
          value={valor}
          onChange={e => {
            cambiarValor(isNaN(e.target.value) ? 0 : parseInt(e.target.value))
          }}
        />
      </div>

      <div className="campo">
        <button
          type="submit"
          className="btn btn-primary btn-block"
        >Agregar Gasto
        </button>
      </div>
    </form>
  );
}

Formulario.propType = {
  restante: PropTypes.number.isRequired,
  guardarGasto: PropTypes.func.isRequired,
  nuevoGasto: PropTypes.func.isRequired
}

export default Formulario;