import React, { useEffect } from "react";

import { Tab, Tabs } from "@nextui-org/react";
import { getNovedadesfromBussiness } from "../../api/novedades";

import {
    merchantNovedades,
    useBussinessStore
} from "../../hooks/useStore";

import NovedadCard from "./NovedadCard"

export default function NovedadesManagement() {
    const bussiness = useBussinessStore((state) => state.bussiness);

    const novedades = merchantNovedades((state) => state.novedades);
    const setNovedades = merchantNovedades((state) => state.setNovedades);

    const fetchNovedades = async () => {
        const novList = await getNovedadesfromBussiness(bussiness.id);
        setNovedades(novList);
    };

    useEffect(() => {
        if (bussiness) {
            fetchNovedades();
        }
    }, [bussiness]);

    return (
        <Tabs aria-label="seleccion de eventos" fullWidth>
            <Tab key="create" title="Agregar Novedad">
                {bussiness?.id && <NovedadCard bussinessId={bussiness.id} />}
            </Tab>
            {novedades.map((item) => (
                <Tab key={item.id} title={item.name}>
                    <NovedadCard
                        bussinessId={bussiness.id}
                        bussiness={bussiness}
                        event={item}
                    />
                </Tab>
            ))}
        </Tabs>
    );
}
