import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";
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
        <App />
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
        <App />
      </Provider>
    );

    // Check if the main app.js renders
    const mainElement = screen.getByRole("main");
    expect(mainElement).toBeInTheDocument();
  });
});
