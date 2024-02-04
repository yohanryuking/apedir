import React, { useState } from "react";

import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Textarea,
  Input,
  Button,
  CircularProgress,
} from "@nextui-org/react";
import { UploadIcon } from "../../Icons/UploadIcon";
import { updateProduct } from "../../../api/products";
import InputPrecio from "../Inputs/InputPrecio";
import { addNotification } from "../../../api/notifications";

export default function ModalEditProduct({
  isOpen,
  onOpen,
  onOpenChange,
  productInput,
  setProductInput,
  handleImageChange,
  imageName,
  setImageName,
  fetchProducts,
  bussiness,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEditProduct = async () => {
    await updateProduct(productInput, imageName);
    if (bussiness) {
      let notification = {
        message: `El negocio ${bussiness.name} ha cambiado el producto ${productInput.name}.`,
        bussiness: bussiness.id,
        addressee: null,
        bussiness_link: bussiness.value_url,
      };
      addNotification(notification);
    }
    setImageName("");
    setProductInput({
      name: "",
      price: 0,
      currency: "CUP",
      description: "",
      image: "",
      category: "",
      isAvalaible: true,
    });

    fetchProducts();
  };

  return (
    <>
      <Modal
        isOpen={isOpen} // Usa el estado para controlar la apertura del modal
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar {productInput.name}
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  required
                  maxLength={30}
                  label="Nombre"
                  placeholder="Escribe el nombre del producto"
                  variant="bordered"
                  value={productInput.name}
                  onChange={(event) =>
                    setProductInput({
                      ...productInput,
                      name: event.target.value,
                    })
                  }
                />
                <p>{productInput.name.length} / 30</p>

                <Textarea
                  autoFocus
                  maxLength={120}
                  label="Descripción"
                  required
                  placeholder="Escribe la descripción del producto"
                  variant="bordered"
                  value={productInput.description}
                  onChange={(event) =>
                    setProductInput({
                      ...productInput,
                      description: event.target.value,
                    })
                  }
                />
                <p>{productInput.description.length} / 120</p>
                <InputPrecio value={productInput} setValues={setProductInput} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <label style={{ fontSize: "0.75em" }}>
                    Selecciona una imagen.
                  </label>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <label
                    style={{
                      backgroundColor: "#5E17EB",
                      padding: "5px 60px",
                      borderRadius: "10px",
                    }}
                  >
                    <div>
                      <UploadIcon width={30} />
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                      />
                    </div>
                    {isLoading === true && (
                      <CircularProgress
                        className="text-white"
                        color="secondary"
                        label="Subiendo la imagen..."
                      />
                    )}
                  </label>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  className="text-white"
                  color="secondary"
                  onPress={() => {
                    setIsLoading(true);
                    handleEditProduct();
                    setIsLoading(false);
                    onClose();
                  }}
                >
                  Editar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
