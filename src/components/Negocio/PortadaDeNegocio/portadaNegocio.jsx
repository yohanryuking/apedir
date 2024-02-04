import React from "react";
import { PortadaDeNegocioStyles } from "../../styles/styles";
import { Imagen100pcCover } from "../../styles/styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
//import { Helmet } from "react-helmet";
import './style.css'

export default function PortadaDeNegocio(props) {

  const imagenFondo = {
    width: '100%',
    position: "absolute",
    top: "0",

  }

  return (
    <div style={PortadaDeNegocioStyles}>
      {/* <Helmet>
        <link
          fetchpriority="high"
          rel="preload"
          href={props.imagenPortada}
          as="image"
        />
      </Helmet> */}
      <img src={props.imagenPortada} alt="" style={imagenFondo}  className="blur-img-fondo"/>
      <LazyLoadImage
        alt={props.nombre}
        src={props.imagenPortada}
        effect="blur"
        style={{ ...Imagen100pcCover, objectFit: "cover" }}
        delayMethod="debounce"
        delayTime={100}
        placeholderSrc={props.imagen}
        useIntersectionObserver={true}
      />
    </div>
  );
}
