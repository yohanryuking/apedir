import React, { useEffect, useState } from "react";
import "./header.css";
import LogoCarritoNegro from "../../assets/logoReduce/LogoCarritoNegro";
import { useCartStore, whatsappBussinessLink } from "../../hooks/useStore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input, Textarea, Button, Badge
} from "@nextui-org/react";
import { grid_1_col } from "../styles/styles";
import { Toaster, toast } from "sonner";

export default function Carrito() {
  const whatsapp = whatsappBussinessLink(state => state.whatsapp)
  const [isInvisible, setIsInvisible] = React.useState(false);
  const carrito = useCartStore((state) => state.cart);
  const setCarrito = useCartStore((state) => state.setCart);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //const {cantidad,setCantidad} = useState(null);
  const productInfo = carrito.map((product) => {
    return `${product.title},  Cantidad: ${product.quantity}`;
  });

  const [nombre, setNombre] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [detalles, setDetalles] = React.useState("");
  const mensaje = `-------Apedir-------%0A%0ANombre: ${nombre}%0ADirección: ${direccion}%0ADetalles: ${detalles}%0A%0A------Productos------- %0A%0A${productInfo.join(
    "%0A"
  )}`;
   
  const enviarMensaje = () => {
    if ((nombre === "") | (direccion === ""))
      return toast.error("Los campos no pueden estar vacios");

    const url = `https://wa.me/${whatsapp}?text=${mensaje}`;
    window.open(url, "_blank");
  };

  /** */
  const incrementar = (product) => {
    const newQuantity = product.quantity + 1;
    const valuePrice = product.price / product.quantity;
    const newPrice = product.price + valuePrice;
    setCarrito(
      carrito.map((p) =>
        p.title === product.title
          ? { ...p, quantity: newQuantity, price: newPrice }
          : p
      )
    );
  };

  const disminuir = (product) => {
    if (product.quantity > 1) {
      const newQuantity = product.quantity - 1;
      const valuePrice = product.price / product.quantity;
      const newPrice = product.price - valuePrice;
      setCarrito(
        carrito.map((p) =>
          p.title === product.title
            ? { ...p, quantity: newQuantity, price: newPrice }
            : p
        )
      );
    } else {
      setCarrito(carrito.filter((p) => p.title !== product.title));
    }
  };

  useEffect(() => {
    const newTotalPrice = carrito.reduce(
      (total, product) => total + product.price,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [carrito]);

  const isCarritoVacio = carrito.length === 0;

  const btn = {
    background: "white",
    color: "black",
    borderRadius: "50%",
    border: "1px solid black",
    width: "30px",
    height: "30px",
    display: "grid",
    placeItems: "center",
  };
  const center = {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    placeItems: "center",
    width: "100%",
    color: "white",
    textAlign: "center",
  };

  return (
    <div className="mt-2">
      {isCarritoVacio ? (
        <LogoCarritoNegro w={30} />
      ) : (
        <>
          <Button onClick={onOpen} className="carritoBtn2">
            <Badge
              color="danger"
              content={carrito.length > 9 ? "+9" : carrito.length}
              isInvisible={isInvisible}
              shape="circle"
            >
              <LogoCarritoNegro w={30} />
            </Badge>
          </Button>

          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
            <Toaster
              position="bottom-center"
              duration={3000}
              expand={false}
              richColors
              theme="dark"
              style={{ zIndex: "560" }}
            />
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Carrito
                  </ModalHeader>
                  <ModalBody
                    style={{ minHeight: "300px", background: "white" }}
                  >
                    <div className="carrito-list-products" >
                      {carrito.map((product, index) => (
                        <div key={index}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "5px", placeItems: "center" }}>
                            {/* <img
                              src={product.image}
                              alt={product.title}
                              width="50px"
                            /> */}
                            <span>
                              <p>{product.title}</p>
                            </span>
                            <span style={{ display: "flex", gap: "1rem" }}>
                              <button onClick={() => disminuir(product)} style={btn}>
                                -
                              </button>
                              {product.quantity}
                              <button onClick={() => incrementar(product)} style={btn}>
                                +
                              </button>
                            </span>
                            <span>$ {product.price}</span>
                          </div>
                          <hr />
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <p>Precio Total: </p>
                      <strong>$ {totalPrice}</strong>
                    </div>

                    <div style={grid_1_col}>
                      <Input
                        type="text"
                        variant="bordered"
                        label="Nombre"
                        placeholder="Escriba el nombre de la persona encargada de recibir el pedido"
                        labelPlacement="outside"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />

                      <Textarea
                        variant="bordered"
                        label="Dirección"
                        labelPlacement="outside"
                        placeholder="Dirección a donde enviar el pedido"
                        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                      />

                      <Textarea
                        variant="bordered"
                        label="Algun otro detalle"
                        labelPlacement="outside"
                        placeholder="Existe algun otro detalle como tocar el timbre, cuidado que hay perro, segunda planta etc que quieras añadir"
                        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                        value={detalles}
                        onChange={(e) => setDetalles(e.target.value)}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onClick={enviarMensaje}>
                      Enviar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
}
