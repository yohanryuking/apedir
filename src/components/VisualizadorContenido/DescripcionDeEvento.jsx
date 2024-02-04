import React, { useState } from "react";

export default function DescripcionEvento(props) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const descripcion = props.descripcion !== undefined ? props.descripcion : "";
  const handleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const words = descripcion.split(" ");
  const firstThirtyWords = words.slice(0, 30).join(" ");
  const description = showFullDescription
    ? descripcion
    : firstThirtyWords;
  const style = {
    fontWeight: "bold",
  };
  const white = {
    color: "white",
  };

  const glass = {
    width: "90%",
    height: "20vh",
    marginBottom: "3%",
    zIndex: "1000",
    overflowY: "scroll",
  };
  return (
    <div style={glass}>
      <article className="mt-2" style={white}>
        Descripción: {description !== undefined ? description : ""}
        {words.length > 30 && (
          <button
            onClick={handleShowFullDescription}
            style={style}
            className="ml-2"
          >
            {showFullDescription ? "Leer menos" : "Leer más"}
          </button>
        )}
      </article>
    </div>
  );
}
