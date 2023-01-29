import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import PlannerContext from "./context/planner-context";

import type { GenericObject } from "./types/interfaces";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import Header from "./components/header";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  const [saveData, setSaveData] = useState<GenericObject>({
    dupes: [],
    worlds: [],
  });

  return (
    <PlannerContext.Provider value={{ saveData, setSaveData }}>
      <html lang="en" className="h-full">
        <head>
          <Meta />
          <Links />
        </head>
        <body className="h-full bg-black text-blue-gray">
          <Header />
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </PlannerContext.Provider>
  );
}
