import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/autenticacion/AuthContext";

const Register = (props) => {
  //Context
  const authContext = useContext(AuthContext);
  const { mensaje, registrarUsuario } = authContext;

  //States
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    passwordCon: "",
  });

  const [alerta, setAlerta] = useState(null);

  const { nombre, email, password, passwordCon } = usuario;

  useEffect(() => {
    if (mensaje) {
      setAlerta(mensaje);

      if (mensaje.tipo === "alert-success")
        setUsuario({
          nombre: "",
          email: "",
          password: "",
          passwordCon: "",
        });

      props.history.push("/");
    }
  }, [mensaje, props.history]);

  //Funciones
  const handlerSubmit = (e) => {
    e.preventDefault();
    setAlerta(null);
    //validamos la información
    if (nombre.trim() === "" || email.trim() === "" || password.trim() === "") {
      setAlerta({
        tipo: "alert-danger",
        msg: "Todos los campos son obligatorios",
      });
      return;
    }

    //Password minimo de 8 caracteres
    if (password.trim().length < 8) {
      setAlerta({
        tipo: "alert-danger",
        msg: "La contraseña debe tener minimo 8 caracteres",
      });
      return;
    }

    //las 2 contraseñas deben ser iguales
    if (passwordCon !== password) {
      setAlerta({
        tipo: "alert-danger",
        msg: "Las contraseñas deben ser iguales",
      });
      return;
    }

    //Submit de la creación del usuario
    registrarUsuario({ nombre, email, password });
  };

  const handlerChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="row align-items-center mt-3">
      <div className="col-lg-3"></div>
      <div className="col-lg-6 jumbotron">
        <form className="container-sm" onSubmit={handlerSubmit}>
          <h1 className="text-center">Crear una cuenta</h1>
          {alerta && (
            <p className={`alert ${alerta.tipo} text-center`}>{alerta.msg}</p>
          )}
          <div className="form-group">
            <label htmlFor="inputEmail">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="inputNombre"
              name="nombre"
              value={nombre}
              onChange={handlerChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              name="email"
              value={email}
              onChange={handlerChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              aria-describedby="passwordHelp"
              name="password"
              value={password}
              onChange={handlerChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPasswordConfirm">Confirmar Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPasswordConfirm"
              name="passwordCon"
              value={passwordCon}
              onChange={handlerChange}
            />
            <small id="passwordHelp" className="form-text text-muted">
              We'll never share your password with anyone else.
            </small>
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-3">
            Crear Usuario
          </button>
          <Link to={"/"}>Iniciar Sesión</Link>
        </form>
      </div>
      <div className="col-lg-3"></div>
    </div>
  );
};

export default Register;
