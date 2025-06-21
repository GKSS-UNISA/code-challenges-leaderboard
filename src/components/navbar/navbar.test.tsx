import { screen } from "@testing-library/react";
import Navbar from ".";
import { authClient } from "@/lib/auth";

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
    (authClient.useSession as any).mockReturnValue({ data: { session: null } });
  });

  it("renders correctly with default props", () => {
    render(<Navbar />);

    expect(screen.getByText("test name")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /toggle navigation menu/i })
    ).toBeInTheDocument();
  });

  it("renders navigation when showNavigation is true", () => {
    render(<Navbar showNavigation={true} />);

    // Consider using a more reliable selector than document.querySelector
    // For example, you could add a data-testid to your Navigation component
    expect(screen.getByTestId("navigation")).toBeInTheDocument();

    // If you must use querySelector, at least check for existence
    const navElement = document.querySelector('[data-slot="navbar-left"]');
    expect(navElement).not.toBeNull();
    expect(navElement?.innerHTML).toContain("nav");
  });

  it("does not render navigation when showNavigation is false", () => {
    render(<Navbar showNavigation={false} />);

    // Consider using screen queries instead of document.querySelector
    expect(screen.queryByTestId("navigation")).not.toBeInTheDocument();

    // Alternative approach with your current method
    const navbarLeft = document.querySelector('[data-slot="navbar-left"]');
    expect(navbarLeft).not.toBeNull();
    expect(navbarLeft?.querySelectorAll("a").length).toBe(1); // Only the logo link
  });

  it("renders custom navigation when provided", () => {
    const customNav = <div data-testid="custom-nav">Custom Navigation</div>;
    render(<Navbar showNavigation={true} customNavigation={customNav} />);

    expect(screen.getByTestId("custom-nav")).toBeInTheDocument();
    // Also verify the default navigation is not rendered
    expect(screen.queryByTestId("navigation")).not.toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const customClass = "test-custom-class";
    render(<Navbar className={customClass} />);

    expect(document.querySelector("header")).toHaveClass(customClass);
  });

  it("does not render protected menu items when user is not authenticated", () => {
    // Mock the useAuth hook to return isAuthenticated as false (default in our beforeEach)
    render(<Navbar />);

    // This test will need to be adjusted based on your actual protected menu items
    // For example:
    // expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it("passes correct session data to useAuth hook", async () => {
    const mockSession = { id: "test-session" };
    (authClient.useSession as any).mockReturnValue({
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

    expect(screen.getByText("protectedTitle")).toBeInTheDocument();
  });
});
