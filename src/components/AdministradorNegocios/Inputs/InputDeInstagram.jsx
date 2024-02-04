import React from "react";
import {Input,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image} from "@nextui-org/react";
import InformationIcon from "../../Icons/information/InformationIcon";
import ImagenInsta from "../../../assets/guia/faceInstagram.png"

export default function InputDeInstagram({ value }) {
  const [render, setRender] = React.useState(0);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Input
        type="url"
        label="Instagram"
        placeholder="Nombre de tu usuario en Instagram sin @"
        variant="bordered"
        labelPlacement="outside"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small"></span>
          </div>
        }
        value={
          value.current.instagram !== undefined &&
          value.current.instagram !== null
            ? value.current.instagram
            : ""
        }
        onChange={(event) => {
          value.current = {
            ...value.current,
            instagram: event.target.value,
          };
          setRender((render) => render + 1);
        }}
      />
      <Button onPress={onOpen} style={{marginTop: "30px", width: "50px", maxWidth: "50px", minWidth: "50px", padding: "0px", background: "transparent"}}> <InformationIcon w={"40px"}  color = {"transparent"}></InformationIcon></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Guía para insertar perfil de Instagram</ModalHeader>
              <ModalBody>
                <p> 
                  Para agregar a tu negocio un link con la dirección de tu cuenta de instagram lo unico que debes hacer es insertar el nombre de tu usuario
                </p>
                <p>
                   A continuación se muestra un ejemplo de la ubicación del usuario de instagram: 
                </p>
                
                <Image src={ImagenInsta}></Image>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
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
