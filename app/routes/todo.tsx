import { useMemo } from "react";

import { createCookieSessionStorage } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { getProfileTodos } from "~/models/todo.server";
import { useOptionalProfile, useOptionalUser } from "~/utils";
import { GenericObject } from "~/types/interfaces";
import { todoMap } from "~/maps/todomap";
import TodoContainer from "~/components/todos/todo-container";
import { todoData } from "~/constants/todo-constants";

const { getSession } = createCookieSessionStorage();

export async function loader({ request }: LoaderArgs) {
  const cookie = request.headers.get("cookie");
  const session = await getSession(cookie);
  const profileId = session.get("activeProfile");

  return json({ todos: await getProfileTodos(profileId) });
}

function Todo() {
  const user = useOptionalUser();
  const profile = useOptionalProfile();
  const { todos } = useLoaderData();

  const todoLookup = useMemo(
    () =>
      todos.reduce(
        (acc: GenericObject, cur: GenericObject) => ({
          ...acc,
          [cur.key]: cur,
        }),
        {}
      ),
    [todos]
  );

  if (!user) {
    return <div>Please log in to use this feature.</div>;
  }
  if (!profile)
    return (
      <div>
        <Link to="/profiles">Set up profiles here.</Link>
      </div>
    );
  return (
    <div>
      {todoMap.map((todo, i) => (
        <TodoContainer
          key={`${todo.key}-${i}`}
          {...todoData[todo.key]}
          {...todoLookup[todo.key]}
        />
      ))}
    </div>
  );
}

export default Todo;
