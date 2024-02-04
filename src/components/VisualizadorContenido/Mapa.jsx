import React from 'react'
import { Image } from "@nextui-org/react";

const mapa = {
    zIndex: "40",
    width: "90%",
    minHeight: "100px"
}
export default function Mapa(){
    return(
        <div style={mapa}>
            <Image
                src="https://motor.elpais.com/wp-content/uploads/2022/01/google-maps-22.jpg"
            />
        </div>
    );
}