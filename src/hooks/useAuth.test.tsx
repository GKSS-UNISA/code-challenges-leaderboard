import { renderHook } from "@testing-library/react";
import { type Session } from "better-auth";
import useAuth from "./useAuth";

const mockSession: Session = {
  id: "session-123",
  token: "mock-token",
  userId: "123",
  expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
  createdAt: new Date(),
  updatedAt: new Date(),
  ipAddress: "127.0.0.1",
  userAgent: "test-agent",
};

describe("useAuth", () => {
  it("should return false for isAuthenticated when no session is provided", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("should return false for isAuthenticated when session is undefined", () => {
    const { result } = renderHook(() => useAuth(undefined));
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("should return true for isAuthenticated when a session is provided", () => {
    const { result } = renderHook(() => useAuth(mockSession));
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("should update isAuthenticated when session prop changes", () => {
    const { result, rerender } = renderHook(({ session }) => useAuth(session), {
      initialProps: { session: undefined as Session | undefined },
    });

    expect(result.current.isAuthenticated).toBe(false);

    rerender({ session: mockSession });
    expect(result.current.isAuthenticated).toBe(true);

    rerender({ session: undefined });
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("should only re-render when session actually changes", () => {
    const renderSpy = vi.fn();

    const { rerender } = renderHook(
      ({ session }) => {
        renderSpy();
        return useAuth(session);
      },
      { initialProps: { session: undefined as Session | undefined } }
    );

    expect(renderSpy).toHaveBeenCalled();

    rerender({ session: undefined });
    expect(renderSpy).toHaveBeenCalledTimes(2);

    rerender({ session: mockSession });
    expect(renderSpy).toHaveBeenCalledTimes(4);
  });
});
