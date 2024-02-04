import React from 'react'
import { Navbar, NavbarContent } from "@nextui-org/react"
import SelectProvincia from "../Search/SelectProvincia"
import SelectCategory from './SelectCategory'
import { showFilter as useShowFilter } from '../../../hooks/useStore'

export default function FilterBar() {
    const setShowFilter = useShowFilter(state => state.setShowFilter)
    return (
        <Navbar isBordered disableAnimation onFocus={() => setShowFilter(true)} >
            <NavbarContent as="div" style={{ gap: "30px", display: "flex", justifyContent: "center" }} >
                <SelectProvincia />
                <SelectCategory />
            </NavbarContent>
        </Navbar>
    )
}
