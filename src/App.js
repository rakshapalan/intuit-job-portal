import { HeaderProvider } from "../src/views/context/headerContext";
import FixedHeader from "../src/views/components/header";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesRenderer from "./route/routeRender";
import ErrorBoundary from "./views/components/ErrorBoundary";
import { JobProvider } from "./views/context/jobContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";

//   {
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/",
//         element: <LandingPage />,
//       },
//       {
//         path: "/onboarding",
//         element: (
//           <ProtectedRoute>
//             <Onboarding />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/jobs",
//         element: (
//           <ProtectedRoute>
//             <JobListing />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/post-job",
//         element: (
//           <ProtectedRoute>
//             <PostJob />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/my-jobs",
//         element: (
//           <ProtectedRoute>
//             <MyJobs />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/saved-jobs",
//         element: (
//           <ProtectedRoute>
//             <SavedJobs />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/job/:id",
//         element: (
//           <ProtectedRoute>
//             <JobPage />
//           </ProtectedRoute>
//         ),
//       },
//     ],
//   },
// ]);

function App() {
  return (
    <HeaderProvider>
      <FixedHeader />
      <main style={{ paddingTop: "60px", minHeight: "1000px" }}>
        <ErrorBoundary>
          <JobProvider>
            <Router>
              <RoutesRenderer />
            </Router>{" "}
            <ToastContainer />
          </JobProvider>
        </ErrorBoundary>
      </main>
    </HeaderProvider>

    // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    //   <RouterProvider router={router} />
    // </ThemeProvider>
  );
}

export default App;
