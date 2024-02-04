import React, { lazy, useEffect, useState } from "react";
import "./header.css";
import { Link as LinkReact } from "react-router-dom";
import { useHref } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { NegocioLogo } from "../Negocio/HeaderNegocio/NegocioLogo";
import AbiertoCerrado from "../Negocio/HeaderNegocio/AbiertoCerrado";
import Izquierda from "../Icons/Angulo/izquierda";
import { MarginLeft30 } from "../styles/styles";
import { showFilter, useBussinessStore, useCartStore } from "../../hooks/useStore";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../api/client";
import { getUser } from "../../api/profile.jsx";
import { useUserStore } from "../../hooks/useStore";
import { fetchBussinessPerURL, getOneBussiness } from "../../api/bussiness";
import Carrito from "./CarritoIcon.jsx";
import Notification from "./Notification.jsx";
import { useLocation } from "react-router-dom";

const Search = lazy(() => import('./Search/Search'))

export default function Header() {
  const history = useHref();
  const [isBussiness, setIsBussiness] = useState(false);
  const [isHome, setIsHome] = useState(false)
  const [session, setSession] = useState(null);
  const [selectedBussiness, setSelectedBussiness] = useState(null);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setCarrito = useCartStore((state) => state.setCart);
  const setShowFilter = showFilter(state => state.setShowFilter)

  const location = useLocation();
  const path = location.pathname.split("/");

  useEffect(() => {
    const fetchData = async () => {
      if (path[2]) {
        const bussinessData = await fetchBussinessPerURL(path[2]);
        if (bussinessData?.value_url !== selectedBussiness?.value_url) {
          setCarrito([]);
        }
        setSelectedBussiness(bussinessData);
      }
    };

    if (path.includes("lugar")) {
      fetchData();
      setIsBussiness(true);
      setIsHome(false)
      setShowFilter(false)

    } else {
      setSelectedBussiness(null);
      setIsBussiness(false);
      setIsHome(false)
    }
  }, [location]);


  useEffect(() => {
    const pathString = history.split('/').toString()
    if (pathString.length === 1) {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [history, isHome]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setSession(null);
      return;
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  
  useEffect(() => {
    async function handleAuthStateChange(_event, session) {
      if (session) {
        setSession(session);
        const u = await getUser(session.user.email);
        setUser(u);
      }
    }

    const authListener = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  const setBussiness = useBussinessStore((state) => state.setBussiness);

  const fetchBussiness = async () => {
    if (user === null) return;

    const b = await getOneBussiness(user.id);
    setBussiness(b);
  };

  useEffect(() => {
    fetchBussiness();
  }, [user]);

 

  return (
    <Navbar isBordered disableAnimation>
      <NavbarBrand>
        {isBussiness && selectedBussiness !== null ? (
          <>
            <LinkReact to="/">
              <Izquierda h={"20px"} w={"20px"} />
            </LinkReact>

            <NegocioLogo logo={selectedBussiness.perfil_pic} />

            <div className="ml-2" style={MarginLeft30}>
              <p
                className="font-bold text-inherit titulo-negocio-header"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {selectedBussiness.name}
              </p>
              <AbiertoCerrado horario={selectedBussiness?.schedules} />
            </div>
          </>
        ) : (
          <AcmeLogo />

        )}
      </NavbarBrand>

      {isHome && <Search />}

      {session !== null && user !== null ? (
        <NavbarContent as="div" justify="end" style={{ gap: "30px" }}>
          {isBussiness &&
            selectedBussiness &&
            selectedBussiness.delivery == true && <Carrito number = {selectedBussiness.phone_number}></Carrito>}
          <Notification />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                style={{ color: "white" }}
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user?.name}
                size="sm"
                showFallback={true}
                src={session.user?.user_metadata?.avatar_url}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="menu principal" variant="flat">
              <DropdownItem
                aria-label="info"
                key="profile"
                className="h-14 gap-4"
              >
                <p className="font-semibold">{user?.email}</p>
                <p className="font-semibold">Plan: {user?.plan}</p>
              </DropdownItem>

              {selectedBussiness === undefined && selectedBussiness !== null ? (
                <DropdownItem
                  aria-label="settings"
                  key="settings"
                  onClick={() => navigate("/administrador-negocio/perfil")}
                >
                  Crear negocio
                </DropdownItem>
              ) : (
                <DropdownItem
                  aria-label="settings"
                  key="settings"
                  onClick={() => navigate("/administrador-negocio/perfil")}
                >
                  Ver negocio
                </DropdownItem>
              )}
              {user?.role === "admin" && (
                <DropdownItem
                  aria-label="panel"
                  key="panel"
                  onClick={() => navigate("/admin/")}
                >
                  Panel de Administración
                </DropdownItem>
              )}
              <DropdownItem
                aria-label="analytics"
                key="analytics"
                onClick={() => navigate("/plans")}
              >
                Planes y Precios
              </DropdownItem>
              <DropdownItem
                key="help_and_feedback"
                onClick={() => navigate("/ayudaInformacion")}
              >
                Ayuda e Información
              </DropdownItem>
              <DropdownItem
                aria-label="logout"
                key="logout"
                color="danger"
                onClick={handleLogout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent as="div" justify="end">
          <Button
            href="/login"
            as={Link}
            anchorIcon={""}
            color="primary"
            showAnchorIcon
            variant="solid"
            style={{color: "white"}}
          >
            Sign In
          </Button>
        </NavbarContent>
      )}
    </Navbar>
  );
}
