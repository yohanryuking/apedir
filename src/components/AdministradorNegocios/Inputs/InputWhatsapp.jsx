import React from "react";
import { Input } from "@nextui-org/react";
import WhatsappIcons from "../../Icons/whatsapp/WhatsappIcon";

export default function InputWhatsapp({ value, setValue }) {
 const [render, setRender] = React.useState(0);

 const handleInputChange = (event) => {
   const inputValue = event.target.value;
   // Asegúrate de que el valor ingresado solo contenga números
   if (/^\d+$/.test(inputValue)) {
     value.current = {
       ...value.current,
       whatsapp: inputValue,
     };
     setRender((render) => render + 1);
   }
 };

 return (
   <Input
     type="tel"
     label="Número de Whatsapp"
     variant="bordered"
     placeholder="+53 XXXXXXXX"
     labelPlacement="outside"
     value={value.current.whatsapp}
     endContent={<WhatsappIcons w="20px" />}
     onChange={handleInputChange}
   />
 );
}
