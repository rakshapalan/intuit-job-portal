import { HeaderProvider } from "./context/headerContext";
import FixedHeader from "./views/components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesRenderer from "./route/routeRender";
import ErrorBoundary from "./views/components/ErrorBoundary";
import { JobProvider } from "./context/jobContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

function App() {
  return (
    <main style={{ paddingTop: "60px", minHeight: "1000px" }}>
      <ErrorBoundary>
        <Provider store={store}>
          <JobProvider>
            <Router>
              <HeaderProvider>
                <FixedHeader />
                <RoutesRenderer />
              </HeaderProvider>
            </Router>{" "}
            <ToastContainer />
          </JobProvider>
        </Provider>
      </ErrorBoundary>
    </main>

    // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    //   <RouterProvider router={router} />
    // </ThemeProvider>
  );
}

export default App;
