import { prisma } from "~/db.server";
import type { UserProfile } from "@prisma/client";

export async function getActiveProfileByUserId(userId: UserProfile["userId"]) {
  return prisma.userProfile.findFirstOrThrow({
    where: {
      AND: {
        userId: {
          equals: userId,
        },
        active: {
          equals: true,
        },
      },
    },
  });
}
