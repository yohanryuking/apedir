import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@nextui-org/progress";
import PropTypes from "prop-types";
import { getUserRole } from "../api/auth";

const progressBarStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const RequireUserRole = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado para rastrear la carga
  const location = useLocation();

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole();
      setUserRole(role);
      setLoading(false);
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return (
      <div style={progressBarStyle}>
        <CircularProgress size="lg" color="secondary" label="Loading..." />
      </div>
    ); // Puedes mostrar un componente de carga o simplemente devolver null
  }

  if (userRole !== "user") {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

const RequireAdminRole = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado para rastrear la carga
  const location = useLocation();

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole();
      setUserRole(role);
      setLoading(false);
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return (
      <div style={progressBarStyle}>
        <CircularProgress size="lg" color="secondary" label="Loading..." />
      </div>
    ); // Puedes mostrar un componente de carga o simplemente devolver null
  }

  if (userRole !== "admin") {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

const RequireMerchantRole = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado para rastrear la carga
  const location = useLocation();

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole();
      setUserRole(role);
      setLoading(false);
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return (
      <div style={progressBarStyle}>
        <CircularProgress size="lg" color="secondary" label="Loading..." />
      </div>
    ); // Puedes mostrar un componente de carga o simplemente devolver null
  }

  if (userRole !== "merchant") {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

RequireUserRole.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RequireUserRole, RequireAdminRole, RequireMerchantRole };
