import React, { useState } from "react";
import axios from "axios";

export default function RegisterForm(props) {
  const { setShowLogin } = props;
  const [newUser, setNewUser] = useState({
    name: "",
    user_name: "",
    password: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // const {name, value} = e.target
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:4000/users/saveUser", {
          name: newUser.name,
          user_name: newUser.user_name,
          password: newUser.password,
        })
        .then((response) => {
          console.log(response);
          // setNewUser({
          //   name: "",
          //   user_name: "",
          //   password: "",
          // });
          setShowLogin(true);
        });
    } catch (error) {}
  };

  return (
    <>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newUser.name}
          onChange={handleInput}
        />

        <label>Username:</label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          value={newUser.user_name}
          onChange={handleInput}
        />

        <label>Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={newUser.password}
          onChange={handleInput}
        />
        <button type="submit">Registrar</button>
      </form>
      <p>
        ¿Ya tienes usuario?{" "}
        <span onClick={() => setShowLogin(true)}>Login</span>
      </p>
    </>
  );
}
