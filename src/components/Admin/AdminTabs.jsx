import React, { lazy, Suspense, useState } from "react";
import { Tabs, Tab, CircularProgress } from "@nextui-org/react";

const AdminDashboard = lazy(() => import("../../pages/Admin/AdminDashboard"));
const AdminPlans = lazy(() => import("../../pages/Admin/AdminPlans"));
const AdminBussiness = lazy(() => import("../../pages/Admin/AdminBussiness"));

export default function AdminTabs() {
  const [activeTab, setActiveTab] = useState("users");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="users, plans, bussiness"
        color="default"
        fullWidth
        value={activeTab}
        onSelectionChange={handleTabChange}
      >
        <Tab key="users" title="Usuarios" value="users">
          {activeTab === "users" && (
            <Suspense fallback={<CircularProgress label="Cargando..." />}>
              <AdminDashboard />
            </Suspense>
          )}
        </Tab>
        <Tab key="plans" title="Planes" value="plans">
          {activeTab === "plans" && (
            <Suspense fallback={<CircularProgress label="Cargando..." />}>
              <AdminPlans />
            </Suspense>
          )}
        </Tab>
        <Tab key="bussiness" title="Negocios" value="bussiness">
          {activeTab === "bussiness" && (
            <Suspense fallback={<CircularProgress label="Cargando..." />}>
              <AdminBussiness />
            </Suspense>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
