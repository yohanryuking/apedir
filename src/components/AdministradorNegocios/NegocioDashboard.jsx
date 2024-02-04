import React, { useEffect, useState, useRef } from "react";
import { Button, Checkbox } from "@nextui-org/react";
import InputDeFaceBook from "./Inputs/InputDeFaceBook";
import InputDeInstagram from "./Inputs/InputDeInstagram";
import InputTelegram from "./Inputs/InputTelegram";
import InputWhatsapp from "./Inputs/InputWhatsapp";
import TextAreaDescription from "./Inputs/TextAreaDescripcion";
import ImageUploadButton from "./Inputs/ImagenUploadButton";
import InputGmail from "./Inputs/InputGmail";
import InputLocation from "./Inputs/InputLocation";
import InputPhoneNumber from "./Inputs/InputPhoneNumber";
import InputTelefonoLocalNumber from "./Inputs/InputTelefonoLocal";
import { removeImage, uploadImage } from "../../api/images";
import { getOneBussiness, upsertBussiness } from "../../api/bussiness";
import BussinessInputSchema from "../../schemas/bussinessInputSchema";
import { Toaster, toast } from "sonner";
import { grid_2_col, btnHeight } from "../styles/styles";
import { useUserStore, usePlan, useBussinessStore, useCategoryFilter } from "../../hooks/useStore";
import Loader from "../Loader/Loader";
import InputTitle from "./Inputs/InputTitle";
import { addNotification } from "../../api/notifications";
import QR from "../QR/QRCodeLogo";
import { useShallow } from "zustand/react/shallow";
import SelectCategory from "../header/Search/SelectCategory"

