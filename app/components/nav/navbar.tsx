import routeMap from "~/routemap";
import NavItem from "./navItem";

function Navbar() {
  return (
    <div className="flex justify-start gap-5 text-xl">
      {routeMap.map((route, index) => (
        <NavItem key={index} {...route} />
      ))}
    </div>
  );
}

export default Navbar;
