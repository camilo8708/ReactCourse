import React from 'react';
import useSelect from '../hooks/useSelect';
import PropTypes from 'prop-types';

const Formulario = ({updateCategoria}) => {
  //Categorias
  const CATEGORIAS = [
    {value:'general', label:'General'},
    {value:'business', label:'Negocios'},
    {value:'entertainment', label:'Entretenimiento'},
    {value:'health', label:'Salud'},
    {value:'science', label:'Ciencia'},
    {value:'sports', label:'Deportes'},
    {value:'technology', label:'Tecnología'}
  ]

  const [ categoria, SelectNoticias ] = useSelect('geneal', CATEGORIAS);

  //Submit Categoria
  const handleSubmit = e => {
    e.preventDefault();
    updateCategoria(categoria);
  }
  return (
    <div className="container text-uppercase text-center">
      <form
        onSubmit={handleSubmit}
      >
        <h1 className="font-weight-bold">Encuentra noticias por categoria</h1>
        <SelectNoticias />
        <br/>
        <button className="btn btn-warning btn-block btn-lg text-white"
          type="submit"
        >Buscar</button>
      </form>
    </div>
  );
};

Formulario.propTypes = {
  updateCategoria: PropTypes.func.isRequired
}

export default Formulario;