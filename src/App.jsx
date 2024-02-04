import React from "react";
import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { supabase } from "./api/client";

function App() {

  return (
    <React.StrictMode>
      <NextUIProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </NextUIProvider>
    </React.StrictMode>
  );
}

export default App;
