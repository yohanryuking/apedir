import React, { memo, useCallback, useState } from "react";
import Producto from "./Producto";
import TituloDeProductos from "./TituloDeProductos";
import "./productos.css";
import "./responsive.css";
import { grid_3_col } from "../../styles/styles";
import { useCartStore } from "../../../hooks/useStore";import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/grid';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, HashNavigation, Grid, Autoplay } from "swiper/modules";

export default function ListadoProductos(props) {
  const list = props.lista;
  const [carrito, setCarrito] = useState([]);
  const carrito2 = useCartStore((state) => state.cart);
  const setCarrito2 = useCartStore((state) => state.setCart);

  const changeTitle = (title) => {
    props.onChangeTitle(title);
  };

  const handleAddToCart = (carrito) => {
    carrito2.push(carrito);
  };
  // Usando useCallback para evitar la creación de nuevas funciones en cada renderizado
  const renderProducto = useCallback(
    (item, index) => (
      <SwiperSlide key={item.id}>
        <Producto
          key={item.id}
          index={index}
          img={item.image}
          price={item.price}
          currency={item.currency}
          title={item.name}
          nombre={props.nombre}
          description={item.description}
          localizacion={props.localizacion}
          onChangeCarrito={handleAddToCart}
          isRecomended={item.isRecommended}
          url={props.url}
        />
      </SwiperSlide>
    ),
    [props.nombre, props.localizacion]
   );

  return (
    <div>
      
      <TituloDeProductos
        title={props.title}
        onChangeTitle={changeTitle}
      ></TituloDeProductos>

      {/* <div className="mt-2 list-container-products" style={{...grid_3_col, placeItems: 'center'}}>
        {list.map(renderProducto)}
      </div> */}
      
      <Swiper
        spaceBetween={0}
        pagination = {false}
        navigation={false}
        modules={[Pagination, Navigation, HashNavigation, Autoplay]}
        className="slider-negocios"
        breakpoints={{
          160: {
            slidesPerView: 2.2,
            spaceBetween: 10,
          },
          420: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
            711: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            
            1020: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
      >
          {list.map(renderProducto)}
      </Swiper>
    </div>
  );
}


