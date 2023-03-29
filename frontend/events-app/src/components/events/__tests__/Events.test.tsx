import { render, screen } from "@testing-library/react";
import { Events } from "..";

describe("Events", () => {
  it("should show loading message while fetching", () => {
    render(<Events />);

    expect(screen.getByRole("loading-message")).toBeVisible();
    expect(screen.getByRole("loading-message").textContent).toBe("Loading");
    expect(screen.queryByText("Events")).toBeNull();
  });
});
