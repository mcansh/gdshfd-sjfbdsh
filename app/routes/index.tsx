import type { LoaderFunction, ActionFunction } from "@remix-run/server-runtime";
import { Form, useLoaderData } from "@remix-run/react";

let projectName: string | null = null;

export const loader: LoaderFunction = async () => {
  return { name: projectName ?? "Create a Project Name" };
};

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();

  console.log("body", Object.fromEntries(body));
  projectName = body.get("projectName") as string;
  console.log("projectName pulled from form data", projectName);
  console.log(`request body is used ${request.bodyUsed}`);

  console.log("action ran");

  return new Response("");
};

export default function Index() {
  let project = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix {project.name}</h1>
      <Form reloadDocument method="post">
        <label>
          Project Name
          <input name="projectName" />
        </label>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
