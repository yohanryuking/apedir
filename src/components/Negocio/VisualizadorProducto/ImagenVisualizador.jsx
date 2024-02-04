import React from 'react'
import "./visualizarProducto.css";

export default function ImagenVisualizador(props) {
  const img = {
    height: "40vh",
    maxHeight: "70vh",
    //width: "100%",
    // borderRadius: "0px",
    objectFit: "contain",
    //width: "350px",
    marginTop: "70px",
    borderRadius: "15px"
  };
  const img2 = {
    height: "65vh",
    maxHeight: "70vh",
    //width: "100%",
    borderRadius: "0px",
    objectFit: "cover",
    width: "450px",
    position: "absolute",
    top: 0
  };

  const center = {
    width: "100%",
    height: "70vh",
    maxHeight: "70vh",
    display: "grid",
    placeItems: "start",
    position: "relative",
    justifyContent: "center",
   
  };
  const background = {
    background: "linear-gradient(#0e131700,#0E1317,#0E1317)",

    position: "absolute",
    bottom: "0",
    zIndex: "30",
    // height : "40vh",
    width: "100%"

  }

  return (
    <div style={center}>
      <img
        
        style={{...img, zIndex: "90"}}
        src={props.image}
        alt="NextUI Album Cover Image with delay"
        classNames="m-5"
      />
      <img
        className='blur-img-fondo'
        style={{...img2, zIndex: "88"}}
        src={props.image}
        //alt="NextUI Album Cover Image with delay"
        
      />
      
      <div className="bgtransparent" style={{zIndex: "91"}}></div>
    </div>
  );
}
