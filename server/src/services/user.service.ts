import prisma from "../db/prisma";
import { AppError } from "../utils";

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};
