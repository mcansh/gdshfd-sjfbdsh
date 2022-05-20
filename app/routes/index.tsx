import type { LoaderFunction, ActionFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { Form, useLoaderData } from "@remix-run/react";
import { createCookie } from "@remix-run/netlify-edge";

let cookie = createCookie("projectName", {
  httpOnly: true,
  expires: new Date(Date.now() + 60_000),
});

export const loader: LoaderFunction = async ({ request }) => {
  let projectName = await cookie.parse(request.headers.get("Cookie"));

  return {
    name: projectName ?? "Create a Project Name",
    notes: ["remix is great", "so is deno"],
  };
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  let projectName = body.get("projectName") as string;

  return redirect("/", {
    headers: {
      "Set-Cookie": await cookie.serialize(projectName),
    },
  });
};

export default function Index() {
  let data = useLoaderData();

  return (
    <div>
      <h1>Welcome to Remix {data.name}</h1>
      <Form reloadDocument method="post">
        <label>
          Project Name
          <input name="projectName" />
        </label>
        <button type="submit">Submit</button>
      </Form>

      {data.notes.map((note: string) => (
        <p key={note}>{note}</p>
      ))}
    </div>
  );
}
