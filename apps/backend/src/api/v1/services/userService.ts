import prisma from "../../../prismaClient";

export const getUserByClerkId = (clerkUserId: string) => {
  return prisma.user.findUnique({
    where: { clerkUserId }
  });
};

export const createUser = (clerkUserId: string) => {
  return prisma.user.create({
    data: { clerkUserId }
  });
};
