import { screen } from "@testing-library/react";
import ButtonBox from ".";
import { ReactNode } from "react";
import { Mock } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/home"),
  useRouter: () => ({
    replace: vi.fn(),
  }),
}));

vi.mock("next/link", () => ({
  default: ({ children }: { children: ReactNode }) => (
    <a data-testid="next-link">{children}</a>
  ),
}));

vi.mock("@/lib/auth", () => ({
  authClient: {
    useSession: vi.fn(),
    signOut: vi.fn(),
  },
}));

vi.mock("../ui/button", () => ({
  Button: ({ children, ...props }: { children: ReactNode }) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  ),
}));

describe("ButtonBox", () => {
  it("renders sign in and get started buttons when not authenticated", async () => {
    const { authClient } = await import("@/lib/auth");
    (authClient.useSession as Mock).mockReturnValue({ data: null });

    render(<ButtonBox />);

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders dashboard buttons when authenticated on home page", async () => {
    const { authClient } = await import("@/lib/auth");
    (authClient.useSession as Mock).mockReturnValue({
      data: { session: { user: { name: "Test User" } } },
    });

    render(<ButtonBox />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders sign out and go to home buttons when authenticated and not on home page", async () => {
    const { authClient } = await import("@/lib/auth");
    (authClient.useSession as Mock).mockReturnValue({
      data: { session: { user: { name: "Test User" } } },
    });

    const { usePathname } = await vi.importMock("next/navigation");
    (usePathname as Mock).mockReturnValue("/some-other-page");

    render(<ButtonBox />);

    expect(screen.getByText("Sign Out")).toBeInTheDocument();
    expect(screen.getByText("Go to Home")).toBeInTheDocument();
  });
});
