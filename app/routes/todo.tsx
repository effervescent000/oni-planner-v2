import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

function Todo() {
  const user = useOptionalUser();

  if (!user) {
    return <div>Please log in to use this feature.</div>;
  }
  return (
    <div>
      <Link to="/profiles">Set up profiles here.</Link>
    </div>
  );
}

export default Todo;
