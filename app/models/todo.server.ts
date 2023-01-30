import { prisma } from "~/db.server";

import type { Todo, UserProfile } from "@prisma/client";

export async function getProfileTodos(id: UserProfile["id"]) {
  return prisma.todo.findMany({
    where: {
      userProfileId: { equals: id },
    },
  });
}

export async function upsertTodo({
  key,
  checked,
  hidden,
  profileId,
}: {
  key: Todo["key"];
  checked: Todo["checked"];
  hidden: Todo["hidden"];
  profileId: UserProfile["id"];
}) {
  return prisma.todo.upsert({
    where: {
      key_userProfileId: {
        key,
        userProfileId: profileId,
      },
    },
    create: {
      key,
      userProfileId: profileId,
      checked,
      hidden,
    },
    update: {
      checked,
      hidden,
    },
  });
}
