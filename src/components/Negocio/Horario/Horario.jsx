import React from "react";
import { Divider } from "@nextui-org/react";

export default function Horario(props) {
  const bussiness = props.bussiness;
  return (
    <>
      {bussiness !== null && bussiness.schedules !== null && (
        <div key={bussiness.id}>
          <div style={{ display: "grid", placeItems: "center" }}>
            <strong style={{ fontSize: "20px", margin: "10px" }}>
              Horarios
            </strong>
            <Divider></Divider>
          </div>
          <div
            style={{
              display: "grid",
              width: "100%",
              gridTemplateColumns: "1fr 1fr 1fr",
              margin: "10px",
              placeItems: "center"
            }}
          >
            <strong>Dia</strong>
            <strong>Abierto</strong>
            <strong>Cerrado</strong>
           
          </div>
          <Divider></Divider>
        </div>
      )}
      {bussiness !== null &&
        bussiness.schedules !== null &&
        bussiness.schedules.map((schedule) => {
          let dia = <h6>{schedule.dia}</h6>;
          if (!schedule.trabaja) {
            return (
              <div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-around",
                    margin: "10px",
                  }}
                >
                  {dia}
                  <span>No se trabaja</span>
                </div>
                <Divider></Divider>
              </div>
            );
          }

          let entrada = schedule.entrada ? (
            <span>{schedule.entrada}</span>
          ) : (
            <span>-</span>
          );
          let salida = schedule.salida ? (
            <span>{schedule.salida}</span>
          ) : (
            <span>-</span>
          );

          return (
            <div>
              <div
                style={{
                  display: "grid",
                  width: "100%",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  margin: "10px",
                  placeItems: "center"
                }}
              >
                {dia} {entrada} {salida}
              </div>
              <Divider></Divider>
            </div>
          );
        })}
    </>
  );
}
