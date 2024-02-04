import React from "react";
import { Input } from "@nextui-org/react";
import TelegramIcon from "../../Icons/Telegram/Telegram";

export default function InputTelegram({ value, setValue }) {
  const [render, setRender] = React.useState(0);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    // Asegúrate de que el valor ingresado solo contenga números
    if (/^\d+$/.test(inputValue)) {
      value.current = {
        ...value.current,
        telegram_link: inputValue,
      };
      setRender((render) => render + 1);
    }
  };
  return (
    <Input
      type="tel"
      label="Link de Telegram"
      variant="bordered"
      placeholder="+53 XXXXXXXX"
      labelPlacement="outside"
      value={value.current.telegram_link}
      endContent={<TelegramIcon w="20px" />}
      onChange={handleInputChange}
    />
  );
}
