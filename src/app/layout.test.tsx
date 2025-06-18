import { screen } from "@testing-library/react";
import RootLayout from "./layout";

vi.mock("next/font/google", () => ({
  Geist: vi.fn(() => ({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  })),
}));

vi.mock("@/components/navbar", () => ({
  __esModule: true,
  default: () => <div data-testid="navbar">Navbar</div>,
}));

vi.mock("./globals.css", () => ({
  __esModule: true,
  default: () => <div>Mocked Globals CSS</div>,
}));

describe("RootLayout", () => {
  beforeEach(() => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );
  });

  it("renders the main container with correct class and data-testid", () => {
    expect(screen.getByTestId("main__container")).toBeInTheDocument();
    expect(screen.getByTestId("main__container")).toHaveClass(
      "w-full min-h-[calc(100vh-96px)] mt-6"
    );
  });

  it("renders the Navbar component", () => {
    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });
});
