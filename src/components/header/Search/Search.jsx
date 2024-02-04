import React from 'react'
import { SearchIcon } from './SearchIcon'
import { Input } from "@nextui-org/react"
import { useSearchInput, showFilter as useShowFilter } from '../../../hooks/useStore'

export default function Search() {
    const setShowFilter = useShowFilter(state => state.setShowFilter)
    const search = useSearchInput(state => state.search)
    const setSearch = useSearchInput(state => state.setSearch)

    return (
        <section style={{ width: "50%" }}>
            <Input placeholder='¿Deseas buscar algo?' size='' isClearable startContent={<SearchIcon />}
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value)
                }}
                onFocus={() => setShowFilter(true)}
                onClear={() => {
                    setSearch("")
                    setShowFilter(false)
                }}
            />
        </section>
    )
}
