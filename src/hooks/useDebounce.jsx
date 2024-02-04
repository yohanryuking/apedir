import { useState, useEffect } from "react";

const useDebouncedValue = (value, delay) => {
  // Estado para almacenar el valor debounced
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Actualiza el valor debounced después de un cierto retraso
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpia el temporizador en cada cambio de valor o desmontaje del componente
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebouncedValue;
