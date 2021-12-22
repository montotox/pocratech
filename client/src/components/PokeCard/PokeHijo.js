import React from "react";
import useUser from "../../hooks/useUser";

export default function PokeHijo() {
  const superContext = useUser();
  console.log(superContext);

  return <div></div>;
}
