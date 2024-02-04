import React from "react";
import {Avatar} from "@nextui-org/react";
import { MarginTop10, flex_center } from "../../styles/styles";

export default function Logo(props) {

    const avatar = {
        width: "100px",
        height: "100px",
        marginLeft: "10px",
        marginRight: "20px"
    }

    const green = {
        color: "green"
    }

    const red = {
        color: "red"
    }

    
  return (
    <div style={flex_center}>
        <Avatar isBordered color="default" src={props.logo} style={avatar}/>
        <div style={MarginTop10}>
            {props.estado === "Abierto" ? <h2 style={green}>Abierto</h2>:<h2 style={red}>Cerrado</h2>}
            <h2>{props.nombre}</h2>
        </div>
    </div>
    
  );
}
