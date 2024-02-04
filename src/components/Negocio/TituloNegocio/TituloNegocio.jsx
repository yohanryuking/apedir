import React from 'react'
//import { FontBold40px, FontBold30px } from "../../styles/styles";

export default function TituloNegocio(props){

    return(
        <h2 style={{fontSize: "1.7em"}} className="mt-2">
            {props.title}
        </h2>
    );
}