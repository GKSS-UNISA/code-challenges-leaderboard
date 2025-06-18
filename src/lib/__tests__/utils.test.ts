import { describe, test, expect, vi } from "vitest";
import { cn } from "../utils";

test("cn function should be defined", () => {
  expect(cn).toBeDefined();
});

test("cn should merge class names", () => {
  const result = cn("class1", "class2", { class3: true, class4: false });
  expect(result).toBe("class1 class2 class3");
});
