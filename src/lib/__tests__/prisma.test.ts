import prisma from "../prisma";

vi.mock("@/generated/prisma", () => ({
  PrismaClient: class {
    $extends() {
      return this;
    }
  },
}));

test("prisma client is defined", () => {
  expect(prisma).toBeDefined();
});