export default function NegocioDashboard() {
  const user = useUserStore((state) => state.user);
  const business = useBussinessStore(useShallow((state) => state.bussiness));
  const setBussiness = useBussinessStore((state) => state.setBussiness);
  const plan = usePlan((state) => state.plan);
  const [render, setRender] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const category = useCategoryFilter(state => state.category)

  const fetchBussiness = async () => {
    try {
      if (user === null) return;

      if (business === null) {
        const b = await getOneBussiness(user.id);
        setBussiness(b);
      }
    } catch (error) {
      console.error("Error fetching business:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (business === null) fetchBussiness();
    };
  }, [user]);

  useEffect(() => {
    if (business) {
      const updatedBusiness = { ...defaultBussinessValues };
      for (let key in updatedBusiness) {
        updatedBusiness[key] =
          business[key] !== null && business[key] !== undefined
            ? business[key]
            : "";
      }
      bussinessInput.current = updatedBusiness;
      setRender((render) => render + 1);
    }
  }, [business]);

  const [imageName, setImageName] = useState({
    front_pic: "",
    perfil_pic: "",
    gps_location: "",
  });
  const defaultBussinessValues = {
    id: "",
    owner: "",
    name: "",
    privileges: plan === "gratis" ? 1 : plan === "basico" ? 2 : 3,
    perfil_pic: "",
    front_pic: "",
    description: "",
    address: "",
    province: "Santiago de Cuba",
    category: "",
    gps_location: "",
    email: "",
    phone_number: "",
    whatsapp: "",
    telegram_link: "",
    local_phone: "",
    facebook: "",
    instagram: "",
    threads: "",
    linkedin: "",
    youtube: "",
    twitter: "",
    delivery: false,
  };
  const bussinessInput = useRef(
    business !== null && business !== undefined
      ? business
      : defaultBussinessValues
  );

  useEffect(() => {
    if (business === null) {
      bussinessInput.current = defaultBussinessValues;
    }
    setRender((render) => render + 1);
  }, [business]);

  const handleUpsertBussiness = async () => {
    try {
      await BussinessInputSchema.validate(bussinessInput.current, {
        strict: true,
      });
    } catch (e) {
      toast.error(e.message);
      return;
    }
    bussinessInput.current = {
      ...bussinessInput.current,
      category: category
    }

    setIsLoading(true);
    let front_pic = "";
    if (
      bussinessInput.current.front_pic !== null &&
      bussinessInput.current.front_pic !== "" &&
      bussinessInput.current.front_pic instanceof Blob
    ) {
      await removeImage(bussinessInput.current.id, "bussiness_front");

      front_pic = await uploadImage(
        bussinessInput.current.front_pic,
        imageName.front_pic,
        "bussiness_front"
      );
      front_pic = front_pic !== null ? front_pic.path : "";
    }

    let perfil_pic = "";
    if (
      bussinessInput.current.perfil_pic !== null &&
      bussinessInput.current.perfil_pic !== "" &&
      bussinessInput.current.perfil_pic instanceof Blob
    ) {
      await removeImage(
        bussinessInput.current.id,
        "perfil_pic",
        "bussiness_perfil"
      );

      perfil_pic = await uploadImage(
        bussinessInput.current.perfil_pic,
        imageName.perfil_pic,
        "bussiness_perfil"
      );
      perfil_pic = perfil_pic !== null ? perfil_pic.path : "";
    }

    let gps_location = "";
    if (
      bussinessInput.current.gps_location !== null &&
      bussinessInput.current.gps_location !== "" &&
      bussinessInput.current.gps_location instanceof Blob
    ) {
      await removeImage(bussinessInput.current.id, "bussiness_location");

      gps_location = await uploadImage(
        bussinessInput.current.gps_location,
        imageName.gps_location,
        "bussiness_location"
      );
      gps_location = gps_location !== null ? gps_location.path : "";
    }

    const updatedBussinessInput = {
      ...bussinessInput.current,
      owner: user.id,
      front_pic: front_pic,
      perfil_pic: perfil_pic,
      gps_location: gps_location,
    };

    await upsertBussiness(updatedBussinessInput);

    if (business) {
      let notification = {
        message: `El negocio ${bussinessInput.current.name} se ha actualizado.`,
        bussiness: business.id,
        addressee: null,
        bussiness_link: business.value_url,
      };
      addNotification(notification);
    }

    setIsLoading(false);

    toast.success("Actualización exitosa");
    fetchBussiness();
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <div>
      <Toaster
        richColors
        theme="dark"
        position="bottom-center"
        duration={3000}
      />
      <InputTitle value={bussinessInput}></InputTitle>
      <ImageUploadButton
        value={bussinessInput}
        imageName={imageName}
        setImageName={setImageName}
      />

      <div
        style={{
          marginBottom: "20px",
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <QR
          url={business?.value_url}
          imagen={business?.perfil_pic}
          negocio={"si"}
        ></QR>
      </div>

      <TextAreaDescription
        value={bussinessInput}
        maxChars={plan?.description}
      ></TextAreaDescription>
      <Checkbox
        isSelected={bussinessInput.current.delivery}
        onValueChange={() => {
          bussinessInput.current = {
            ...bussinessInput.current,
            delivery: !bussinessInput.current.delivery,
          };
          setRender((render) => render + 1);
        }}
      >
        Delivery (Márquelo si hace delivery)
      </Checkbox>
      <br /><br />
      <SelectCategory value={bussinessInput} />
      <br /><br />
      <InputLocation
        value={bussinessInput}
        setImageName={setImageName}
      ></InputLocation>
      <div style={grid_2_col} className="mt-2 mb-2">
        <InputGmail value={bussinessInput}></InputGmail>
        <InputPhoneNumber value={bussinessInput}></InputPhoneNumber>
        <InputWhatsapp value={bussinessInput}></InputWhatsapp>
        <InputTelegram value={bussinessInput}></InputTelegram>
        <InputTelefonoLocalNumber
          value={bussinessInput}
        ></InputTelefonoLocalNumber>
        <InputDeFaceBook value={bussinessInput}></InputDeFaceBook>
        <InputDeInstagram value={bussinessInput}></InputDeInstagram>
      </div>

      {isLoading && (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Loader text={"Espera mientras se realiza la actualización."} />
        </div>
      )}

      <Button
        color="secondary"
        className="text-white mt-2"
        style={btnHeight}
        onClick={() => {
          bussinessInput.current = {
            ...bussinessInput.current,
            owner: user.id,
          };
          handleUpsertBussiness();
        }}
      >
        Agregar Negocio
      </Button>
    </div>
  );
}
