import { describe, test, expect, vi } from "vitest";
import { auth, authClient } from "../auth";

test("should return a valid auth object", () => {
  expect(auth).toBeDefined();
  expect(auth).toHaveProperty("api");
});

test("should return a valid auth client object", () => {
  expect(authClient).toBeDefined();
});
