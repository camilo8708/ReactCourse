import React, {useEffect, useState} from 'react';
import Pregunta from "./components/Pregunta";
import Formulario from "./components/Formulario";
import ListadoGastos from "./components/ListadoGastos";
import ControlPresupuesto from "./components/ControlPresupuesto";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  //states
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [mostrarpregunta, mostrarPregunta] = useState(true);
  const [gastos, guardarGastos] = useState([]);
  const [gasto, guardarGasto] = useState({});
  const [nuevogasto, nuevoGasto] = useState(false);

  const asignarPresupuesto = (cantidad) => {
    guardarRestante(cantidad);
    guardarPresupuesto(cantidad);
    mostrarPregunta(false);
  }

  useEffect(() => {
    if(nuevogasto){
      guardarGastos([...gastos, gasto]);
      nuevoGasto(false);
      guardarRestante(restante - gasto.valor) ;
    }
  }, [gasto, nuevogasto, gastos, restante])

  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>
      </header>

      <div className="contenido-principal contenido">
        {mostrarpregunta ?
          <Pregunta
            asignarPresupuesto={asignarPresupuesto}
          />
          :
          <div className="row">
            <div className="col-md">
              <Formulario
                restante={restante}
                guardarGasto={guardarGasto}
                nuevoGasto={nuevoGasto}
              />
            </div>

            <div className="col-md">
              <ListadoGastos
                gastos={gastos}
              />

              <ControlPresupuesto
                presupuesto={presupuesto}
                restante={restante}
              />
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
