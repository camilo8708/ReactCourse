import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/proyectos/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProyectoProvider from './context/proyectos/ProyectoContext';
import TareaProvider from './context/tareas/TareaContext';
import AuthProvider from './context/autenticacion/AuthContext';
import RutaPrivada from './components/rutas/RutaPrivada';

function App() {
  return (
    <ProyectoProvider>
      <TareaProvider>
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <RutaPrivada exact path="/home" component={Home} />
            </Switch>
          </Router>
        </AuthProvider>
      </TareaProvider>
    </ProyectoProvider>
  );
}

export default App;
