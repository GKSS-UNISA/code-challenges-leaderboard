import { screen } from "@testing-library/react";
import Navbar from ".";
import { describe, expect } from "vitest";

vi.mock("lucide-react", () => ({
  Menu: () => <svg data-testid="menu-icon" />,
}));

vi.mock("@/lib/utils", () => ({
  cn: (...args: any[]) => args.join(" "),
}));

vi.mock("../ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props} data-testid="button">
      {children}
    </button>
  ),
}));

vi.mock("../ui/navbar", () => ({
  Navbar: ({ children }: any) => <nav data-testid="navbar">{children}</nav>,
  NavbarLeft: ({ children }: any) => (
    <div data-testid="navbar-left">{children}</div>
  ),
  NavbarRight: ({ children }: any) => (
    <div data-testid="navbar-right">{children}</div>
  ),
}));

vi.mock("../ui/navigation", () => ({
  __esModule: true,
  default: () => <nav data-testid="navigation">Navigation</nav>,
}));

vi.mock("../ui/sheet", () => ({
  Sheet: ({ children }: any) => <div data-testid="sheet">{children}</div>,
  SheetContent: ({ children }: any) => (
    <div data-testid="sheet-content">{children}</div>
  ),
  SheetTrigger: ({ children }: any) => (
    <button data-testid="sheet-trigger">{children}</button>
  ),
}));

vi.mock("./config", () => ({
  __esModule: true,
  default: {
    logo: <svg data-testid="logo" />,
    name: "test name",
    homeUrl: "/test/url",
    mobileLinks: [
      { text: "link1text", href: "/link1" },
      {
        text: "link2text",
        href: "/link2",
      },
    ],
    actions: [
      {
        text: "action1text",
        href: "/action1",
        isButton: false,
      },
      {
        text: "action2text",
        href: "/action2",
        isButton: true,
        variant: "default",
      },
    ],
  },
}));

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<Navbar />);
  });

  it("renders the navbar component", () => {
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("renders the navbar with logo and name", () => {
    const desktopNavbar = screen.getByTestId("navbar-left");
    expect(desktopNavbar).toBeInTheDocument();
    expect(screen.getByTestId("logo")).toBeInTheDocument();

    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
    expect(logo.closest("a")).toHaveAttribute("href", "/test/url");

    const logoText = screen.getAllByText("test name");
    for (const text of logoText) {
      expect(text).toBeInTheDocument();
    }
  });

  it("renders the navigation links", () => {
    const navigation = screen.getByTestId("navigation");
    expect(navigation).toBeInTheDocument();
    expect(screen.getByText("Navigation")).toBeInTheDocument();
  });

  it("renders the mobile links in the sheet", () => {
    const sheet = screen.getByTestId("sheet");
    expect(sheet).toBeInTheDocument();

    const sheetContent = screen.getByTestId("sheet-content");
    expect(sheetContent).toBeInTheDocument();

    const link1 = screen.getByText("link1text");
    expect(link1).toBeInTheDocument();
    expect(link1.closest("a")).toHaveAttribute("href", "/link1");

    const link2 = screen.getByText("link2text");
    expect(link2).toBeInTheDocument();
    expect(link2.closest("a")).toHaveAttribute("href", "/link2");
  });
});
