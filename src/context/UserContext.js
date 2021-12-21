import { createContext } from "react";

const UserContext = createContext({
  username: null,
  school: null,
  year: null,
});
export default UserContext;
