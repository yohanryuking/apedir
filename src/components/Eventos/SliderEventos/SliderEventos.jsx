import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { eventsStore } from "../../../hooks/useStore";
import "./styles.css";
import { Empty } from "antd";
import Eventos from "../Eventos";
//import { EffectCoverflow } from "swiper/modules";

export default function SliderEventos() {
  const events = eventsStore((state) => state.events);

  return (
    <>
      {events && events.length > 0 ? (
        <>
          <Swiper
            spaceBetween={30}
           
            className="slider-negocios"
            breakpoints={{
              280: {
                slidesPerView: 1.2,
                spaceBetween: 10,
              },
              360: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              460: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              711: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1020: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            loop={true}
            
          >

            {events.map((evento, index) => (
              <SwiperSlide key={index} className="swiper-slide-events">
                <Eventos name={evento.name} imagen={evento.image} created_ad = {evento.created_ad} bussiness = {evento.bussiness}></Eventos>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <>
          <Empty />
        </>
      )}
    </>
  );
}
