import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function PlanDropDown({ plan, onChange }) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([plan]));

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
        <DropdownItem key="gratis">Gratis</DropdownItem>
        <DropdownItem key="basico">Básico</DropdownItem>
        <DropdownItem key="premium">Premium</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
