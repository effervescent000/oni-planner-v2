import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";

import { prisma } from "~/db.server";
import type { IUserProfile } from "~/types/interfaces";
import { profileIsValid, useUser } from "~/utils";

export async function loader() {
  return json({ profiles: await prisma.userProfile.findMany() });
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
      await prisma.userProfile.updateMany({
        data: { active: false },
      });
    }
    await prisma.userProfile.upsert({
      where: { id: +values.id },
      update: {
        active: values.active,
      },
      create: {
        userId: body.get("user") as string,
        title: values.title,
        active: values.active,
      },
    });
  }
  return null;
}

function Profiles() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();
  const submit = useSubmit();

  function handleChange(event) {
    submit(event.currentTarget);
  }
  return (
    <div>
      <ul>
        {data.profiles.map((profile) => (
          <li key={profile.id}>
            <Form method="post" onChange={handleChange}>
              <input type="hidden" name="user" value={user.id} />
              <input type="hidden" name="title" value={profile.title || ""} />
              <input type="hidden" name="id" value={profile.id} />
              <input
                type="radio"
                name="active"
                id={`radio-${profile.id}`}
              />{" "}
              <span>{profile.title}</span>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profiles;
