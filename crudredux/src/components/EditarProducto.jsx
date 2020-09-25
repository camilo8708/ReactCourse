import React, { useState, useEffect } from "react";
import { editarProducto } from "../actions/productoActions";
import { useHistory } from "react-router-dom";
//Redux
import { useSelector, useDispatch } from "react-redux";

const EditarProducto = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: 0,
  });

  //Cargamos la información del Store
  const productoEditar = useSelector((state) => state.productos.productoEditar);
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);

  useEffect(() => {
    setProducto(productoEditar);
  }, [productoEditar]);

  const dispatch = useDispatch();
  const history = useHistory();

  if (producto === null) return null;

  const { nombre, precio } = producto;

  const handlerSubmit = (e) => {
    e.preventDefault();

    //Realizamos validaciones

    //Ejecutamos el action
    dispatch(editarProducto(producto));
    history.push("/");
  };

  const handlerChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>

            <form onSubmit={handlerSubmit}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  placeholder="Nombre Producto"
                  value={nombre}
                  onChange={handlerChange}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  className="form-control"
                  type="number"
                  name="precio"
                  placeholder="Precio Producto"
                  value={precio}
                  onChange={handlerChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block text-uppercase"
              >
                {!cargando ? (
                  "Guardar Cambios"
                ) : (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </button>
            </form>
            {error && (
              <p className="alert alert-danger p-2 mt-4 text-center">
                Hubo un error
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;
