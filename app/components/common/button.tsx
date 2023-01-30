import type { GenericObject } from "~/types/interfaces";

function Button({
  type = "submit",
  name = "",
  value = "",
  children,
}: GenericObject) {
  return (
    <button
      className="rounded-sm bg-blue-gray p-1 text-dark-gray"
      name={name}
      value={value}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
