import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/UserContext";

export default function () {
  const context = useContext(AuthContext);
  console.log(useParams());
  console.log(context.dataAuth.auth.user_name);
  const myUsername = context.dataAuth.auth.user_name;
  const username = useParams().username;
  return (
    <div>
      <h2>Esto es USER {username}</h2>

      <h2>Mi username es {myUsername}</h2>

      {username === myUsername
        ? "Si! Podes borrar todo"
        : "Nooo, volvete a tu casa"}
    </div>
  );
}
