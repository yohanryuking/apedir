import React, { useState, useEffect } from 'react'
import { useCategoryFilter, useFiltredBussiness, useFiltredEvents, useFiltredProducts, useProvinceStore, useSearchInput } from '../../../hooks/useStore'
import { getBussiness, getEvents, getProducts } from '../../../api/search';
import useDebouncedValue from '../../../hooks/useDebounce';
import Bussinesses from './Bussinesses';
import TituloDeSeccion from '../../Seccion/TituloDeSeccion';
import { container, section } from '../../styles/styles';
import Products from './Products';
import Events from './Events';

export default function FiltredItems() {
    const rawSearchInput = useSearchInput(state => state.search);
    const searchInput = useDebouncedValue(rawSearchInput, 1000);
    const province = useProvinceStore(state => state.province)
    const bussinessList = useFiltredBussiness(state => state.bussinessList)
    const setBussinessList = useFiltredBussiness(state => state.seBussinessList)
    const products = useFiltredProducts(state => state.products)
    const setProducts = useFiltredProducts(state => state.seProducts)
    const events = useFiltredEvents(state => state.events)
    const setEvents = useFiltredEvents(state => state.setEvents)
    const category = useCategoryFilter(state => state.category)

    // Listas originales
    const [originalBusinessList, setOriginalBusinessList] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [originalEvents, setOriginalEvents] = useState([]);

    useEffect(() => {
        const fetchFiltredBussiness = async () => {
            const bList = await getBussiness(searchInput)
            setBussinessList(bList)
            setOriginalBusinessList(bList) // Guarda la lista original de negocios
        }

        const fetchFiltredProducts = async () => {
            const pList = await getProducts(searchInput)
            setProducts(pList)
            setOriginalProducts(pList) // Guarda la lista original de productos
        }

        const fetchFiltredEvents = async () => {
            const eList = await getEvents(searchInput)
            setEvents(eList)
            setOriginalEvents(eList)
        }

        if (searchInput !== "") {
            fetchFiltredEvents()
            fetchFiltredProducts()
            fetchFiltredBussiness()

        }
    }, [searchInput]);

    useEffect(() => {
        if (province !== "todas") {
            const bList = originalBusinessList.filter(bussiness => bussiness.province === province)
            setBussinessList(bList)
            const pList = originalProducts.filter(product => product.province === province)
            setProducts(pList)
            const eList = originalEvents.filter(event => event.province === province)
            setEvents(eList)
        }
        else {
            setEvents(originalEvents)
            setBussinessList(originalBusinessList)
            setProducts(originalProducts)
        }
    }, [province]);

    useEffect(() => {
        if (category !== "todas") {
            const bList = originalBusinessList.filter(bussiness => bussiness.category === category)
            setBussinessList(bList)
        }
        else {
            setEvents(originalEvents)
        }
    }, [category]);


    return (
        <div>
            {searchInput !== "" && <>
                <div style={container}
                    className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none top-0 inset-x-0  backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
                >
                    <section className="section px-6" style={section}>
                        <TituloDeSeccion title='Eventos' />
                        <Events filtredEvents={events} />
                    </section>
                </div>

                <div style={container}
                    className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none top-0 inset-x-0  backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
                >
                    <section className="section px-6" style={section}>
                        <TituloDeSeccion title='Productos' />
                        <Products filtredProducts={products} />
                    </section>
                </div>


                <div style={container}
                    className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none top-0 inset-x-0  backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
                >
                    <section className="section px-6" style={section}>
                        <TituloDeSeccion title='Negocios' />
                        <Bussinesses filtredBussinesses={bussinessList} />
                    </section>
                </div>

            </>}
        </div>
    )
}
