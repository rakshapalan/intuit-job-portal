import { HeaderProvider } from "./context/headerContext";
import Header from "./views/components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesRenderer from "./route/routeRender";
import ErrorBoundary from "./views/components/ErrorBoundary";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <main style={{ paddingTop: "60px", minHeight: "1000px" }}>
      <ErrorBoundary>
        <Provider store={store}>
          <Router>
            <AuthProvider>
              {/* <HeaderProvider> */}
              <Header /> <RoutesRenderer />
              {/* </HeaderProvider> */}
            </AuthProvider>
          </Router>{" "}
          <ToastContainer />
        </Provider>
      </ErrorBoundary>
    </main>

    // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    //   <RouterProvider router={router} />
    // </ThemeProvider>
  );
}

export default App;
