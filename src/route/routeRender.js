// src/components/RoutesRenderer.js
import React, { Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import routesConfig from "./config";
import NotFound from "../views/components/NotFound";

const RoutesRenderer = () => {
  const location = useLocation();
  let auth = localStorage.getItem("auth");
  auth = auth && JSON.parse(auth);
  const urlRole = location.pathname;
  console.log("auth", auth);
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
