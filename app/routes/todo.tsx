import { useOptionalUser } from "~/utils";

function Todo() {
  const user = useOptionalUser();

  if (!user) {
    return <div>Please log in to use this feature.</div>;
  }
  return <div></div>;
}

export default Todo;
