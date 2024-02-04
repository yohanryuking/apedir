import React from 'react'
import ComponenteLugar from '../../Seccion/ComponenteLugar';
import { showFilter } from '../../../hooks/useStore';


export default function Bussinesses({ filtredBussinesses }) {
    const setShowFilter = showFilter(state => state.setShowFilter)
    return (

        <div
            className="list-container"
            style={{
                gap: "10px",
                display: "grid",
                placeItems: "center",
                alignContent: "stretch",
            }}
        >

            {filtredBussinesses !== null &&
                filtredBussinesses.map((item) => {
                    return (
                        <div key={item.id}>
                            <ComponenteLugar
                                id={item.id}
                                imagen={item.perfil_pic}
                                localizacion={item.province}
                                gps_location={item.gps_location}
                                nombre={item.name}
                                numeroPersonas={item.numeroPersonas}
                                url={item.value_url}
                            ></ComponenteLugar>
                        </div>
                    );
                })}

        </div>

    );
}
