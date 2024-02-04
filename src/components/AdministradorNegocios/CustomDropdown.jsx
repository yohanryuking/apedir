// ConditionalDropDown.js
import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function CustomDropdown({
  status,
  onChange,
  items,

}) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([status]));

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
          {Array.from(selectedKeys)[0]}
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
        {items.map((item, index) => (
          <DropdownItem key={item}>{item}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
