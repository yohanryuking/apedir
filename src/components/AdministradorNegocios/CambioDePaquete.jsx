import React from "react";
import { grid_1_col_center } from "../styles/styles";
import './addCategory.css'
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function CambioDePaquete(props) {

    const fuente = {
        fontSize: "3rem",
        lineHeight: "1",
        fontWeight: "600",
    }


    return (
        <div style={{ ...grid_1_col_center, padding: "20px 20px 40px 20px" }}>
            <div style={{ display: "flex", gap: "10px" }} className="cambioDePaqueteDiv">
                <h2 style={fuente} className="cambioDePaqueteTitle">Paquete </h2>
                <span
                    className={props.paquete == "premium" ? "category-type-text-color-premium" : props.paquete == "basico" ? "category-type-text-color-basico" : "category-type-text-color-gratis"}
                    style={{ ...fuente, textTransform: "uppercase" }}
                >
                    {props.paquete}.
                </span>
            </div>

            <div style={{ gap: "10px", display: "flex" }}>
                <Link to={'/plans'} aria-label={"negocio"}>
                    <Button>
                        Cambiar de paquete
                    </Button>
                </Link>
            </div>
        </div>
    );
}