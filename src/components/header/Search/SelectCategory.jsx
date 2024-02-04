import React, { useEffect, useState } from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";

import { useCategoryFilter } from '../../../hooks/useStore';
import { getBussinessCategories } from '../../../api/search';
export default function SelectCategory({ value }) {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Todas"]));

    const [categories, setCategories] = useState([])
    // const province = useProvinceStore((state) => state.province);
    const setCategory = useCategoryFilter(state => state.setCategory)
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),

        [selectedKeys]
    );

    const handleSelectionChange = (selectedKeys) => {
        setSelectedKeys(selectedKeys);
        const selectedValue = Array.from(selectedKeys)[0];
        setCategory(selectedValue);
        if (value) {
            value.current = {
                ...value.current,
                category: selectedValue
            }
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const catList = await getBussinessCategories()
            setCategories(catList)
        }
        fetchCategories()
    }, []);

    return categories.length > 0 && (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="bordered"
                    className="capitalize"
                    style={{ paddingLeft: "10px" }}
                >
                    <p>Categoría</p>
                    <p style={{ width: "100%", display: "flex" }}>{value ? value.current.category : selectedValue}</p>
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={handleSelectionChange}
                style={{ padding: "20px" }}
            >
                {categories.map((item) => {
                    return <DropdownItem key={item.name}>{item.name}</DropdownItem>
                })}
            </DropdownMenu>
        </Dropdown>
    );
}

