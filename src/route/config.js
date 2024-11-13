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
    path: "/jobList",
    component: lazy(() => import("../views/pages/JobCardList")),
  },
  {
    path: "/userprofile",
    component: lazy(() => import("../views/pages/FreelancerProfile")),
  },
  {
    path: "/employeeprofile",
    component: lazy(() => import("../views/pages/EmployeeForm")),
  },
  {
    path: "/employeeList",
    component: lazy(() => import("../views/pages/JobCardList")),
  },
  {
    path: "/allApplicants",
    component: lazy(() => import("../views/pages/AllApplicants")),
  },

  // Add more routes here as needed
];

export default routesConfig;
