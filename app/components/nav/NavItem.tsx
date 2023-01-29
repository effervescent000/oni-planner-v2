import { Link } from "@remix-run/react";

function NavItem({ route, title }: { route: string; title: string }) {
  return (
    <div>
      <Link to={`/${route}`}>{title}</Link>
    </div>
  );
}

export default NavItem;
