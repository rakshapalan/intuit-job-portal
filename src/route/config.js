import { lazy } from "react";

const routesConfig = [
  {
    path: "/:role/login",
    component: lazy(() => import("../views/pages/Login")),
    // Open to all roles
  },
  {
    path: "/",
    component: lazy(() => import("../views/pages/LandingPage")),
    // Open to all roles
  },
  {
    path: "/:role/jobList",
    component: lazy(() => import("../views/pages/JobCardList")),
    allowedRoles: ["user", "employer"], // Both roles can access
  },
  {
    path: "/:role/profile",
    component: lazy(() => import("../views/pages/RoleBasedForm")),
    allowedRoles: ["user", "employer"], // Both roles can access
  },
  {
    path: "/:role/view/profile",
    component: lazy(() =>
      import("../views/pages/FreelancerProfile/individualProfile")
    ),
    allowedRoles: ["user"], // Only users can access
  },
  {
    path: "/employer/allApplicants",
    component: lazy(() => import("../views/pages/AllApplicants")),
    allowedRoles: ["employer"], // Only employers can access
  },

  // Add more routes here as needed
];

export default routesConfig;
