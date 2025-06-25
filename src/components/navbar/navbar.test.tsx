import { screen } from "@testing-library/react";
import Navbar from ".";
import * as React from "react";
import { authClient } from "@/lib/auth";
import { Mock } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/current-path",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("../ui/navigation", () => ({
  default: vi
    .fn()
    .mockReturnValue(<nav data-testid="navigation">Navigation</nav>),
}));

vi.mock("../ui/sheet", () => ({
  Sheet: vi
    .fn()
    .mockImplementation(({ children }: { children: React.ReactNode }) => (
      <div data-testid="sheet">{children}</div>
    )),
  SheetContent: vi
    .fn()
    .mockImplementation(({ children }: { children: React.ReactNode }) => (
      <div data-testid="sheet-content">{children}</div>
    )),
  SheetTrigger: vi
    .fn()
    .mockImplementation(({ children }: { children: React.ReactNode }) => (
      <div data-testid="sheet-trigger">{children}</div>
    )),
}));

vi.mock("@/lib/auth", () => ({
  authClient: {
    useSession: vi.fn(),
  },
}));

vi.mock("@/hooks/useAuth", () => ({
  default: vi.fn().mockReturnValue({ isAuthenticated: false }),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid="mock-link">
      {children}
    </a>
  ),
}));

vi.mock("../ui/button-box", () => ({
  default: () => <div data-testid="button-box">Button Box</div>,
}));

vi.mock("./config", () => ({
  default: {
    logo: <svg data-testid="logo">Logo</svg>,
    name: "test name",
    homeUrl: "/",
    mobileLinks: [
      { title: "title1", href: "/title1-link", isLink: true },
      {
        title: "title2",
        href: "title2-link",
        isLink: true,
      },
    ],
    protectedMenuItems: [
      { title: "protectedTitle", href: "/protected-title-link", isLink: true },
    ],
  },
}));

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (authClient.useSession as Mock).mockReturnValue({
      data: { session: null },
    });
  });

  it("renders correctly with default props", () => {
    render(<Navbar />);

    const pageNames = screen.getAllByText("test name");

    for (const name of pageNames) expect(name).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /toggle navigation menu/i })
    ).toBeInTheDocument();
  });

  it("renders navigation when showNavigation is true", () => {
    render(<Navbar showNavigation={true} />);

    expect(screen.getByTestId("navigation")).toBeInTheDocument();

    const navElement = document.querySelector('[data-slot="navbar-left"]');
    expect(navElement).not.toBeNull();
    expect(navElement?.innerHTML).toContain("nav");
  });

  it("does not render navigation when showNavigation is false", () => {
    render(<Navbar showNavigation={false} />);

    expect(screen.queryByTestId("navigation")).not.toBeInTheDocument();

    const navbarLeft = document.querySelector('[data-slot="navbar-left"]');
    expect(navbarLeft).not.toBeNull();
    expect(navbarLeft?.querySelectorAll("a").length).toBe(1); // Only the logo link
  });

  it("renders custom navigation when provided", () => {
    const customNav = <div data-testid="custom-nav">Custom Navigation</div>;
    render(<Navbar showNavigation={true} customNavigation={customNav} />);

    expect(screen.getByTestId("custom-nav")).toBeInTheDocument();
    expect(screen.queryByTestId("navigation")).not.toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const customClass = "test-custom-class";
    render(<Navbar className={customClass} />);

    expect(document.querySelector("header")).toHaveClass(customClass);
  });

  it("passes correct session data to useAuth hook", async () => {
    const mockSession = { id: "test-session" };
    (authClient.useSession as Mock).mockReturnValue({
      data: { session: mockSession },
    });

    const { default: useAuthMock } = await vi.importMock("@/hooks/useAuth");
    render(<Navbar />);

    expect(useAuthMock).toHaveBeenCalledWith(mockSession);
  });

  it("renders protected menu items when user is authenticated", async () => {
    vi.resetModules();

    vi.doMock("@/hooks/useAuth", () => ({
      default: vi.fn().mockReturnValue({ isAuthenticated: true }),
    }));

    vi.doMock("../ui/navigation", () => ({
      default: ({ protectedMenuItems }: { protectedMenuItems: any }) => (
        <nav data-testid="navigation">
          {protectedMenuItems?.map((item: any, i: number) => (
            <span key={i} data-testid="protected-item">
              {item.title}
            </span>
          ))}
        </nav>
      ),
    }));

    const { default: NavbarComponent } = await import(".");
    render(<NavbarComponent />);
    const protectedTitle = screen.getAllByText("protectedTitle");

    for (const title of protectedTitle) expect(title).toBeInTheDocument();
  });
});
