import React from "react";
import { Input } from "@nextui-org/react";
import { PhoneIcon } from "./PhoneIcon";

export default function InputPhoneNumber({ value, setValue }) {
 const [render, setRender] = React.useState(0);

 const handleInputChange = (event) => {
   const inputValue = event.target.value;
   // Asegúrate de que el valor ingresado solo contenga números
   if (/^\d+$/.test(inputValue)) {
     value.current = {
       ...value.current,
       phone_number: inputValue,
     };
     setRender((render) => render + 1);
   }
 };

 return (
   <Input
     type="tel"
     label="Número Celular"
     variant="bordered"
     placeholder="+53 XXXXXXXX"
     labelPlacement="outside"
     value={value.current.phone_number}
     endContent={<PhoneIcon w="20px" />}
     onChange={handleInputChange}
   />
 );
}
