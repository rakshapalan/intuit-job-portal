// src/components/RoutesRenderer.js
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routesConfig from "./config";
import NotFound from "../views/components/NotFound";

const RoutesRenderer = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {routesConfig.map(({ path, component: Component, exact }, index) => (
        <Route key={index} path={path} element={<Component />} exact={exact} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default RoutesRenderer;
