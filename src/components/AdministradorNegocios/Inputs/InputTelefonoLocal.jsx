import React from "react";
import { Input } from "@nextui-org/react";
import TelefonoIcon from "../../Icons/Llamada/Telefono";

export default function InputTelefonoLocalNumber({ value }) {
  const [render, setRender] = React.useState(0);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    // Asegúrate de que el valor ingresado solo contenga números
    if (/^\d+$/.test(inputValue)) {
      value.current = {
        ...value.current,
        local_phone: inputValue,
      };
      setRender((render) => render + 1);
    }
  };

  return (
    <Input
      type="tel"
      label="Telefono del Local"
      variant="bordered"
      placeholder="22 XXXXXX"
      labelPlacement="outside"
      value={value.current.local_phone}
      endContent={<TelefonoIcon w="20px" />}
      onChange={handleInputChange}
    />
  );
}
