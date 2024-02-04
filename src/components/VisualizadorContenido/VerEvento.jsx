import React from "react";
import { getBussinessImage } from "../../api/bussiness";
import { getEventByName } from "../../api/events";
import HeaderNegocio from "../Negocio/HeaderNegocio/HeaderNegocio";
import EventoCard from "./EventoCard";
import BotonesEventos from "./BotonesEventos";
import DescripcionEvento from "./DescripcionDeEvento";
//import HorarioEvento from "./HorarioEvento";
import TituloEvento from "./TituloEvento";
import LoaderCompletePage from "../Loader/LoaderCompletePage";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function VerEvento() {
  const { nombre } = useParams();
  const [image, setImage] = useState(null);
  const sectionStyle2 = {
    width: "100%",
    maxWidth: "450px",
    height: "100vh",
    background: "#202632",
  };
  const sectionStyle = {
    width: "100%",
    maxWidth: "450px",
    display: "flex",
    height: "calc(100vh - 64px)",
    flexDirection: "column",
    background: "#202632",
    position: "relative",
  };

  const sectionDescription = {
    width: "100%",
    padding: "20px",
    position: "absolute",
    marginTop: "20px",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    height: "45vh",
  };

  const overflow = {
    marginTop: "20px",
    zIndex: "50",
    overflowY: "scroll",
  };

  const [event, setEvent] = React.useState(null);

  React.useEffect(() => {
    const fetchEvent = async () => {
      
      const e = await getEventByName(nombre);
      setEvent(e);
      const img = await getBussinessImage(e.bussiness);
      setImage(img);
    };
    fetchEvent();
  }, []);


  return event !== null ? (
    <div className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      <div style={sectionStyle2}>
        <section style={sectionStyle}>
          <HeaderNegocio
            logo={image}
            nombre={nombre}
            horario={"no"}
            anterior={"/"}
            event={nombre}
          ></HeaderNegocio>

          <section>
            <EventoCard image={event.image} />

            <div style={sectionDescription}>
              <TituloEvento title={event.name}></TituloEvento>
              {/* <HorarioEvento></HorarioEvento> */}

              <div style={overflow}>
                <DescripcionEvento
                  descripcion={event.description}
                ></DescripcionEvento>
              </div>
              <p className="text-white">Teléfono: {event.phone_number}</p>
              <BotonesEventos whatsapp = {event.phone_number}></BotonesEventos>
            </div>
          </section>
        </section>
      </div>
    </div>
  ) : (
    <LoaderCompletePage />
  );
}
