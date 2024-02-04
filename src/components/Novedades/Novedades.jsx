import React from "react";
import { Card, CardHeader, Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";
import "./style.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const truncateText = (input) =>
  input?.length > 75
    ? `${input.substring(0, 75)}<strong>...más</strong>`
    : input;

export default function Novedades({ novedad }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Card
        onClick={onOpen}
        isPressable
        className="max-w-[340px]"
        style={{
          width: "99%",
          boxShadow: "none",
          border: ".5px solid #E2E2E2",
        }}
      >
        <CardHeader className="justify-between">
          <div
            className="flex gap-5 novedades-container"
            style={{ gap: "15px" }}
          >
            <div>
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={novedad.perfil_pic}
              />
            </div>

            <div className="flex flex-col gap-1 items-start novedades-text-div">
              <h4
                className="text-small leading-none"
                dangerouslySetInnerHTML={{ __html: truncateText(novedad.text) }}
              ></h4>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-4">
                <Avatar
                  isBordered
                  radius="full"
                  size="md"
                  src={novedad.perfil_pic}
                />
                <h2 className="mt-2">{novedad.name}</h2>
              </ModalHeader>
              <ModalBody>
                <p>{novedad.text}</p>
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" style={{color: "white"}}>
                  <a href={`lugar/${novedad.url}`}>Visitar sitio</a>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
