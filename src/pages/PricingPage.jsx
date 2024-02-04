import React, { lazy, Suspense } from "react";
import { GratisIcon } from "../components/Icons/GratisIcon";
import { BasicIcon } from "../components/Icons/BasicIcon";
import { PremiumIcon } from "../components/Icons/PremiumIcon";
import TituloDeSeccion from "../components/Seccion/TituloDeSeccion";

const PricingCard = lazy(() => import("../components/PricingCard/PricingCard"));

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  marginTop: "20px",
  position: "relative",
  flexWrap: "wrap",
  justifyContent: "center",
  overflow: "auto",
  gap: "20px",
};

const section = {
  width: "100%",
  maxWidth: "1024px",
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const cardStyle = {
  flexBasis: "300px",
};

export default function PricingPage() {
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <section style={section}>
          <Suspense>
            <TituloDeSeccion title={"Planes"} />
          </Suspense>
        </section>
      </div>
      <div style={containerStyle}>
        <Suspense>
          <PricingCard
            img={<GratisIcon width={40} />}
            name={"Gratis"}
            price={0.0}
            bussiness_num={1}
            front_pic={1}
            perfil_pic={1}
            description={120}
            product_num={false}
            delivery={false}
            social_media={1}
            phone_number={1}
            email={1}
            gps_location={1}
            event_post={false}
            booking={false}
            priorize={false}
            style={cardStyle}
          />
        </Suspense>
        <Suspense>
          <PricingCard
            img={<BasicIcon width={40} />}
            name={"Básico"}
            price={500}
            description={120}
            bussiness_num={1}
            front_pic={1}
            perfil_pic={1}
            product_num={true}
            delivery={true}
            social_media={3}
            phone_number={1}
            email={1}
            gps_location={1}
            event_post={false}
            booking={false}
            priorize={false}
            style={cardStyle}
          />
        </Suspense>
        <Suspense>
          <PricingCard
            img={<PremiumIcon width={40} />}
            name={"Premium"}
            price={1000}
            bussiness_num={5}
            description={500}
            front_pic={5}
            perfil_pic={5}
            product_num={true}
            delivery={true}
            social_media={3}
            phone_number={3}
            email={1}
            gps_location={1}
            event_post={true}
            booking={true}
            priorize={true}
            style={cardStyle}
          />
        </Suspense>
      </div>
    </>
  );
}
