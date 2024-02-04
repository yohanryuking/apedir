import { Spinner } from "@nextui-org/react";
import React from "react";
export default function LoaderCompletePage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Spinner color="secondary" label="Cargando..." labelColor="secondary" />
    </div>
  );
}
