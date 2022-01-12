import React, { useState } from "react";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

export default function Auth({ setToken }) {
  const [showLogin, setshowLogin] = useState(true);
  return (
    <>
      <div>
        {showLogin ? <LoginForm setToken={setToken} /> : <RegisterForm />}
      </div>
      <div>
        <p>
          {showLogin ? (
            <>
              ¿Todavía no estas registrad@?
              <span onClick={() => setshowLogin(false)}>Registrate</span>
            </>
          ) : (
            <>
              ¿Ya estas registrad@?
              <span onClick={() => setshowLogin(true)}>Ingresa</span>
            </>
          )}
        </p>
      </div>
    </>
  );
}
