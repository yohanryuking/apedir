import React,{useState} from "react";
import { Link } from "react-router-dom";
import { eventoMargin } from "../styles/styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Card, CardFooter } from "@nextui-org/react";
import './styles.css'
import { getBussinessImage } from "../../api/bussiness";
import { getEventByName } from "../../api/events";
import {Avatar} from "@nextui-org/react";

export default function Eventos(props) {
  const [event, setEvent] = React.useState(null);
  const [image, setImage] = useState(null);

  React.useEffect(() => {
    const fetchEvent = async () => {
      const e = await getEventByName(props.name);
      setEvent(e);
      
      const img = await getBussinessImage(e.bussiness);
      setImage(img);
    };
    fetchEvent();
  }, []);
  
  return (
    // <div style={eventoMargin}>
    //   <Link to={`/evento/${props.nombre}`} aria-label="evento">
    //     <Card
    //       style={{
    //         borderRadius: "20px",
    //         overflow: "hidden",
    //         // width: "180px",
    //         // height: "200px",
    //         width: "300px",
    //         height: "300px",
    //         boxShadow: "none",
    //         border: ".8px solid #D4D4D8"
    //       }}
    //       className="card-events"
    //     >
    //       <LazyLoadImage
    //         alt={props.nombre}
    //         src={props.imagen}
    //         effect="blur"
    //         // style={{ objectFit: "cover", width: "200px", height: "200px" }}
    //         style={{ objectFit: "cover", width: "300px", height: "300px" }}
    //         // delayMethod="debounce"
    //         threshold={100}
    //         delayTime={300}
    //         placeholderSrc={props.imagen}
    //         useIntersectionObserver={true}
    //         className="card-events-lazyload"
    //       />
    //     </Card>
    //   </Link>
    // </div>
    <Link to={`/evento/${props.name}`} aria-label="evento">
    <Card
      isFooterBlurred
      className="w-full h-[300px] col-span-12 sm:col-span-5 card-producto-list-home"
      style={{
        boxShadow: "none",
        position: "relative",
        border: ".8px solid #D4D4D8",
      }}
    >
      <div >
        {/* <Avatar isBordered src={image} style={{position: "absolute", top: "10px ", left: " 10px", zIndex: "50"}}/> */}
      </div>
      <LazyLoadImage
        effect="blur"
        alt="Card example background"
        src={props.imagen}
        // style={{ width: "100%", objectFit: "cover" }}
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

        {/* <Button as={Link} to={`lugar/${props.url}`} className="text-tiny" color="primary" radius="full" size="sm">
          Visitar Sitio
        </Button> */}
        <Avatar isBordered src={image} style={{margin: "2px 10px 3px 5px"}}/>
      </CardFooter>
    </Card>
    </Link>
    
  );
}
