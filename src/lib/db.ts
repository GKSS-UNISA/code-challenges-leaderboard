import prisma from "@/lib/prisma";

export async function getClientId(clerkUserId: string) {
  await prisma.clientID.findUnique({
    where: { clerkUserId },
  });
}

export async function generateClientId(clerkUserId: string, value: string) {
  await prisma.clientID.create({
    data: {
      clerkUserId,
      value,
    },
  });
}
