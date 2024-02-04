import React, { useState, useEffect } from "react";

export default function AbiertoCerrado(props) {
  const [estaAbierto, setEstaAbierto] = useState(false);
  const green = {
    color: "green",
  };

  const red = {
    color: "red",
  };

  const horario = props.horario;

  useEffect(() => {
    const actualizarEstatus = () => {
      if (!horario) {
        setEstaAbierto(false);
        return;
      }
      const dia = new Date().getDay();
      const horaActual = new Date();
      const diaSemana = [
        "domingo",
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
        "sabado",
      ][dia];
      const horarioDia = horario.find((h) => h.dia.toLowerCase() === diaSemana);

      if (!horarioDia) {
        setEstaAbierto(false);
        return;
      }

      const [horaApertura, horaCierre] = [horarioDia.entrada, horarioDia.salida];

      const horaActualObj = new Date();
      const horaAperturaObj = new Date();
      const horaCierreObj = new Date();

      // Establecer las horas
      horaActualObj.setHours(horaActual.getHours(), horaActual.getMinutes(), 0, 0);
      horaAperturaObj.setHours(
        parseInt(horaApertura.split(":")[0]),
        parseInt(horaApertura.split(":")[1]),
        0,
        0
      );
      horaCierreObj.setHours(
        parseInt(horaCierre.split(":")[0]),
        parseInt(horaCierre.split(":")[1]),
        0,
        0
      );

      const estabaAbierto = estaAbierto; // Guardar el estado anterior

      if (horaActualObj >= horaAperturaObj && horaActualObj <= horaCierreObj) {
        setEstaAbierto(true);
      } else {
        setEstaAbierto(false);
      }

      // Verificar si cambió de abierto a cerrado
      if (estabaAbierto && !estaAbierto) {
        window.location.reload(); // Recargar la página
      }
    };

    actualizarEstatus();
    const intervalo = setInterval(actualizarEstatus, 500);

    return () => clearInterval(intervalo);
  }, [horario, estaAbierto]);

  return (
    <div>
      {estaAbierto ? (
        <h2 style={green}>Abierto</h2>
      ) : (
        <h2 style={red}>Cerrado</h2>
      )}
    </div>
  );
}
