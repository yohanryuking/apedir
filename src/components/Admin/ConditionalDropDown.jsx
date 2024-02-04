// ConditionalDropDown.js
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function ConditionalDropDown({ status, onChange }) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([status]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  // Llama a la función `onChange` proporcionada con el valor seleccionado
  const handleSelectionChange = (selectedKeys) => {
    setSelectedKeys(selectedKeys);
    if (onChange) {
      const selectedValue = Array.from(selectedKeys)[0];
      onChange(selectedValue);
    }
  };

  return (
    <Dropdown className="ml-2">
      <DropdownTrigger>
        <Button
          variant="shadow"
          color="secondary"
          className="capitalize text-white w-4"
        >
          {selectedValue === "true" ? "Si" : "No"}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        color="secondary"
        variant="shadow"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem key="true">Si</DropdownItem>
        <DropdownItem key="false">No</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
