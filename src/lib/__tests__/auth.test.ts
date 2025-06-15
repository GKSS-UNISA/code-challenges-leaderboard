import { auth } from "../auth";

describe("auth", () => {
  it("exports auth object with api property", () => {
    expect(auth).toBeDefined();
    expect(auth).toHaveProperty("api");
  });
});
