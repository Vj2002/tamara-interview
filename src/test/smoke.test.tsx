import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

// Proves the test stack (jsdom + RTL + jest-dom + user-event) is wired up.
describe("test tooling", () => {
  it("renders, queries by role, and handles user events", async () => {
    const onClick = vi.fn();
    render(
      <button type="button" onClick={onClick}>
        Ready
      </button>,
    );

    const button = screen.getByRole("button", { name: "Ready" });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
