import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import { deleteProductById } from "../../../api/products";

export default function ModalDeleteProduct({
  isOpen,
  onOpen,
  onOpenChange,
  productToDelete,
  fetchProducts,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteProduct = async (id) => {
    setIsDeleting(true);
    await deleteProductById(id);
    setIsDeleting(false);
    fetchProducts();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Eliminar a {productToDelete.name}</ModalHeader>
              <ModalBody>
                ¿Estás seguro de que quieres eliminar el producto{" "}
                {productToDelete.name}?
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
                    await deleteProduct(productToDelete.id);
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
