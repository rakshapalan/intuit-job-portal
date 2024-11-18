import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import store from "./store";
import { HeaderProvider } from "./context/headerContext";
import { AuthProvider } from "./context/authContext";
import { JobProvider } from "./context/jobContext";
import FixedHeader from "./views/components/Header";
import RoutesRenderer from "./route/routeRender";
import App from "./App";

// Mock FixedHeader, RoutesRenderer, and ToastContainer for isolation

jest.mock("./views/components/ErrorBoundary", () => ({ children }) => (
  <div>{children}</div>
));
jest.mock("./views/components/Header", () => () => (
  <div data-testid="fixed-header">FixedHeader</div>
));
jest.mock("./route/routeRender", () => () => (
  <div data-testid="routes-renderer">RoutesRenderer</div>
));
jest.mock("react-toastify", () => ({
  ToastContainer: () => <div data-testid="toast-container">ToastContainer</div>,
}));

describe("App Component", () => {
  test("renders App without crashing", () => {
    render(
      <Provider store={store}>
        <JobProvider>
          <Router>
            <AuthProvider>
              <HeaderProvider>
                <App />
              </HeaderProvider>
            </AuthProvider>
          </Router>
        </JobProvider>
      </Provider>
    );

    // Assert FixedHeader is rendered
    expect(screen.getByTestId("fixed-header")).toBeInTheDocument();

    // Assert RoutesRenderer is rendered
    expect(screen.getByTestId("routes-renderer")).toBeInTheDocument();

    // Assert ToastContainer is rendered
    expect(screen.getByTestId("toast-container")).toBeInTheDocument();
  });

  test("contains main container with styles", () => {
    render(
      <Provider store={store}>
        <JobProvider>
          <Router>
            <AuthProvider>
              <HeaderProvider>
                <App />
              </HeaderProvider>
            </AuthProvider>
          </Router>
        </JobProvider>
      </Provider>
    );

    // Check if the main element exists with proper styles
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveStyle({
      paddingTop: "60px",
      minHeight: "1000px",
    });
  });
});
