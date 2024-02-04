import React, { useState } from "react";

import LocationIcon from "../../Icons/Location/Location";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Image,
  Button,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Card
} from "@nextui-org/react";
import { MarginTop30 } from "../../styles/styles";
import ShareLink from "../Share/ShareLink";
import { NotificationIcon } from "../../Icons/NotificationIcon";
import { addOrDeleteSubscription } from "../../../api/profile";
import "./style.css";
import { DeliveryIcon } from "../../Icons/DeliveryIcon";
import InformationIcon from "../../Icons/information/InformationIcon";
import Horario from "../Horario/Horario";
import IconosNegocio from "../Iconos/IconosNegocio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faInfo, faInfoCircle, faLocation, faLocationDot, faLocationPin } from "@fortawesome/free-solid-svg-icons";

export default function BtnDescription(props) {
  const location = {
    background: "transparent",
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    padding: "0",
    fontWeight: "0",
    lineHeight: "0",
    maxWidth: "40px",
    minWidth: "40px",
  };

  const imagenLocalizacion = {
    maxWidth: "300px",
    marginTop: "30px",
  };
  const [clicked, setClicked] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  return (
    <div className="flex gap-4 items-center" style={MarginTop30}>
      {props.suscrito === false ? (
        <Button
          color="primary"
          className="btn-sub"
          onClick={() => {
            props.setIsSub(true);
            addOrDeleteSubscription(props.userId, props.bussinessId);
            setClicked(true);
          }}
        >
          <p style={{color: "white"}}>Suscribirse</p>
          <div className="svg-icon-notification ">
            <FontAwesomeIcon icon={faBell} size="xl" />

          </div>
        </Button>
      ) : (
        <Button
          color="primary"
          className="btn-sub"
          onClick={() => {
            props.setIsSub(false);
            addOrDeleteSubscription(props.userId, props.bussinessId);
            setClicked(true);
          }}
        >
          <p>Suscrito</p>
          <div className="svg-icon-notification ">
            <FontAwesomeIcon icon={faBell} />
          </div>
        </Button>
      )}

      <ShareLink url={props.url}></ShareLink>

      {props.delivery && <DeliveryIcon width="36px" height="36px" />}

      {props.localizacion !== undefined ? (
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button color="secondary" style={location}>
              <FontAwesomeIcon icon={faLocationDot} size="2x" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">Direccion</div>
              <div className="text-tiny">
                {props.localizacion}
                <Image
                  isZoomed
                  src={props.gps_location}
                  alt=""
                  style={imagenLocalizacion}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : null}

      <Button onClick={onOpen} style={{ maxWidth: "36px", minWidth: "36px", background: "transparent", padding: "0" }}>
        {/* <InformationIcon color = {"transparent"} w = "27px" ></InformationIcon> */}
        <FontAwesomeIcon icon={faInfoCircle} size="2x" />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full" >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1" style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
                <img src={props.bussiness.perfil_pic} alt="" style={{ width: "50px ", height: "50px", borderRadius: "10px" }} />
                {props.bussiness.name}
              </ModalHeader>
              <ModalBody style={{ padding: "10px" }}>
                <div style={{ height: "calc(100vh - 300px)", overflow: "scroll", width: "100%" }}>
                  <p style={{ marginBottom: "30px" }}>
                    {props.description}
                  </p>
                  <IconosNegocio color={"black"} idNegocio={props.bussinessId}></IconosNegocio>

                  <Card style={{ width: "95%", margin: "2%" }}>
                    <Horario bussiness={props.bussiness}></Horario>
                  </Card>

                </div>

              </ModalBody>
              <ModalFooter>

                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>

            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
