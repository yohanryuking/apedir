import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import { deleteBussinessById } from "../../../api/bussiness";

export default function DeleteBussinessModal({
  isOpen,
  onOpenChange,
  bussinessToDelete,
  getAllBussinesses,
  merchant,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteBussiness = async (id) => {
    setIsDeleting(true);
    await deleteBussinessById(id);
    setIsDeleting(false);
    if (merchant) return;
    await getAllBussinesses();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Eliminar a {bussinessToDelete.name}</ModalHeader>
              <ModalBody>
                ¿Estás seguro de que quieres eliminar el negocio{" "}
                {bussinessToDelete.name}?
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  disabled={isDeleting}
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await deleteBussiness(bussinessToDelete.id);
                    onClose();
                  }}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Eliminando..." : "Eliminar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
