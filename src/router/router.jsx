import React from "react";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Page from "../pages/Page";
import Home from "../pages/Home";


import {
  RequireUserRole,
  RequireAdminRole,
  RequireMerchantRole,
} from "../components/ProtectRole";
import { CircularProgress } from "@nextui-org/react";
import LoaderCompletePage from "../components/Loader/LoaderCompletePage";

const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

const LazyLogin = lazy(() => import("../components/login/Login"));

const LazyCreateAccount = lazy(() =>
  import("../components/login/CreateAccount")
);
const LazyNegocioWrapper = lazy(() => import("../components/Negocio/Negocio"));

const LazyAdministradorNegocio = lazy(() =>
  import("../components/AdministradorNegocios/CrearNegocio")
);

const LazyNegocioDashboard = lazy(() =>
  import("../components/AdministradorNegocios/NegocioDashboard")
);

const ResponsiveTimePickers = lazy(() =>
  import("../components/AdministradorNegocios/Inputs/ResponsiveTimePicker")
);

const LazyEventManagement = lazy(() =>
  import("../components/AdministradorNegocios/EventManagement")
);

const LazyNovedadesManagement = lazy(() =>
  import("../components/AdministradorNegocios/NovedadesManagement")
);

const LazyProductsManagement = lazy(() =>
  import("../components/AdministradorNegocios/ManageProducts")
);

const LazyAdministradorNegocioGratuito = lazy(() =>
  import("../pages/AdministradorNegocioGratuito")
);
const LazyVerEventoWrapper = lazy(() =>
  import("../components/VisualizadorContenido/VerEvento")
);
const LazyNegocioTableWrapper = lazy(() =>
  import("../pages/Admin/AdminBussiness")
);
const LazyAyudaInformacionWrapper = lazy(() =>
  import("../pages/AyudaInformacion")
);

const LazyComprasWrapper = lazy(() => import("../pages/Compras"));

const AdminTabs = lazy(() => import("../components/Admin/AdminTabs"));

const AdminPlans = lazy(() => import("../pages/Admin/AdminPlans"));

const PricingPage = lazy(() => import("../pages/PricingPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Page>
        <Home />
      </Page>
    ),
  },
  {
    path: "/plans",
    element: (
      <Page>
        <Suspense fallback={<LoaderCompletePage />}>
          <PricingPage />,
        </Suspense>
      </Page>
    ),
  },

  {
    path: "/login",
    element: (
      <Suspense fallback={<LoaderCompletePage />}>
        <LazyLogin />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<LoaderCompletePage />}>
        <LazyCreateAccount />
      </Suspense>
    ),
  },
  {
    path: "/user",
    element: (
      <RequireUserRole>
        <h1>Welcome to protected role user</h1>
      </RequireUserRole>
    ),
  },
  {
    path: "/admin",
    element: (
      <Page>
        <RequireAdminRole>
          <Outlet />
        </RequireAdminRole>
      </Page>
    ),
    children: [
      {
        path: "/admin/",
        element: (
          <Suspense fallback={<LoaderCompletePage />}>
            <AdminTabs />
          </Suspense>
        ),
      },
      {
        path: "/admin/plans",

        element: (
          <Suspense fallback={<LoaderCompletePage />}>
            <AdminPlans />
          </Suspense>
        ),
      },
      {
        path: "/admin/businesses",

        element: (
          <Suspense fallback={<LoaderCompletePage />}>
            <LazyNegocioTableWrapper />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/merchant",
    element: (
      <RequireMerchantRole>
        <h1>Welcome to protected role merchant</h1>
      </RequireMerchantRole>
    ),
  },
  {
    path: "/ayudaInformacion",
    element: (
      <Page>
        <Suspense fallback={<LoaderCompletePage />}>
          <LazyAyudaInformacionWrapper />
        </Suspense>
      </Page>
    ),
  },
  {
    path: "/lugar",
    element: (
      <Page>
        <Outlet />
      </Page>
    ),
    children: [
      {
        path: ":url",
        element: (
          <Suspense fallback={<LoaderCompletePage />}>
            <LazyNegocioWrapper />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/evento/:nombre",
    element: (
      <Suspense fallback={<LoaderCompletePage />}>
        <LazyVerEventoWrapper />
      </Suspense>
    ),
  },
  {
    path: "/administrador-negocio",
    element: (
      <Page>
        <Suspense fallback={<LoaderCompletePage />} >
          <LazyAdministradorNegocio>
            <Outlet />
          </LazyAdministradorNegocio>
          {/* <Navigate to="/administrador-negocio/perfil" /> */}
        </Suspense>
      </Page>
    ),
    children: [
      {
        path: "perfil",
        element: <LazyNegocioDashboard />,
      },
      {
        path: "horarios",
        element: <ResponsiveTimePickers />,
      },
      {
        path: "eventos",
        element: <LazyEventManagement />,
      },
      {
        path: "novedades",
        element: <LazyNovedadesManagement />,
      },
      {
        path: "productos",
        element: <LazyProductsManagement />,
      },
    ],
  },

  {
    path: "/carrito",
    element: (
      <Suspense fallback={<LoaderCompletePage color="secondary" />}>
        <LazyComprasWrapper />
      </Suspense>
    ),
  },

  {
    path: "/administrador-negocio-gratuito",
    element: (
      <Suspense fallback={<CircularProgress />}>
        <LazyAdministradorNegocioGratuito />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
