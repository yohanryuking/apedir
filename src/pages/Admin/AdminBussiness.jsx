import React from "react";
// import { getUsers } from "../../api/profile";
// import { useState, useEffect } from "react";
// import supabase from "../../api/client";
import NegocioTable from "../../components/Admin/NegocioTable";
import { useAdminBussiness } from "../../hooks/useStore";
import { fetchAllBussiness } from "../../api/bussiness";

export default function AdminBussiness() {
  const bussiness = useAdminBussiness((state) => state.bussiness);
  const setBussiness = useAdminBussiness((state) => state.setBussiness);

  const getAllBussinesses = async () => {
    const bList = await fetchAllBussiness();
    setBussiness(bList);
  };

  React.useEffect(() => {
    if (bussiness.length === 0) {
      getAllBussinesses();
    }
  }, []);

  return (
    <>
      <NegocioTable
        bussinessList={bussiness}
        getAllBussinesses={getAllBussinesses}
      />
    </>
  );
}
