import React from "react";
import { Button } from "@nextui-org/react";
import { grid_2_col_center } from "../../styles/styles";
import { useCartStore } from "../../../hooks/useStore";
import { Toaster, toast } from "sonner";

export default function DescripcionDeP(props) {
  const glass = {
    width: "90%",
    position: "absolute",
    bottom: "0px",
    height: "32vh",
    background: "rgba(150, 156, 161, 0.411)",
    borderRadius: "20px",
    marginBottom: "3%",
    padding: "10px",
    zIndex: "1000",
    border: "gray 1px solid",
  };
  const center = {
    display: "grid",
    placeItems: "center",
    width: "100%",
    color: "white",
    textAlign: "center",
  };
  const centertext = {
    display: "grid",
    placeItems: "center",
    width: "100%",
    color: "white",
    textAlign: "center",
    height: "15vh",
    overflowY: "scroll",
  };
  const title = {
    color: "#FFD600",
    fontWeight: "bold",
    fontSize: "30px",
  };

  const btn = {
    marginTop: "15px",
    width: "95%",
  };

  const carrito = useCartStore((state) => state.cart);
  const setCarrito = useCartStore((state) => state.setCart);
  const handleClick = () => {
    if (props.cantidad === 0) {
      props.onQuantityChange(0);
      return toast.error("No agregaste nada al carrito");
    }
   
    const newOrder = {
      title: props.title,
      quantity: props.cantidad,
      image: props.image,
      price: props.price * props.cantidad,
    };
   
    const updatedCart = carrito.map(item => {
      if (item.title === newOrder.title) {
        return {
          ...item,
          quantity: item.quantity + newOrder.quantity,
          price: item.price + newOrder.price,
        };
      }
      props.onQuantityChange(0);
      return item;
    });
   
    if (!updatedCart.find(item => item.title === newOrder.title)) {
      props.onQuantityChange(0);
      updatedCart.push(newOrder);
    }
   
    setCarrito(updatedCart);
    props.onQuantityChange(0);
   };
   

  return (
    <div
      style={glass}
      className=" backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
    >
      <Toaster
              position="bottom-center"
              duration={3000}
              expand={false}
              richColors
              theme="dark"
              style={{zIndex: "560"}}
            />
      <div style={center}>
        <h2
          style={{
            ...title,
            maxWidth: "20ch",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "1.4rem",
          }}
        >
          {props.title}
        </h2>
      </div>
      <div style={centertext}>
        <article style={{ fontSize: ".9rem" }}>{props.text}</article>
      </div>

      <div style={grid_2_col_center}>
        <Button
          color="primary"
          style={{ zIndex: "100", width: "100%", color: "black" }}
          onClick={handleClick}
        >
          Agregar al Carrito
        </Button>
        <Button
          color="primary"
          variant="bordered"
          onPress={props.onClose} // Usando la función onClose aquí
          style={{
            zIndex: "100",
            width: "100%",
            //color: "white",
          }}
        >
          Volver
        </Button>
      </div>
    </div>
  );
}
