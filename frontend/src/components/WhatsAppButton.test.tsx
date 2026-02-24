import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WhatsAppButton from "./WhatsAppButton";

describe("WhatsAppButton Component", () => {
  it("renders the button with the correct href and accessibility attributes", () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole("link", { name: /hablar con maría por whatsapp/i });

    expect(link).toHaveAttribute(
      "href",
      "https://api.whatsapp.com/send?phone=16208779065&text=Hola,%20quisiera%20recibir%20una%20atenci%C3%B3n%20personalizada."
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the tooltip", () => {
    render(<WhatsAppButton />);
    expect(screen.getByText(/habla con maría/i)).toBeInTheDocument();
  });
});
