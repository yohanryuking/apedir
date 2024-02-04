import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function ActiveDropdw({ isActive, onChange }) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([isActive === true? 'active' : 'inactive']));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
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
          {selectedValue}
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
        <DropdownItem key="active">Activo</DropdownItem>
        <DropdownItem key="inactive">Inactivo</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
