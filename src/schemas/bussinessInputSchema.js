import * as yup from "yup";

const BussinessInputSchema = yup.object().shape({
  name: yup.string().required("El nombre del negocio es requerido"),
  description: yup.string().required("La descripción del negocio es requerida"),
  email: yup.string().email("El email tiene un formato incorrecto."),
});

export default BussinessInputSchema;
