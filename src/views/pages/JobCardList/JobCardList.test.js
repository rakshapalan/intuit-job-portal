import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// import configureStore from "redux-mock-store";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import JobCardList from "./index"; // Adjust path
import * as jobActions from "../../../actions/jobAction"; // Adjust path
import { AuthProvider } from "../../../context/authContext";
import { jobReducer } from "../../../reducers/reducer";

// const mockStore = configureMockStore([thunk]);

const mockStore = configureStore({
  reducer: jobReducer, // Use the same slice name

  preloadedState: {
    isloading: false,
    job: [
      {
        jobId: 1,
        title: "Frontend Developer",
        companyName: "Tech Corp",
        tagsAndSkills: "React, JavaScript, CSS",
        minSalary: 50000,
      },
      {
        jobId: 2,
        title: "Backend Developer",
        companyName: "Code Studio",
        tagsAndSkills: "Node.js, Express, MongoDB",
        minSalary: 60000,
      },
    ],
    error: null,
  },
});

jest.mock("../../../actions/jobAction", () => ({
  fetchAllJobs: jest.fn(),
  applyToUserJob: jest.fn(),
}));

describe("JobCardList Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore;
    jest.spyOn(jobActions, "fetchAllJobs").mockReturnValue(jest.fn());
    jest.spyOn(jobActions, "applyToUserJob").mockReturnValue(jest.fn());
    jobActions.fetchAllJobs.mockClear();
    jobActions.applyToUserJob.mockClear();
  });

  const renderComponent = () =>
    render(
      <Provider store={mockStore}>
        <Router>
          <AuthProvider>
            {" "}
            <JobCardList />
          </AuthProvider>
        </Router>
      </Provider>
    );

  test("should render job list and subheader correctly", () => {
    renderComponent();

    expect(screen.getByText("Search jobs")).toBeInTheDocument();
  });

  test("should display 'no results found' image if job list is empty", () => {
    const emptyMockStore = configureStore({
      reducer: jobReducer, // Use the same slice name

      preloadedState: {
        isloading: false,
        job: [],
        error: null,
      },
    });

    const renderComponent = () =>
      render(
        <Provider store={emptyMockStore}>
          <Router>
            <AuthProvider>
              {" "}
              <JobCardList />
            </AuthProvider>
          </Router>
        </Provider>
      );
    renderComponent();
    expect(screen.getByAltText("No search results found")).toBeInTheDocument();
  });

  test("should call `fetchAllJobs` action on mount", () => {
    renderComponent();

    expect(jobActions.fetchAllJobs).toHaveBeenCalledTimes(1);
  });

  test("should allow quick applying to jobs", async () => {
    renderComponent();
    const quickApplyCheckbox = screen.getAllByRole("checkbox")[0];

    fireEvent.click(quickApplyCheckbox);
    expect(quickApplyCheckbox).toBeChecked(true);
  });

  // test("should paginate job list", () => {
  //   renderComponent();

  //   const nextPageButton = screen.getByText("Next");
  //   fireEvent.click(nextPageButton);

  //   expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
  // });

  test("should filter job list based on skills", () => {
    renderComponent();

    const filterInput = screen.getByPlaceholderText("Select a skill");
    fireEvent.change(filterInput, { target: { value: "React" } });

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    // expect(screen.queryByText("Backend Developer")).not.toBeInTheDocument();
  });
});
