import React, { useRef } from "react";
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import "./login.css";
import ApedirLogoNegro from "../../assets/ApedirLogoNegro.svg";
import { register } from "../../api/auth";
import { Toaster, toast } from "sonner";
import { btnHeight } from "../styles/styles";

export default function CreateAccount() {
  const variants = ["flat", "bordered", "underlined", "faded"];
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useRef();

  async function handleSubmit(event) {
    event.preventDefault();
    const { name, last_name, phone, email, password, confirmPassword } =
      form.current;

    const isFieldEmpty = (field) => field.value === "";
    if (
      [name, last_name, phone, email, password, confirmPassword].some(
        isFieldEmpty
      )
    ) {
      return toast.error("Los campos no pueden estar vacios");
    }

    const { message, isValid } = await register(
      name.value,
      last_name.value,
      phone.value,
      email.value,
      password.value,
      confirmPassword.value
    );
    toast[isValid ? "success" : "error"](message);
  }

  const btnStyle = {
    height: "56px",
  };
  return (
    <div className="contenedor-pt-login">
      <div className="login-container">
        <div className="img-login-container">
          <img src={ApedirLogoNegro} alt="" srcSet="" className="logo-img" />
        </div>

        <form ref={form} className="login-container" onSubmit={handleSubmit}>
          <Input type="name" name="name" variant={"bordered"} label="Nombre" />
          <Input
            type="name"
            name="last_name"
            variant={"bordered"}
            label="Apellidos"
          />
          <Input
            type="number"
            minLength={10}
            maxLength={10}
            name="phone"
            variant={"bordered"}
            label="Número de teléfono"
          />
          <Input type="email" name="email" variant={"bordered"} label="Email" />
          <Input
            name="password"
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            variant="bordered"
            placeholder="Confirm your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Button
            className="text-white"
            style={btnHeight}
            type="submit"
            color="secondary"
          >
            Create Accont
          </Button>
        </form>
        <Toaster
          position="bottom-center"
          duration={3000}
          expand={false}
          richColors
          theme="dark"
        />
      </div>
    </div>
  );
}
