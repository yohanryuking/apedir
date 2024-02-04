import React from "react";
import { Input } from "@nextui-org/react";

export default function InputTitle({ value, setValue }) {
  const [render, setRender] = React.useState(0);

  return (
    <Input
      type="text"
      variant="bordered"
      label="Nombre"
      placeholder="Escriba el nombre de su negocio"
      labelPlacement="outside"
      value={value.current.name}
      onChange={(event) => {
        value.current = {
          ...value.current,
          name: event.target.value,
        };
        setRender((render) => render + 1);
      }}
    />
  );
}
