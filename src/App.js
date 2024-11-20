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
import { ThemeProvider, useTheme } from "./context/themeContext";

function App() {
  const { theme } = useTheme() || {};
  return (
    <main className={`main-container ${theme}`}>
      <ErrorBoundary>
        <Provider store={store}>
          <Router>
            <AuthProvider>
              <ThemeProvider>
                <Header />
                <RoutesRenderer />
              </ThemeProvider>
            </AuthProvider>
          </Router>
          <ToastContainer />
        </Provider>
      </ErrorBoundary>
    </main>
  );
}

export default App;
