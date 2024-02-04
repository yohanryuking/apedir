import { CircularProgress } from "@nextui-org/react";
export default function ProgressBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress size="lg" color="secondary" label="Cargando..." />
    </div>
  );
}
