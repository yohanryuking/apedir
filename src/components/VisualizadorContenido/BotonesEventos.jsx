import React from "react";
import { Button, Link } from "@nextui-org/react";

export default function BotonesEventos(props) {
  const margin = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  };

  const full = {
    width: "100%",
    color: "black"
  }

  return (
    <div className="flex gap-4 items-center" style={margin}>
      <Link   style= {full} href={`https://wa.me/${props.whatsapp}`} target="_blank">
        <Button color="primary"  style={full}>
          <p>Contactenos</p>
        </Button>
      </Link>
    </div>
  );
}
