import React from "react";
import {
  Card,
  CardFooter,
  
  Avatar,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./style.css";

export default function ProductosHome(props) {
  return (
    <Link to={`lugar/${props.url}`} style={{width: "100%"}}>
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5 card-producto-list-home"
        style={{
          boxShadow: "none",
          position: "relative",
          border: ".8px solid #D4D4D8",
        }}
      >
        <LazyLoadImage
          effect="blur"
          alt="Card example background"
          src={props.image}
          threshold={100}
          delayTime={300}
          placeholderSrc={props.imagen}
          useIntersectionObserver={true}
          className="lazyload-producto-home"
        />
        <div className="bg-black-bottom-top"></div>

        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between card-producto-home-footer">
          <div>
            <p
              className={
                "titulo-card-producto-panntalla-principal text-white text-tiny"
              }
            >
              {props.name}
            </p>
            <p className="text-white text-tiny  precio-card-producto-panntalla-principal">
              {props.price} {props.currency}
            </p>
          </div>
          <Avatar
            isBordered
            src={props.perfil}
            style={{ margin: "2px 10px 3px 5px" }}
          />
        </CardFooter>
      </Card>
    </Link>
  );
}
