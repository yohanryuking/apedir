import { useEffect } from 'react'

import { eventsStore, merchantNovedades, useProductsHome } from './useStore'

import { getAllEvents } from '../api/events';
import { getAllNovedades } from '../api/novedades';
import { getAllProductsVipsFirst } from '../api/products';


export default function useHomeData() {
    const setEvents = eventsStore(state => state.setEvents)
    const setNovedades = merchantNovedades(state => state.setNovedades)
    const setProducts = useProductsHome(state => state.setProducts)

    const fetchEvents = async () => {
        const e = await getAllEvents();
        setEvents(e);
    };
    const fetchNovedades = async () => {
        const n = await getAllNovedades();
        setNovedades(n);
    };

    const fetchProducts = async () => {
        const resultados = await getAllProductsVipsFirst();
        setProducts(resultados);
    };
    useEffect(() => {
        fetchEvents()
        fetchNovedades();
        fetchProducts();
    }, []);

    return
}
