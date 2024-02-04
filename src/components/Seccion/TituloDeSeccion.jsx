import React from 'react'
import { titleStyles } from "../styles/styles";

export default function TituloDeSeccion(props){

    return(
        <div style={titleStyles }>
            <h2>{props.title}</h2>
        </div>
    );
} 