import { render, screen } from "@testing-library/react";
import { Users } from "..";

describe("Users", () => {
  it("should show loading message while fetching", () => {
    render(<Users />);

    expect(screen.getByRole("loading-message")).toBeVisible();
    expect(screen.getByRole("loading-message").textContent).toBe("Loading");
    expect(screen.queryByText("Users")).toBeNull();
  });
});
