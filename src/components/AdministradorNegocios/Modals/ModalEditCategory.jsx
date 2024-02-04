import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { updateCategory } from "../../../api/categories";

export default function ModalEditCategory({
  fetchCategories,
  isOpen,
  onOpenChange,
  categoryInput,
  bussiness,
}) {
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(0);

  const handleUpdateCategory = async () => {
    console.log(categoryInput.current);
    await updateCategory(categoryInput.current);
    categoryInput.current = {
      id: "",
      bussiness: bussiness.id,
      category: "",
    };
    delete categoryInput.current.id;
    console.log(categoryInput.current);
    await fetchCategories();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar Categoría {categoryInput.current.category}
              </ModalHeader>

              <ModalBody>
                <Input
                  autoFocus
                  maxLength={30}
                  label="Nombre"
                  placeholder="Escribe el nombre de la categoría"
                  variant="bordered"
                  value={categoryInput.current.category}
                  onChange={(event) => {
                    categoryInput.current = {
                      ...categoryInput.current,
                      category: event.target.value,
                    };
                    setRender((render) => render + 1);
                  }}
                />

                <p>{categoryInput.current.category.length} / 30</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="secondary"
                  onPress={() => {
                    handleUpdateCategory();
                    onClose();
                  }}
                >
                  {loading ? "Editando..." : "Editar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
