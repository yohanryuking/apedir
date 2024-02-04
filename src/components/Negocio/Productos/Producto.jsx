import React, { useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Helmet } from "react-helmet";
//import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Card, CardBody, CardFooter,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Badge
} from "@nextui-org/react";
import { CardStyles2, ProductoStyle } from "../../styles/styles";

import ImagenVisualizador from "../VisualizadorProducto/ImagenVisualizador";
import DescripcionDeP from "../VisualizadorProducto/DescripcionDeP";
import OrdenarProducto from "../VisualizadorProducto/OrdenarProducto";
import PromoProducto from "../VisualizadorProducto/PromoProducto";
import "./productos.css";
import Crown from "../../Icons/bestchoise/crown";

export default function Producto({
  localizacion,
  nombre,
  title,
  img,
  price,
  index,
  description,
  currency,
  onChangeCarrito,
  isRecomended,
  url,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [cantidad, setCantidad] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const [isInvisible, setIsInvisible] = React.useState(false);

  const handleQuantityChange = (newQuantity) => {
    setCantidad(newQuantity);
  };

  const sectionStyle2 = {
    width: "100%",
    maxWidth: "450px",
    height: "100vh",
    background: "#0F0D13",
  };

  return (
    <div>
      <Helmet>
        <link fetchpriority="high" rel="preload" href={img} as="image" />
      </Helmet>

      
        <Badge
          content={<Crown w={"30px"} color={"white"}></Crown>}
          color="danger"
          isInvisible = {!isRecomended}
        >
          <Card
          shadow="sm"
          key={index}
          isPressable
          style={CardStyles2}
          className="producto-card"
          onClick={onOpen}
          id={title}
        >
          <CardBody className="overflow-visible p-0 card-body-productos" >
            <LazyLoadImage
              alt={title}
              src={img}
              effect="blur"
              style={{ ...ProductoStyle, objectFit: "cover" }}
              className="product-lazy-load"
              delayMethod="debounce"
              delayTime={300}
              placeholderSrc={img}
              useIntersectionObserver={true}
            />
          </CardBody>
          <CardFooter
            className="text-small justify-between card-footer-productos"
            // style={{
            //   height: "100%",
            //   display: "grid",
            //   gridTemplateColumns: "1fr 1fr",
            //   placeItems: "center",
            //   overflow: "hidden",
      
            // }}
          >
            <div style={{ gridColumn: "span 2", marginBottom: "10px" }}>
              <strong
                style={{
                  fontSize: "20px",
                  display: "inline-block",
                  maxWidth: "10ch",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </strong>
            </div>
            <div style={{ gridColumn: "span 2", marginBottom: "10px" }}>
              <p className="text-default-500">
                {price} {currency}
              </p>
            </div>

            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              size="full"
              style={{
                padding: "0px",
                background: "#0F0D13",
                position: "relative",
              }}
            >
              <ModalContent style={{ padding: "0px", position: " relative" }}>
                {(onClose) => (
                  <div>
                    <ModalBody
                      style={{
                        padding: "0px",
                        width: "100vw",
                        display: "grid",
                        placeItems: "center",
                        position: "relative",
                      }}
                    >
                      <div style={{ ...sectionStyle2, position: "relative" }}>
                        <ImagenVisualizador image={img} />
                      </div>

                      <div className="sectionDescription ">
                        <DescripcionDeP
                          title={title}
                          text={description}
                          // onAddToCart={handleAddToCart}
                          image={img}
                          cantidad={cantidad}
                          price={price}
                          onClose={onClose}
                          onQuantityChange={handleQuantityChange}
                        ></DescripcionDeP>
                        <OrdenarProducto
                          onChangeQuantity={setCantidad}
                        ></OrdenarProducto>

                        <PromoProducto url={url}></PromoProducto>
                      </div>
                    </ModalBody>
                  </div>
                )}
              </ModalContent>
            </Modal>
          </CardFooter>
        </Card>
        </Badge>
      
    </div>
  );
}

Producto.propTypes = {
  localizacion: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};


/***
 * 
 * 
 * <Card
          shadow="sm"
          key={index}
          isPressable
          style={CardStyles2}
          className="producto-card"
          onClick={onOpen}
          id={title}
        >
          <CardBody className="overflow-visible p-0" style={ImgCardStyle2}>
            <LazyLoadImage
              alt={title}
              src={img}
              effect="blur"
             // style={{ ...ProductoStyle, objectFit: "cover" }}
              className="product-lazy-load"
              delayMethod="debounce"
              delayTime={300}
              placeholderSrc={img}
              useIntersectionObserver={true}
            />
          </CardBody>
          <CardFooter
            className="text-small justify-between"
            style={{
              height: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              placeItems: "center",
              overflow: "hidden",
            }}
          >
            <div style={{ gridColumn: "span 2", marginBottom: "10px" }}>
              <strong
                style={{
                  fontSize: "20px",
                  display: "inline-block",
                  maxWidth: "10ch",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </strong>
            </div>
            <div style={{ gridColumn: "span 2", marginBottom: "10px" }}>
              <p className="text-default-500">
                {price} {currency}
              </p>
            </div>

            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              size="full"
              style={{
                padding: "0px",
                background: "#0F0D13",
                position: "relative",
              }}
            >
              <ModalContent style={{ padding: "0px", position: " relative" }}>
                {(onClose) => (
                  <div>
                    <ModalBody
                      style={{
                        padding: "0px",
                        width: "100vw",
                        display: "grid",
                        placeItems: "center",
                        position: "relative",
                      }}
                    >
                      <div style={{ ...sectionStyle2, position: "relative" }}>
                        <ImagenVisualizador image={img} />
                      </div>

                      <div className="sectionDescription ">
                        <DescripcionDeP
                          title={title}
                          text={description}
                          // onAddToCart={handleAddToCart}
                          image={img}
                          cantidad={cantidad}
                          price={price}
                          onClose={onClose}
                          onQuantityChange={handleQuantityChange}
                        ></DescripcionDeP>
                        <OrdenarProducto
                          onChangeQuantity={setCantidad}
                        ></OrdenarProducto>

                        <PromoProducto url={url}></PromoProducto>
                      </div>
                    </ModalBody>
                  </div>
                )}
              </ModalContent>
            </Modal>
          </CardFooter>
        </Card>
 */