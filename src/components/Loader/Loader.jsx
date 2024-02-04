import { Spinner } from "@nextui-org/react";
import React from "react";
export default function Loader({ text }) {
  return (
    <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
      <Spinner
        color="secondary"
        label={text !== undefined ? text : "Cargando..."}
        labelColor="secondary"
      />
    </div>
  );
}
