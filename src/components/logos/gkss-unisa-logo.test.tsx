import { screen } from "@testing-library/react";
import Logo from "./gkss-unisa-logo";

test("Logo renders with correct alt text and dimensions", () => {
  render(<Logo />);

  const logoImage = screen.getByTestId("next-image");
  expect(logoImage).toBeInTheDocument();

  expect(logoImage).toHaveAttribute("alt", "GKSS UNISA brand icon");
  expect(logoImage).toHaveAttribute("src", "/logo.png");
  expect(logoImage).toHaveAttribute("width", "40");
  expect(logoImage).toHaveAttribute("height", "40");
});
