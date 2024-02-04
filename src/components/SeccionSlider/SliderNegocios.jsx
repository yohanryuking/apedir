import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInView } from "react-intersection-observer";
import { loadMoreBussiness } from "../../api/bussiness";
import ComponenteLugar from "../Seccion/ComponenteLugar";
import { useBussinessList, useProvinceStore } from "../../hooks/useStore";
import SkeletonProductosHome from "../Skeleton/SkeletonProductoHome";
import { Button } from "@nextui-org/react";

import { getStarsFromBusinesses } from "../../api/starsRate";
import "swiper/css";
import "./style.css";

const SliderNegocios = () => {
  const bussinesses = useBussinessList((state) => state.bussinesses);
  const setBussinesses = useBussinessList((state) => state.setBussinesses);
  const [showGrid, setShowGrid] = useState(false);

  const province = useProvinceStore((state) => state.province);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const filtredBussinesses = useMemo(() => {
    if (!bussinesses || bussinesses.length === 0) {
      return null;
    }
    if (province !== "todas") {
      return bussinesses.filter((value) => value.province === province);
    } else {
      return bussinesses;
    }
  }, [bussinesses, province]);

  const fetchMoreData = async () => {
    try {
      const response = await loadMoreBussiness(
        offset,
        setOffset,
        bussinesses,
        setBussinesses
      );
      setLoading(false);

      if (!response) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  const fetchStars = async () => {
    const ids = bussinesses.map((business) => business.id);
    const starsMap = await getStarsFromBusinesses(ids);
    const newB = bussinesses
      .sort((a, b) => a.privileges - b.privileges)
      .map((business) => ({ ...business, stars: starsMap[business.id] }));

    setBussinesses(newB);
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  useEffect(() => {
    if (bussinesses.length > 0) fetchStars();
  }, [bussinesses.length]);

  useEffect(() => {
    if (inView && hasMore) {
      fetchMoreData();
    }
  }, [inView, hasMore]);

  return loading ? (
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
          loop={false}
        >
      <SwiperSlide>
        <SkeletonProductosHome />
      </SwiperSlide>
      <SwiperSlide>
        <SkeletonProductosHome />
      </SwiperSlide>
      <SwiperSlide>
        <SkeletonProductosHome />
      </SwiperSlide>
      <SwiperSlide>
        <SkeletonProductosHome />
      </SwiperSlide>
      <SwiperSlide>
        <SkeletonProductosHome />
      </SwiperSlide>
    </Swiper>
  ) : (
    <div id="lugares">
      {!showGrid && (
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
          loop={false}
        >
          {filtredBussinesses  &&
            filtredBussinesses.map((item) => (
              <SwiperSlide key={item.id}>
                <ComponenteLugar
                  id={item.id}
                  imagen={item.perfil_pic}
                  localizacion={item.province}
                  gps_location={item.gps_location}
                  nombre={item.name}
                  numeroPersonas={item.numeroPersonas}
                  url={item.value_url}
                  stars={item.stars}
                  privileges={item.privileges}
                  category={item.category}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      )}

      {showGrid && (
        <div className="grid-principal-page">
          {filtredBussinesses !== null &&
            filtredBussinesses.map((item) => (
              <SwiperSlide key={item.id}>
                <ComponenteLugar
                  id={item.id}
                  imagen={item.perfil_pic}
                  localizacion={item.province}
                  gps_location={item.gps_location}
                  nombre={item.name}
                  numeroPersonas={item.numeroPersonas}
                  url={item.value_url}
                  stars={item.stars}
                  privileges={item.privileges}
                  category={item.category}
                />
              </SwiperSlide>
            ))}
        </div>
      )}

      {!showGrid && (
        <Button onClick={() => setShowGrid(!showGrid)}>Ver todos</Button>
      )}
    </div>
  );
};

export default SliderNegocios;
