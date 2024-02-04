import React from "react";
import { Input, Button, Image } from "@nextui-org/react";
import { resizeImage } from "../../../api/helpers/image";
import SelectorProvincia from "./SelectorDeProvincia";
import { useState } from "react";

export default function InputLocation({ setImageName, value, setValue }) {
  const [locationImage, setLocationImage] = useState(null);
  const [render, setRender] = useState(0);

  const handleImageUpload = async (event) => {
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    setLocationImage(imageUrl);
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const extension = file.name.split(".").pop();
      const lowerCaseExtension = extension.toLowerCase();
      const newFileName = file.name.replace(extension, lowerCaseExtension);

      const resizedImage = await resizeImage(file, 200, 200);

      setImageName((prevState) => {
        const updatedState = {
          ...prevState,
          gps_location: newFileName,
        };

        return updatedState;
      });
      value.current = {
        ...value.current,
        gps_location: resizedImage,
      };
    }
    setRender((render) => render + 1);
  };

  const white = {
    color: "white",
  };
  const contenedor = {
    background: "#ECECEE",
    borderRadius: "10px",
    width: "100%",
    height: "200px",
    maxHeight: "200px",
    display: "grid",
    placeItems: "center",
  };

  const imagenLogo = {
    maxHeight: "200px",
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "20px",
  };
  const grid2 = {
    display: "grid",
    gridTemplateColumns: "repeat(1,1fr)",
    gap: "5px",
  };

  return (
    <div style={grid}>
      <Input
        type="text"
        variant="bordered"
        label="Localización"
        placeholder="Inserte la localización de su negocio"
        labelPlacement="outside"
        value={value.current.address}
        onChange={(event) => {
          value.current = {
            ...value.current,
            address: event.target.value,
          };
          setRender((render) => render + 1);
        }}
      />
      <div />
      <div style={grid2}>
        <label>Provincia</label>
        <SelectorProvincia value={value}></SelectorProvincia>
      </div>

      <div />
      <div>
        <div>
          <div style={contenedor}>
            <Image
              src={locationImage || value.current.gps_location}
              style={imagenLogo}
              alt="localizacion del negocio"
            />
          </div>
          <input
            type="file"
            id="locationImageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <Button
            style={white}
            color={"secondary"}
            onClick={() =>
              document.getElementById("locationImageUpload").click()
            }
            className="mt-2"
          >
            Subir Localización del Negocio
          </Button>
        </div>
      </div>
    </div>
  );
}
