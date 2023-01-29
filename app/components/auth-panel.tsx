import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

const AuthPanel = () => {
  const user = useOptionalUser();
  return (
    <div>
      {user ? (
        <Link
          to="/logout"
          className="border-transparent hover:bg-yellow-50 flex items-center justify-center rounded-md border px-2 pb-1 text-base font-medium shadow-sm"
        >
          Logout
        </Link>
      ) : (
        <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
          <Link
            to="/join"
            className="border-transparent bg-white text-yellow-700 hover:bg-yellow-50 flex items-center justify-center rounded-md border px-4 py-3 text-base font-medium shadow-sm sm:px-8"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="bg-yellow-500 text-white hover:bg-yellow-600 flex items-center justify-center rounded-md px-4 py-3 font-medium"
          >
            Log In
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthPanel;
