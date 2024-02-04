import React, { useRef, useState, useEffect } from "react";
import { QRCode } from "antd";
import logo from "../../assets/LogoBlancoApp.png";
import { Button } from "@nextui-org/react";

const QR = (props) => {
  const [iconLoaded, setIconLoaded] = useState(false);
  const [render, setRender] = useState(0);
  const iconRef = useRef(new Image());
 
  useEffect(() => {
    const icon = iconRef.current;
    icon.crossOrigin = "anonymous";
    icon.src = props?.imagen ? props.imagen : logo;

    const handleLoad = () => {
      console.log("Imagen cargada correctamente.");
      setIconLoaded(true);
    };

    const handleError = (error) => {
      console.error("Error al cargar la imagen:", error);
    };

    icon.addEventListener("load", handleLoad);
    icon.addEventListener("error", handleError);

    return () => {
      icon.removeEventListener("load", handleLoad);
      icon.removeEventListener("error", handleError);
    };
  }, [props?.imagen]);

  const value =
    props.negocio === "si"
      ? `https://apedir.pages.dev/lugar/${props.url}`
      : "https://apedir.pages.dev/";

  const downloadQRCode = async () => {
    const canvas = document.getElementById("myqrcode")?.querySelector("canvas");

    if (canvas) {
      const newCanvas = document.createElement("canvas");
      newCanvas.width = canvas.width;
      newCanvas.height = canvas.height;
      const ctx = newCanvas.getContext("2d");

      const icon = iconRef.current;

      if (icon.complete) {
        console.log("Imagen completa antes de dibujar en el canvas.");
      } else {
        console.log("Imagen aún no está completa antes de dibujar en el canvas.");
      }

      // Dibujar la imagen en el nuevo canvas
      ctx.drawImage(icon, 0, 0, canvas.width, canvas.height);
      // Dibujar el código QR en el nuevo canvas
      ctx.drawImage(canvas, 0, 0);

      // Exportar el nuevo canvas como una imagen
      const url = newCanvas.toDataURL();
      const a = document.createElement("a");
      a.download = "QRCode.png";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div id="myqrcode">
      {props.url ? (
        <>
          <QRCode
            value={value}
            bgColor="#fff"
            errorLevel="H"
            style={{
              marginBottom: 16,
            }}
            icon={iconLoaded && iconRef.current}
          />

          <Button type="primary" onClick={downloadQRCode}>
            Download QR Code
          </Button>
        </>
      ) : (
        <>
          <QRCode value="https://apedir.pages.dev/" status="loading" />
        </>
      )}
    </div>
  );
};

export default QR;
