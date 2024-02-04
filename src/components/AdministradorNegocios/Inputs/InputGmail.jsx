import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { MailIcon } from "./MailIcon";

export default function InputGmail({ value, setValue }) {
  const [render, setRender] = useState(0);
  return (
    <Input
      type="email"
      label="Email"
      variant="bordered"
      placeholder="ejemplo@ejemplo.com"
      labelPlacement="outside"
      value={value.current.email}
      endContent={
        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }
      onChange={(event) => {
        value.current = {
          ...value.current,
          email: event.target.value,
        };
        setRender((render) => render + 1);
      }}
    />
  );
}
