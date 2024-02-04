import React, { lazy, Suspense } from "react";

import { container, section } from "../components/styles/styles";
import TituloDeSeccion from "../components/Seccion/TituloDeSeccion";

const AyudaInformacionContainer = lazy(() =>
  import("../components/AyudaInformacion/AyudaInformacionContainer")
);
export default function AyudaInformacion() {
  return (
    <div
      style={container}
      className="container flex z-40 w-full h-auto items-center justify-center data-[menu-open=true]:border-none  top-0 inset-x-0   backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
    >
      <section className="section px-6" style={section}>
        <Suspense>
          <TituloDeSeccion title = {"Preguntas más comunes"}></TituloDeSeccion>
          <AyudaInformacionContainer></AyudaInformacionContainer>
        </Suspense>
      </section>
    </div>
  );
}
