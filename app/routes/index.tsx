import { Form, useActionData } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";

export const action: ActionFunction = async ({ request }) => {
  return json({
    body: Object.fromEntries(await request.formData()),
  });
};

export default function Index() {
  let data = useActionData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
      <Form reloadDocument method="post">
        <button name="hello" value="world" type="submit">
          TEST!
        </button>
      </Form>
    </div>
  );
}
