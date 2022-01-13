import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../../../context/UserContext";

export default function LoginForm({ setToken }) {
  const context = useContext(AuthContext);
  const { dataAuth, setUser } = context;
  const [loginUser, setLoginUser] = useState({
    user_name: "",
    password: "",
  });

  const TOKEN = "token";

  useEffect(() => {
    getTokenLocalStorage();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //const {name, value} = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:4000/users/login", {
          user_name: loginUser.user_name,
          password: loginUser.password,
        })
        .then((response) => {
          console.log(response);
          localStorage.setItem(TOKEN, response.data.token);
          setToken(response.data.token);
          setLoginUser({
            user_name: "",
            password: "",
          });
          const dataDecode = jwtDecode(response.data.token);
          const user = {
            auth: {
              user_name: dataDecode.user.user_name,
              name: dataDecode.user.name,
              token: response.data.token,
              user_id: dataDecode.user.id,
            },
          };
          setUser(user);
        });
    } catch (error) {}
  };

  const getTokenLocalStorage = () => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      const dataDecode = jwtDecode(token);
      const user = {
        auth: {
          user_name: dataDecode.user.user_name,
          name: dataDecode.user.name,
          token: token,
          user_id: dataDecode.user.id,
        },
      };
      setUser(user);
    }
  };

  return (
    <>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          value={loginUser.user_name}
          onChange={handleInput}
        />

        <label>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginUser.password}
          onChange={handleInput}
        />

        <button type="submit">Login</button>
      </form>
    </>
  );
}
