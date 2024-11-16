import { lazy } from "react";

const routesConfig = [
  {
    path: "/:role/login",
    component: lazy(() => import("../views/pages/Login")),
  },
  {
    path: "/",
    component: lazy(() => import("../views/pages/LandingPage")),
  },

  {
    path: "/:role/jobList",
    component: lazy(() => import("../views/pages/JobCardList")),
  },
  {
    path: "/:role/profile",
    component: lazy(() => import("../views/pages/RoleBasedForm")),
  },
  {
    path: "/employer/allApplicants",
    component: lazy(() => import("../views/pages/AllApplicants")),
  },

  // Add more routes here as needed
];

export default routesConfig;
