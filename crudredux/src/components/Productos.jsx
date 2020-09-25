import React, { Fragment, useEffect } from "react";
import Producto from "./Producto";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { consultarProductos } from "../actions/productoActions";

const Productos = () => {
  //dispacth
  const dispatch = useDispatch();

  //Store
  const productos = useSelector((state) => state.productos.productos);
  const error = useSelector((state) => state.productos.error);
  const cargando = useSelector((state) => state.productos.loading);

  useEffect(() => {
    dispatch(consultarProductos());
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <h2 className="text-center my-5">Listado de Productos</h2>

      {error && (
        <p className="alert alert-danger font-weight-bold text-center mt-4">
          Hubo un error
        </p>
      )}

      {cargando && <p className="text-center font-weight-bold">Cargando...</p>}

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th className="">Nombre</th>
            <th className="">Precio</th>
            <th className="">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td className="text-center" colSpan={"3"}>
                No hay productos
              </td>
            </tr>
          ) : (
            productos.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Productos;
