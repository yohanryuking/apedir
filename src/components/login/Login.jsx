import React, { useRef, useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import "./login.css";
import ApedirLogoNegro from "../../assets/ApedirLogoNegro.svg";
import { login, signInWithGoogle } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { btnHeight } from "../styles/styles";

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useRef();
  const navigate = useNavigate();

  async function loginSubmit(event) {
    event.preventDefault();
    const { email, password } = form.current;
    if ((email.value === "") | (password.value === ""))
      return toast.error("Los campos no pueden estar vacios");

    const { session, message, isValid } = await login(
      email.value,
      password.value,
    );
    if (isValid && session) return navigate("/");
    else toast.error(message);
  }

  return (
    <div className="contenedor-pt-login">
      <div className="login-container">
        <div className="img-login-container">
          <img src={ApedirLogoNegro} alt="" srcSet="" className="logo-img" />
        </div>

        <form className="login-container" ref={form} onSubmit={loginSubmit}>
          <Input type="email" name="email" variant={"bordered"} label="Email" />
          <Input
            label="Password"
            name="password"
            variant="bordered"
            placeholder="Escribe la contraseña"
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
            color="secondary"
            className="text-white"
            style={btnHeight}
            type="submit"
          >
            LOGIN
          </Button>

          <Link isBlock showAnchorIcon href="/register" color="secondary">
            Crear cuenta
          </Link>
          <Link
            isBlock
            showAnchorIcon
            onClick={signInWithGoogle}
            color="secondary"
          >
            Inicia sesión con Google
          </Link>
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
