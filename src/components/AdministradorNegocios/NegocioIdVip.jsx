import React, { useState } from "react";
import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { CardStyles, LogoStyle , ImgCardStyle} from "../styles/styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useBussinessStore } from "../../hooks/useStore";
import './vip.css'

function NegocioIdVip(props) {
  const setBussiness = useBussinessStore((state) => state.setBussiness);
  const [render, setRender] = useState(0);

  return (
    <Card
      className="py-4 tarjeta-negocio-card-vip"
      style={
        props.index === props.isSelected
          ? {
              border: "2px solid #5E17EB",
              ...CardStyles,
              //margin: "5px 5px 5px 5px",
            }
          : { ...CardStyles }
      }
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{props.localizacion}</p>

        <h2
          className="font-bold text-large mb-2 titulo-card-negocio-panntalla-principal"
          style={{}}
        >
          {props.nombre}
        </h2>
        <span
          className="text-danger"
          onClick={() => {
            setBussiness(props.bussiness);
            props.onOpenChange();
          }}
          style={{position: "absolute", top: "10px", right: "10px"}}
        >
          <DeleteIcon />
        </span>
      </CardHeader>
      <CardBody
        style={ImgCardStyle}
        onClick={() => {
          setBussiness(props.bussiness);
          props.setIsSelected(props.index);
        }}
        className="overflow-visible py-2 card-body-seccion"
      >
        <LazyLoadImage
          alt={props.nombre}
          src={props.imagen}
          effect="blur"
          style={{ ...LogoStyle, objectFit: "cover" }}
          placeholderSrc={props.imagen}
          useIntersectionObserver={true}
          className="lazyload"
          threshold={100}
          delayTime={300}
          delayMethod="throttle"
        />
      </CardBody>
    </Card>
  );
}

export default NegocioIdVip;
