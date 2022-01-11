//Importar las páginas
import Home from "../pages/Home";
import User from "../pages/User";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/:username",
    component: User,
    exact: true,
  },
];

export default routes;
