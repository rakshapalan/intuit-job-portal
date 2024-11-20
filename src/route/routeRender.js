// src/components/RoutesRenderer.js
import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import routesConfig from "./config";
import NotFound from "../views/components/NotFound";
import { useAuth } from "../context/authContext";
const RoutesRenderer = () => {
  let auth = localStorage.getItem("auth");
  auth = auth && JSON.parse(auth);
  const location = useLocation();
  const urlRole = location.pathname;

  return (
    <Suspense>
      <Routes>
        {routesConfig.map(
          ({ path, component: Component, allowedRoles }, index) => (
            <Route
              key={index}
              path={path}
              element={
                !allowedRoles ||
                (allowedRoles?.includes(auth?.role) &&
                  (!urlRole || urlRole?.includes(auth?.role))) ? (
                  <Component />
                ) : (
                  <Navigate to="/not-found" replace />
                )
              }
            />
          )
        )}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesRenderer;
