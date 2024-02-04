import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import { useBussinessStore, usePlan, useUserStore } from "../../hooks/useStore";
import { getOneBussiness } from "../../api/bussiness";
import { supabase } from "../../api/client";
import CambioDePaquete from "./CambioDePaquete";
import VipListNegocios from "./VipListNegocios";
import { getPlan } from "../../api/plans";
import DeleteBussinessModal from "../Admin/modals/DeleteBussinessModal";
//import { getAllProductsVipsFirst } from "../../api/products";


export default function CrearNegocio({ children }) {
  const user = useUserStore((state) => state.user);
  const bussiness = useBussinessStore((state) => state.bussiness);
  const setBussiness = useBussinessStore((state) => state.setBussiness);
  const setPlan = usePlan((state) => state.setPlan);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchPlan = async () => {
      const p = await getPlan(user.plan);
      setPlan(p);
    };
    if (user && user.plan) fetchPlan();
  }, [user]);

  const sectionStyle = {
    width: "100%",
    maxWidth: "900px",
    display: "grid",
    gridTemplateColumns: "repeat(1,1fr)",
  };

  const channels = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "bussiness",
      },
      async (payload) => {
        try {
          if (user === null) return;
          const b = await getOneBussiness(user.id);
          setBussiness(b);
        } catch (error) {
          console.error("Error fetching business:", error);
        }
      }
    )
    .subscribe();


  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={sectionStyle}>
        <CambioDePaquete paquete={user?.plan} />

        {user?.plan == "premium" ? (
          <VipListNegocios userId={user.id} onOpenChange={onOpenChange} />
        ) : null}

        <div>

          {bussiness !== null && bussiness !== undefined ? (
            <section
              className="flex justify-between"
              style={{ margin: "10px" }}
            >
              <Link to="/administrador-negocio/perfil">Perfil</Link>
              <Link to="/administrador-negocio/horarios">Horario</Link>
              {user?.plan === "premium" && (
                <Link to="/administrador-negocio/eventos">Eventos</Link>
              )}

              {user?.plan === "premium" && (
                <Link to="/administrador-negocio/novedades">Novedades</Link>
              )}

              <Link to="/administrador-negocio/productos">Productos</Link>
            </section>
          ) : (
            <section className="flex justify-between mx-8">
              <Link to="/administrador-negocio/perfil">Perfil</Link>
            </section>
          )}
        </div>
        <Card>
          <CardBody>{children}</CardBody>
        </Card>
        <DeleteBussinessModal
          bussinessToDelete={bussiness}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          merchant={true}
        />
      </div>
    </div>
  );
}
