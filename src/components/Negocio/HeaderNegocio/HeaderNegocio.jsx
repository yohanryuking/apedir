import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand } from "@nextui-org/react";
import { NegocioLogo } from "./NegocioLogo.jsx";
import { useState, useEffect } from "react";
//import { MarginLeft30 } from "../../styles/styles.jsx";

import Izquierda from "../../Icons/Angulo/izquierda.jsx";

// const Izquierda = lazy(() => import("../../Icons/Angulo/izquierda.jsx"));

export default function HeaderNegocio(props) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  useEffect(() => {
    const checkScrollPosition = () => {
      const firstProductListPosition = document
        .querySelector(".first-product-list")
        .getBoundingClientRect().top;
      if (window.pageYOffset >= firstProductListPosition) {
        setIsNavbarVisible(true);
      } else {
        setIsNavbarVisible(false);
      }
    };

    window.addEventListener("scroll", checkScrollPosition);

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const zIndex = {
    zIndex: "4000",
  };

  return (
    <>
      <Navbar style={zIndex}>
        <NavbarBrand>
          <Link to={props.anterior}>
            <Izquierda h={"20px"} w={"20px"}></Izquierda>
          </Link>
          <NegocioLogo logo={props.logo} />
          <p style={{marginLeft: "20px"}}>{props.nombre}</p>
        </NavbarBrand>
      </Navbar>
    </>
  );
}
