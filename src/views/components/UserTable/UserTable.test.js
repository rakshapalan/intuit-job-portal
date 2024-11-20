import React from "react";
import UserTable from "./index";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
describe("test", () => {
  const rendercomp = () => render(<UserTable />);

  test("test comp", () => {
    rendercomp();
    expect(screen.getByText("User")).toBeInTheDocument();
  });
});
