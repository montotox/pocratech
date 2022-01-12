import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes";
import { map } from "lodash";

export default function Navigation(props) {
  const pochita = "pocha";
  return (
    <Router>
      <Routes>
        {map(routes, (route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            element={<route.component />}
          />
        ))}
      </Routes>
    </Router>
  );
}

//Forma de hacer un elemento React desde un mapeo normal
// const lista = [{
//     input: "Home",
//     props: {
//         onClick: "handleSubmit",
//         className: "pochita",
//     }
// },
// {
//     input: "Profile",
//     props: {
//         onClick: "handleSubmit",
//         className: "pochita",
//     }
// }
// ];
// lista.map((componentes) => {
// React.createElement(componentes, props);
// })

// <Home onclick={handleSubmit} className="Pochita"/>
// <Profile onclick={handleSubmit} className="Pochita"/>
