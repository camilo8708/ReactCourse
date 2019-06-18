import React, { Fragment } from 'react';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import './bootstrap.min.css';

function App() {

  return (
    <div className="container">
      <Header
        titulo='Administrador Pacientes Veterinaria'
      />

      <div className="row">
        <div className="col-md-10 mx-auto">
          <NuevaCita />
        </div>
      </div>
    </div>
  );
}

export default App;
