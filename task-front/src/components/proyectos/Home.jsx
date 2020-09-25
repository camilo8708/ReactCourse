import React, { Fragment, useContext, useEffect } from "react";
import Sidebar from "../layaout/Sidebar";
import Barra from "../layaout/Barra";
import FormularioTareas from "../tareas/FormularioTareas";
import { AuthContext } from "../../context/autenticacion/AuthContext";

const Home = () => {
  //Context
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();

    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <div className="bg-light col-md-9 ml-sm-auto col-lg-9">
            <div className="row">
              <Barra />
              <div className="container text-center">
                <FormularioTareas />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
