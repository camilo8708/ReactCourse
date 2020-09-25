import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
//redux
import { useDispatch } from "react-redux";
import {
  eliminarProducto,
  seleccionarProductoEditar,
} from "../actions/productoActions";

const Producto = ({ producto }) => {
  //dispatch
  const dispatch = useDispatch();
  const history = useHistory();

  const handlerClickEditar = (producto) => {
    dispatch(seleccionarProductoEditar(producto));
    history.push(`/productos/editar/${producto.id}`);
  };

  const handlerClickEliminar = (id) => {
    //Preguntamos si esta seguro de eliminar el producto
    Swal.fire({
      title: "¿Esta Seguro?",
      text: "¡Un producto que se elimina no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        //llamamos el action de eliminar
        dispatch(eliminarProducto(id));
      }
    });
  };

  const { id, nombre, precio } = producto;
  return (
    <tr>
      <td>{nombre.trim()}</td>
      <td>
        <span className="font-weight-bold">$ {precio}</span>
      </td>
      <td className="acciones">
        <button
          className="btn btn-primary mr-2"
          onClick={() => handlerClickEditar(producto)}
        >
          Editar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handlerClickEliminar(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;
