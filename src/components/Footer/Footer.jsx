import "./footer.css";
import LogoReduce from "../../assets/logoReduce/LogoReduce";
import { Link } from "@nextui-org/react";
import React, { useState } from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
// HAY QUE INSTALAR EL PAQUETE DE LOS REGULAR ICONS
import {
  faFacebook,
  faInstagram,
  faTelegram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { grid_3_col, grid_2_col, flex_left } from "../styles/styles";

export default function Footer() {
  const [message, setMessage] = useState("");

  return (
    <div className="footer-principal">
      <div className="footer-logo">
        <LogoReduce w={100} color="white"></LogoReduce>
      </div>

      <div className="container-nav-footer">
        <div className="footer-div-title">
            <h2 className="footer-title">Navegación</h2>
            <hr className="footer-hr" />
        </div>
        <nav className="nav-footer">
          <Link href="/" underline="hover" style={{ color: "white" }}>
            Home
          </Link>
          <Link href="#eventos" underline="hover" style={{ color: "white" }}>
            Eventos
          </Link>
          <Link href="#novedades" underline="hover" style={{ color: "white" }}>
            Novedades
          </Link>
          <Link
            href="#productos-recomendados"
            underline="hover"
            style={{ color: "white" }}
          >
            Productos Recomendados
          </Link>
          <Link href="#lugares" underline="hover" style={{ color: "white" }}>
            Lugares
          </Link>
          <Link href="/plans" underline="hover" style={{ color: "white" }}>
            Planes y Precios
          </Link>
          <Link
            href="/ayudaInformacion"
            underline="hover"
            style={{ color: "white" }}
          >
            Ayuda e Información
          </Link>
        </nav>
      </div>

      <div className="footer-social-media">
        <div className="footer-div-title">
          <h2 className="footer-title">Redes sociales</h2>
          <hr className="footer-hr" />
        </div>

        <div style={flex_left}>
          <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
            <a
              href={`https://www.facebook.com/Apedir`}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
          </div>
          <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
            <a
              href={`https://www.instagram.com/apedir_cuba`}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>

          <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
            <a href={`https://t.me/djm0x`} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faTelegram} size="2x" />
            </a>
          </div>
        </div>

        <div className="footer-div-title">
          <h2 className="footer-title">Contáctenos</h2>
          <hr className="footer-hr" />
        </div>

        <div style={flex_left}>
          <div>
            <a href={`mailto:apedir@gmail`} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
          </div>

          <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
            <a
              href={`https://wa.me/555971705`}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            </a>
          </div>
        </div>
      </div>

      <div className="copyright">
        © 2023 Apedir. Todos los derechos reservados.
      </div>
    </div>
  );
}
