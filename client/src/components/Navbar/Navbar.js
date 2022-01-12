import React from "react";

export const Navbar = ({ logout }) => {
  return (
    <>
      <h1>Esto es un navbar</h1>
      <button onClick={logout}>CERRAR SESION</button>
    </>
  );
};
