import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const Navbar = ({ logout }) => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = () => {
    const token = localStorage.getItem("token");
    const decodeToken = jwtDecode(token);
    const user_name = decodeToken.user.user_name;
    setUsername(user_name);
  };

  return (
    <>
      <h1>Esto es un navbar</h1>
      <button onClick={logout}>CERRAR SESION</button>
      <Link to={`/${username}`}>Mis Pokemons</Link>
      <Link to="/">Home</Link>
    </>
  );
};
