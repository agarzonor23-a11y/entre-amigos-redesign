import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { NavLink } from "./NavLink";

describe("NavLink Component", () => {
  it("renders with default classes", () => {
    render(
      <MemoryRouter>
        <NavLink to="/test" className="base-class">
          Test Link
        </NavLink>
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /test link/i });
    expect(link).toHaveClass("base-class");
  });

  it("applies activeClassName when the link is active", () => {
    render(
      <MemoryRouter initialEntries={["/active"]}>
        <Routes>
          <Route
            path="/active"
            element={
              <NavLink
                to="/active"
                className="base-class"
                activeClassName="active-class"
              >
                Active Link
              </NavLink>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /active link/i });
    expect(link).toHaveClass("base-class");
    expect(link).toHaveClass("active-class");
  });

  it("does not apply activeClassName when the link is inactive", () => {
    render(
      <MemoryRouter initialEntries={["/inactive"]}>
        <Routes>
          <Route
            path="/inactive"
            element={
              <NavLink
                to="/active"
                className="base-class"
                activeClassName="active-class"
              >
                Inactive Link
              </NavLink>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /inactive link/i });
    expect(link).toHaveClass("base-class");
    expect(link).not.toHaveClass("active-class");
  });
});
