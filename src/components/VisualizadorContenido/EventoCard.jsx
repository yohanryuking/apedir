import React from "react";
import "./evento.css";
import Like from "../Like/Like";

export default function EventoCard({ image }) {
  const img = {
    height: "30vh",
    marginTop: "5vh",
    borderRadius: "10px"
  };
  const img2 = {
    height: "44vh",
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
    zIndex: "50",
  };
  const like = {
    zIndex: "50",
    position: "absolute",
    right: "15px",
    bottom: "40%",
  };

  return (
    <div style={center}>
      <img
        style={{...img, zIndex: "100"}}
        src={image }
        alt="NextUI Album Cover Image with delay"
        className="m-5"
      />
       <img
        className='blur-img-fondo'
        style={{...img2, zIndex: "88"}}
        src={image}
        //alt="NextUI Album Cover Image with delay"
        
      />
      <div style={like}>
        <Like></Like>
      </div>
    </div>
  );
}
