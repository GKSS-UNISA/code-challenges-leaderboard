import { screen } from "@testing-library/react";
import Hero from ".";

vi.mock("@/lib/utils", () => ({
  cn: (...args: string[]) => args.join(" "),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props} data-testid="button">
      {children}
    </button>
  ),
}));

vi.mock("@/components/ui/section", () => ({
  __esModule: true,
  default: ({ children, className }: any) => (
    <div className={className} data-testid="section">
      {children}
    </div>
  ),
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  ),
}));

vi.mock("@/components/sections/hero/config", () => ({
  __esModule: true,
  default: {
    title: "test title",
    description: "test description",
    badge: <div data-testid="badge">Badge</div>,
    buttons: [
      {
        href: "test-link-1",
        text: "test button text",
        variant: "default",
      },
      {
        href: "test-link-2",
        text: "LINK",
        variant: "glow",
        icon: <svg data-testid="icon" className="mr-2 size-4" />,
      },
    ],
  },
}));

describe("Hero Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<Hero className="custom-class" />);
  });

  it("renders section component", () => {
    const section = screen.getByTestId("section");

    expect(section).toBeInTheDocument();
    expect(section).toHaveClass(
      "fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0"
    );
  });

  it("applies custom className to section container", () => {
    expect(screen.getByTestId("section")).toHaveClass("custom-class");
  });

  it("renders the title", () => {
    expect(screen.getByText("test title")).toBeInTheDocument();
  });

  it("renders the description", () => {
    expect(screen.getByText("test description")).toBeInTheDocument();
  });

  it("renders buttons when provided", () => {
    expect(screen.getAllByTestId("button").length).toBeGreaterThan(0);
    expect(screen.getByText("test button text")).toBeInTheDocument();
    expect(screen.getByText("LINK")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders the badge when provided", () => {
    expect(screen.getByTestId("badge")).toBeInTheDocument();
  });
});
