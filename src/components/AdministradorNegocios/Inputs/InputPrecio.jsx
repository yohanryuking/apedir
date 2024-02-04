import React, { useState } from "react";
import { Input } from "@nextui-org/react";

export default function InputPrecio({ value, setValues }) {
  return (
    <Input
      type="number"
      label="Precio"
      placeholder="0.00"
      variant="bordered"
      value={value.price}
      isInvalid={typeof value.price == "string"}
      onChange={(event) => {
        setValues({
          ...value,
          price: parseFloat(event.target.value),
        });
      }}
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">$</span>
        </div>
      }
      endContent={
        <div className="flex items-center">
          <label className="sr-only" htmlFor="currency">
            Currency
          </label>
          <select
            className="outline-none border-0 bg-transparent text-default-400 text-small"
            id="currency"
            name="currency"
            value={value.currency}
            onChange={(event) => {
              setValues({
                ...value,
                currency: event.target.value,
              });
            }}
          >
            <option>CUP</option>
            <option>MLC</option>
            <option>EUR</option>
            <option>USD</option>
          </select>
        </div>
      }
    />
  );
}
