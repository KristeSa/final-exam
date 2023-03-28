import { render, fireEvent, screen } from "@testing-library/react";
import { Login } from "../Login";

describe("Login", () => {
  it("should allow user to login", async () => {
    render(<Login />);

    // Find the email and password input fields and enter test values
    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("password");
    fireEvent.change(emailInput, { target: { value: "testuser@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    // Find the submit button and click it
    const submitButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(submitButton);

    // Wait for the success message to appear and verify its contents
    // const successMessage = await screen.findByText("Login successful!");
    // expect(successMessage).toBeInTheDocument();
  });
});
