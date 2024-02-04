import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import "swiper/css";
import { container, section } from "../styles/styles";
import TituloDeSeccion from "../Seccion/TituloDeSeccion";
import Novedades from "./Novedades";
import { merchantNovedades } from "../../hooks/useStore";

import SkeletonNovedades from "../Skeleton/SkeletonNovedades";

export default function SliderNovedades() {
  const novedades = merchantNovedades((state) => state.novedades);

  return (
    <div
      style={container}
      className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
    >
      <section className="section px-6" style={section} id="novedades">
        <TituloDeSeccion title={"Novedades"}></TituloDeSeccion>
        <Swiper
          spaceBetween={10}
          style={{ width: "100%", padding: "0px" }}
          
          
          className="mySwiper"
          breakpoints={{
            711: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
          }}
        >
          {novedades && novedades.length > 0 ? (
            novedades.map((novedad) => {
              return (
                <SwiperSlide key={novedad.id}>
                  <Novedades novedad={novedad} />
                </SwiperSlide>
              );
            })
          ) : (
            
            [...Array(3)].map((_, i) => (
              <SwiperSlide key={i}>
                <SkeletonNovedades />
              </SwiperSlide>
            ))
            
          )}
        </Swiper>
      </section>
    </div>
  );
}
