import Navbar from "./nav/navbar";

function Header() {
  return (
    <div className="flex justify-between bg-dark-gray px-4 pt-4 pb-1">
      <Navbar />
    </div>
  );
}

export default Header;
