import React, { useState } from "react";
import { Card, Checkbox } from "@nextui-org/react";
import TimePicker from "react-time-picker";

export default function Horarios() {
  const [horarios, setHorarios] = useState({
    lunes: { apertura: new Date(), cierre: new Date(), trabaja: false },
    martes: { apertura: new Date(), cierre: new Date(), trabaja: false },
    miercoles: { apertura: new Date(), cierre: new Date(), trabaja: false },
    jueves: { apertura: new Date(), cierre: new Date(), trabaja: false },
    viernes: { apertura: new Date(), cierre: new Date(), trabaja: false },
    sabado: { apertura: new Date(), cierre: new Date(), trabaja: false },
    domingo: { apertura: new Date(), cierre: new Date(), trabaja: false },
  });

  const handleTimeChange = (time, dia, tipoHora) => {
    setHorarios({
      ...horarios,
      [dia]: { ...horarios[dia], [tipoHora]: time },
    });
  };

  const handleCheckboxChange = (event, dia) => {
    setHorarios({
      ...horarios,
      [dia]: { ...horarios[dia], trabaja: event.target.checked },
    });
  };

  const gridContainer = {
    display: 'grid',
    gridTemplateColumns : "repeat(1,1fr)",
    placeItems: 'center',
    gap: "10px"
  }

  const grid = {
    display: 'grid',
    gridTemplateColumns : "repeat(4,1fr)",
    placeItems: 'center',
    minHeight: '100px',
    width: "100%",
    gap: "10px",
    padding: "10px"
  }

  const timePickerStyle = {
    border: "1px solid black",
    borderRadius: "10px",
    backgroundColor: "transparent",
    color: "black",
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    
  };


  return (
    <div style={gridContainer}>
      {["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"].map(
        (dia) => (
          <Card key={dia} style={grid}>
            <h2>{dia}</h2>
            
            {horarios[dia].trabaja && (
              <>
              <div  style={timePickerStyle}>
                <TimePicker
                    wrapperClassName='date_picker full-width' 
                    onChange={(time) => handleTimeChange(time, dia, 'apertura')}
                    value={horarios[dia].apertura}
                    />
              </div>
                <div  style={timePickerStyle} >
                <TimePicker
                  style={timePickerStyle}
                  onChange={(time) => handleTimeChange(time, dia, 'cierre')}
                  value={horarios[dia].cierre}
                />
                </div>
                
              </>
            )}
            <Checkbox
              checked={horarios[dia].trabaja}
              onChange={(event) => handleCheckboxChange(event, dia)}
            >
              Trabaja
            </Checkbox>
          </Card>
        )
      )}
    </div>
  );
}
