import React, { Component } from "react";
import error from "../../../assets/error.webp";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught by Error Boundary: ", error, errorInfo);
  }

  render() {
    const ErrorPage = () => (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <img src={error} alt="error" />
      </div>
    );

    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
