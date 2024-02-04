import React from 'react';
import IconosNegocio from "../Iconos/IconosNegocio";

export default function Contact(props) {
    
 const style = {
     width: "100%", 
     marginTop: "30px", 
     display: "grid",
     placeItems: "center",
     color: "white",
     padding: "20px"
 }
 const fuente = {
     fontSize: "30px",
     fontWeight: "bold",
     textAlign: "center"
 }

 return (
 <>
 <div id="props.titulo" style={style} className="mb-2">
     <h2 style={fuente} id="contact"> {props.title}</h2>
 </div>
 
 <IconosNegocio idNegocio = {props.idNegocio} color = {props.color}></IconosNegocio>
 </>
 );
}
