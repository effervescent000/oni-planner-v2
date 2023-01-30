import { Form } from "@remix-run/react";

export default function TodoContainer({
  key,
  checked,
  label,
}: {
  key: string;
  checked: boolean;
  label: string;
}) {
  return (
    <div>
      <Form>
        <input type="hidden" name="key" value={key} />
        <input type="checkbox" defaultChecked={checked} />
        {label}
      </Form>
    </div>
  );
}
