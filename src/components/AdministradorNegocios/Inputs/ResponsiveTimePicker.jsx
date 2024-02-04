import React, { useState, useCallback, lazy, Suspense } from "react";
import dayjs from "dayjs";
import { TimePicker } from "antd";
import { Checkbox, Card, Button } from "@nextui-org/react";
import { useBussinessStore, useUserStore } from "../../../hooks/useStore";
import {
  getOneBussiness,
  getSchedule,
  updateBussinessSchedule,
} from "../../../api/bussiness";
import "./input.css";
import Loader from "../../Loader/Loader";

const format = "HH:mm";

const renderLoader = () => <p>Loading</p>;

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  placeItems: "center",
  minHeight: "100px",
  width: "100%",
  gap: "10px",
  padding: "10px",
};
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(1,1fr)",
  placeItems: "center",
  gap: "10px",
};

const diaTitle = {
  fontSize: "20px",
  fontWeight: "bold",
};

const CardComponent = React.memo(function CardComponent({
  dia,
  index,
  dias,
  setDias,
}) {
  const handleCheckboxChange = useCallback(
    (event) => {
      setDias(
        dias.map((d, i) =>
          i === index ? { ...d, trabaja: !d.trabaja } : d
        )
      );
    },
    [dias]
  );

  const handleTimePickerChange = useCallback(
    (time, key) => {
      setDias(
        dias.map((d, i) =>
          i === index ? { ...d, [key]: time ? time.format(format) : null } : d
        )
      );
    },
    [dias]
  );

  return (
    <Card style={grid} key={index} className="card-horarios-picker">
      <div>
        <h2 style={diaTitle}>{dia.dia}</h2>
      </div>
      <div>
        <Checkbox
          isSelected={dia.trabaja}
          onValueChange={handleCheckboxChange}
          color="primary"
        />
        <label htmlFor="">Trabaja</label>
      </div>

      <Suspense fallback={renderLoader()}>
        <TimePicker
          format={format}
          value={dia.entrada ? dayjs(dia.entrada, format) : null}
          onChange={(time) => handleTimePickerChange(time, "entrada")}
        />
        <TimePicker
          value={dia.salida ? dayjs(dia.salida, format) : null}
          format={format}
          onChange={(time) => handleTimePickerChange(time, "salida")}
        />
      </Suspense>
    </Card>
  );
});

export default function ResponsiveTimePickers() {
  const bussiness = useBussinessStore((state) => state.bussiness);
  const setBussiness = useBussinessStore((state) => state.setBussiness);
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);
  const [dias, setDias] = useState([
    { dia: "Lunes", entrada: "8:00", salida: "20:00", trabaja: true },
    { dia: "Martes", entrada: "8:00", salida: "20:00", trabaja: true },
    { dia: "Miercoles", entrada: "8:00", salida: "20:00", trabaja: true },
    { dia: "Jueves", entrada: "8:00", salida: "20:00", trabaja: true },
    { dia: "Viernes", entrada: "8:00", salida: "20:00", trabaja: true },
    { dia: "Sábado", entrada: "8:00", salida: "20:00", trabaja: true },
    { dia: "Domingo", entrada: "8:00", salida: "20:00", trabaja: true },
    // Repite para los demás días de la semana
  ]);

  React.useEffect(() => {
    const fetchScheduleFromBussiness = async () => {
      const schedules = await getSchedule(bussiness.id);
      console.log(schedules)
      setDias(schedules);

    };
    if (bussiness) fetchScheduleFromBussiness();
  }, [bussiness]);

  const handleClick = async () => {
    setLoading(true);
    await updateBussinessSchedule(bussiness.id, dias);
    setLoading(false);
  };

  return (
    <div style={gridContainer}>
      <Button variant="shadow" color="primary" onClick={handleClick}>
        Actualizar horarios
      </Button>
      {loading && (
        <Loader
          text={"Actualizando los horarios del negocio, por favor espere..."}
        />
      )}
      {dias.map((dia, index) => (
        <CardComponent
          key={index}
          dia={dia}
          index={index}
          dias={dias}
          setDias={setDias}
        />
      ))}
    </div>
  );
}

/*
import React, { useState, useCallback, lazy, Suspense } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Card } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

const renderLoader = () => <p>Loading</p>;

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  placeItems: "center",
  minHeight: "100px",
  width: "100%",
  gap: "10px",
  padding: "10px",
};
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(1,1fr)",
  placeItems: "center",
  gap: "10px",
};

const diaTitle = {
  fontSize: "20px",
  fontWeight: "bold",
};

const CardComponent = React.memo(function CardComponent({
  dia,
  index,
  dias,
  setDias,
}) {
  const handleCheckboxChange = useCallback(
    (event) => {
      setDias(
        dias.map((d, i) =>
          i === index ? { ...d, trabaja: event.target.checked } : d
        )
      );
    },
    [dias]
  );

  const handleTimePickerChange = useCallback(
    (newValue, key) => {
      setDias(
        dias.map((d, i) => (i === index ? { ...d, [key]: newValue } : d))
      );
    },
    [dias]
  );

  return (
    <Card style={grid} key={index} className="card-horarios-picker">
      <div>
        <h2 style={diaTitle}>{dia.dia}</h2>
      </div>
      <div>
        <Checkbox
          checked={dia.trabaja}
          color="secondary"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="">Trabaja</label>
      </div>

      <Suspense fallback={renderLoader()}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem label="Hora de Entrada">
            <MobileTimePicker
              defaultValue={dayjs("2022-04-17T15:30")}
              onChange={(newValue) =>
                handleTimePickerChange(newValue, "entrada")
              }
            />
          </DemoItem>

          <DemoItem label="Hora de Salida">
            <MobileTimePicker
              defaultValue={dayjs("2022-04-17T15:30")}
              onChange={(newValue) =>
                handleTimePickerChange(newValue, "salida")
              }
            />
          </DemoItem>
        </LocalizationProvider>
      </Suspense>
    </Card>
  );
});

export default function ResponsiveTimePickers() {
  const [dias, setDias] = useState([
    { dia: "Lunes", entrada: null, salida: null, trabaja: true },
    { dia: "Martes", entrada: null, salida: null, trabaja: true },
    { dia: "Miercoles", entrada: null, salida: null, trabaja: true },
    { dia: "Jueves", entrada: null, salida: null, trabaja: true },
    { dia: "Viernes", entrada: null, salida: null, trabaja: true },
    { dia: "Sábado", entrada: null, salida: null, trabaja: true },
    { dia: "Domingo", entrada: null, salida: null, trabaja: true },
    // Repite para los demás días de la semana
  ]);

  const handleClick = () => {
    dias.forEach((d) => {
      if (d.trabaja) {
        alert(`${d.dia}: Entrada: ${d.entrada}, Salida: ${d.salida}`);
      } else {
        alert(`${d.dia}: No se trabaja`);
      }
    });
  };

  return (
    <div style={gridContainer}>
      {dias.map((dia, index) => (
        <CardComponent dia={dia} index={index} dias={dias} setDias={setDias} />
      ))}
      <button onClick={handleClick}>Mostrar horarios</button>
    </div>
  );
}
*/
