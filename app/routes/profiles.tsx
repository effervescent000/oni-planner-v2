import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { createCookieSessionStorage } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Button from "~/components/common/button";

import { prisma } from "~/db.server";
import { createProfileSession } from "~/session.server";
import type { IUserProfile } from "~/types/interfaces";
import { profileIsValid, useUser } from "~/utils";

const { getSession } = createCookieSessionStorage();

export async function loader({ request }: LoaderArgs) {
  const cookie = request.headers.get("cookie");
  const session = await getSession(cookie);
  const userId = session.get("userId");

  return json({
    profiles: await prisma.userProfile.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    }),
  });
}

async function turnOffProfiles() {
  await prisma.userProfile.updateMany({
    data: { active: false },
  });
}

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const values = {
    id: body.get("id") as string,
    title: body.get("title") as string | undefined,
    active: !!body.get("active"),
  } as IUserProfile;
  if (profileIsValid(values)) {
    // turn off all active profiles
    if (values.active) {
      await turnOffProfiles();
    }
    if (values.id === "0") {
      await turnOffProfiles();
      const createdUser = await prisma.userProfile.create({
        data: {
          title: values.title,
          active: true,
          userId: body.get("user") as string,
        },
      });
      createProfileSession({
        request,
        profileId: createdUser.id,
        remember: true,
        redirectTo: "/",
      });
      return json(createdUser);
    } else {
      const updatedUser = await prisma.userProfile.update({
        where: { id: values.id },
        data: {
          active: values.active,
        },
      });
      createProfileSession({
        request,
        profileId: updatedUser.id,
        remember: true,
        redirectTo: "/",
      });
      return json(updatedUser);
    }
  } else {
    console.log("Invalid profile!");
  }
  return null;
}

function Profiles() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div>
      <ul>
        {data.profiles.map((profile) => (
          <li key={profile.id}>
            <Form method="post">
              <input type="hidden" name="user" value={user.id} />
              <input type="hidden" name="title" value={profile.title || ""} />
              <input type="hidden" name="id" value={profile.id} />
              <Button name="active" value="true">
                {profile.active ? <span>ACTIVE</span> : <span>Activate</span>}
              </Button>
              <span>{profile.title}</span>
            </Form>
          </li>
        ))}
        <li>
          <Form method="post">
            <input type="hidden" name="user" value={user.id} />
            <input type="hidden" name="id" value="0" />
            <input type="text" name="title" />
            <Button name="active">Save</Button>
          </Form>
        </li>
      </ul>
    </div>
  );
}

export default Profiles;
