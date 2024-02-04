import React from 'react'
import Eventos from '../../Eventos/Eventos';

export default function Events({ filtredEvents }) {
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
            {filtredEvents !== null &&
                filtredEvents.map((item) => {
                    return (

                        <Eventos
                            key={item.id}
                            nombre={item.name}
                            imagen={item.image}
                        />

                    );
                })}
        </div>
    )
}


