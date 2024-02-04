import React, { Suspense} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button
 
} from "@nextui-org/react";
import DeniedIcon from "../Icons/DeniedIcon";
import CheckIcon from "../Icons/CheckIcon";
//import { Button } from "react-router-dom";
import { flex_center } from "../styles/styles";

export default function PricingCard({
  img,
  name,
  price,
  //bussiness_num,
  front_pic,
  perfil_pic,
  description,
  product_num,
  delivery,
  //open_hour,
  //close_hour,
  social_media,
  phone_number,
  email,
  gps_location,
  event_post,
  booking,
  //priorize,
}) {
  const customText = {
    // color: "#9353d3",
    color: "black",
    fontWeight: "bold",
    marginLeft: "5px",
    marginRight: "5px",
  };

  //const numero = 55971705
  const mensaje = `Buenas estoy interesado en un paquete ${name}`

  const enviarMensaje = () => {
    const numero = "55971705";
    const url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, "_blank");
  };

  return (
    <Suspense>
      <Card className="max-w-[200px] max-h-[300px]" style={{ margin: "10px" }}>
        <CardHeader className="flex gap-3" style={{ margin: "5px" }}>
          {img}
          {/* <Image alt="plan logo"  height={40} radius="sm" src={img} width={40} style={{color: "#9353d3"}}/> */}
          <div className="flex flex-col">
            <p className="text-large font-bold">
              {name} ${price}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <ul>
            {/* <div style={liStyle}>
            <li style={customText}>{bussiness_num} </li>
            <li>Negocio{bussiness_num > 1 ? "s" : ""}</li>
          </div> */}
            <div style={flex_center}>
              <li style={customText}>{front_pic}</li>
              <li> Foto de portada</li>
            </div>

            <div style={flex_center}>
              <li style={customText}>{perfil_pic}</li>
              <li>Foto de Perfil</li>
            </div>

            <div style={flex_center}>
              <li style={customText}>1</li>
              <li>Descripción de {description} caracteres</li>
            </div>

            <div style={flex_center}>
              {product_num === true ? (
                <CheckIcon width={20} />
              ) : (
                <DeniedIcon width={20} />
              )}
              <li>Productos y Servicios</li>
            </div>
            <div style={flex_center}>
              {delivery === true ? (
                <CheckIcon width={20} />
              ) : (
                <DeniedIcon width={20} />
              )}
              <li>Domicilio </li>
            </div>
            <div style={flex_center}>
              <CheckIcon width={20} />
              <li>Horario de trabajo</li>
            </div>

            <div style={flex_center}>
              <li style={customText}>{social_media}</li>
              <li>
                Red{social_media > 1 ? "es" : ""} social
                {social_media > 1 ? "es" : ""}
              </li>
            </div>

            <div style={flex_center}>
              <li style={customText}>{phone_number}</li>
              <li>Número{phone_number > 1 ? "s" : ""} de teléfono</li>
            </div>

            <div style={flex_center}>
              <li style={customText}>{email}</li>
              <li>
                Correo{email > 1 ? "s" : ""} electrónico{email > 1 ? "s" : ""}{" "}
              </li>
            </div>

            <div style={flex_center}>
              <li style={customText}>{gps_location}</li>
              <li>Localización por GPS</li>
            </div>

            <div style={flex_center}>
              {event_post === true ? (
                <CheckIcon width={20} />
              ) : (
                <DeniedIcon width={20} />
              )}
              <li>Posteo de eventos</li>
            </div>

            <div style={flex_center}>
              {booking === true ? (
                <CheckIcon width={20} />
              ) : (
                <DeniedIcon width={20} />
              )}
              <li>Reservaciones</li>
            </div>

            {name === "Premium" && (
              <div>
                <div style={flex_center}>
                  <CheckIcon width={20} />
                  <li>Página personalizada</li>
                </div>

                <div style={flex_center}>
                  <CheckIcon width={20} />
                  <li>Sus productos serán destacados</li>
                </div>

                <div style={flex_center}>
                  <CheckIcon width={20} />
                  <li>Sus servicios serán destacados</li>
                </div>
                <div style={flex_center}>
                  <CheckIcon width={20} />
                  <li>Acceso a nuevas features</li>
                </div>
              </div>
            )}
          </ul>
        </CardBody>
        <Divider />
        <CardFooter
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Button
            style={{
              padding: "10px 20px",
              backgroundColor: "#5E17EB",
              color: "white",
              fontWeight: "bold",
              borderRadius: "10px",
            }}
            onClick={enviarMensaje}
          >
            Comprar ahora
          </Button>
        </CardFooter>
      </Card>
    </Suspense>
  );
}
