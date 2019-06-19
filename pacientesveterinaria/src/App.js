import React, { Component } from 'react';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';
import './bootstrap.min.css';

class App extends Component {

  state = {
    citas: []
  }

  crearNuevaCita = datos => {
    const citas = [...this.state.citas, datos]

    this.setState({ citas })
  }

  //Elimina citas del state
  eliminarCita = id => {
    //Tomar una copia al state
    const citasActuales = [...this.state.citas];

    // Utilizar filter para sacar el @ id
    const citas = citasActuales.filter(cita => cita.id !== id);

    //Actualizar state
    this.setState({
      citas
    });
  }

  render() {
    return (
      <div className="container">
        <Header
          titulo='Administrador Pacientes Veterinaria'
        />

        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita
              crearNuevaCita={this.crearNuevaCita}
            />
          </div>

          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas 
              citas = {this.state.citas}
              eliminarCita = {this.eliminarCita}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default App;
