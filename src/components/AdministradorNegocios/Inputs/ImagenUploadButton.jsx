import React, { useEffect } from "react";
import { Button , Image} from "@nextui-org/react";
import { resizeImage } from "../../../api/helpers/image";
import "./input.css";
import { useState } from "react";
function ImageUploadButton({ imageName, setImageName, value }) {
  const [perfil, setPerfil] = useState(null);
  const [front, setFront] = useState(null);
  const [render, setRender] = useState(0);
  const handleImageChange = async (event, imageType) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const extension = file.name.split(".").pop();
      const lowerCaseExtension = extension.toLowerCase();
      const newFileName = file.name.replace(extension, lowerCaseExtension);

      if (imageType === "logo") {
        const resizedImage = await resizeImage(file, 272, 272);

        setImageName((prevState) => {
          const updatedState = {
            ...prevState,
            perfil_pic: newFileName,
          };
          return updatedState;
        });
        value.current = {
          ...value.current,
          perfil_pic: resizedImage,
        };
      } else if (imageType === "cover") {
        const resizedImage = await resizeImage(file, 800, 800);

        setImageName((prevState) => {
          const updatedState = {
            ...prevState,
            front_pic: newFileName,
          };

          return updatedState;
        });

        value.current = {
          ...value.current,
          front_pic: resizedImage,
        };
      }
    }
  };

  const handleLogoImageUpload = async (event) => {
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    setPerfil(imageUrl);
    await handleImageChange(event, "logo");
    setRender((render) => render + 1);
  };
  const handleCoverImageUpload = async (event) => {
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    setFront(imageUrl);
    await handleImageChange(event, "cover");
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
  const contenedorRow = {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "10px",
    padding: "20px 0",
  };

  return (
    <div style={contenedorRow} className="contenedor-logos-portada">
      <div>
        <div style={contenedor}>
          <Image
            radius="lg"
            style={imagenLogo}
            alt="Card background NextUI hero Image with delay"
            className="object-cover rounded-xl"
            src={perfil || value.current.perfil_pic}
          />
        </div>
        <div>
          <input
            type="file"
            id="logoImageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleLogoImageUpload}
          />
          <Button
            style={white}
            color={"secondary"}
            onClick={() => document.getElementById("logoImageUpload").click()}
            className="mt-2"
          >
            Subir Logo del Negocio
          </Button>
        </div>
      </div>
      <div>
        <div>
          <div style={contenedor}>
            <Image
              radius="lg"
              style={imagenLogo}
              alt="Card background NextUI hero Image with delay"
              className="object-cover rounded-xl"
              src={front || value.current.front_pic}
            />
          </div>
          <input
            type="file"
            id="coverImageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleCoverImageUpload}
          />
          <Button
            style={white}
            color={"secondary"}
            onClick={() => document.getElementById("coverImageUpload").click()}
            className="mt-2"
          >
            Subir Portada del Negocio
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadButton;
