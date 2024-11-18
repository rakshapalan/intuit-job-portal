import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // for simulating user actions
import { Button } from "./index"; // Assuming the Button component is in the same directory

describe("Button Component", () => {
  test("renders the button with correct text", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument(); // Check if the button is in the DOM
    expect(button).toHaveTextContent("Click Me"); // Check if it displays the correct text
  });

  test("triggers onClick handler when clicked", () => {
    const handleClick = jest.fn(); // Mock the click handler
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button");

    userEvent.click(button); // Simulate user clicking the button
    expect(handleClick).toHaveBeenCalledTimes(1); // Ensure the onClick handler is called once
  });

  test("disables the button when the disabled prop is true", () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled(); // Ensure the button is disabled
    expect(button).toHaveStyle("background-color: gray"); // Ensure the background color is gray
    expect(button).toHaveStyle("border-color: gray"); // Ensure the border color is gray
  });

  test("changes background color when hovered", () => {
    render(<Button>Hover Me</Button>);
    const button = screen.getByRole("button");

    // Simulate hovering over the button
    userEvent.hover(button);
    expect(button).toHaveStyle("background-color: darkblue"); // Check if background color changes to darkblue on hover
    expect(button).toHaveStyle("border-color: darkblue"); // Check if border color changes to darkblue on hover
  });

  test("does not trigger onClick when button is disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click Me
      </Button>
    );
    const button = screen.getByRole("button");

    userEvent.click(button); // Simulate click on disabled button
    expect(handleClick).not.toHaveBeenCalled(); // Ensure the onClick handler was not called
  });
});
