import React, { Fragment } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import ListProducts from './components/ListProducts'

function App() {

  const fecha = new Date().getFullYear();

  return (
    <Fragment>
      <Header
        titulo='Tienda Virtual'
      />

      <ListProducts />

      <Footer
        fecha={fecha}
      />
    </Fragment>
  );
}

export default App;
