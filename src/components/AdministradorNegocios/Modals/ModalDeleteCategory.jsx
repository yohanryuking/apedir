import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import { deleteCategoryById } from "../../../api/categories";

export default function ModalDeleteCategory({
  isOpen,
  onOpen,
  onOpenChange,
  categoryToDelete,
  fetchCategories,
  bussiness,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteCategory = async (id) => {
    setIsDeleting(true);
    await deleteCategoryById(id);
    categoryToDelete.current = {
      bussiness: bussiness.id,
      category: "",
    };
    delete categoryToDelete.current.id;
    setIsDeleting(false);
    fetchCategories();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Eliminar a {categoryToDelete.category}</ModalHeader>
              <ModalBody>
                ¿Estás seguro de que quieres eliminar la categoria{" "}
                {categoryToDelete.category}?
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={onClose}
                  disabled={isDeleting}
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  onClick={async () => {
                    await deleteCategory(categoryToDelete.current.id);
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
