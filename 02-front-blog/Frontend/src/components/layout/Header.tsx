import logo from "../../assets/react.svg";
import Nav from "./Nav";

const Header = () => {
  return (
    <>
      <header className="flex flex-row flex-wrap basis-1/4">
        <div className="flex flex-row flex-wrap bg-base-300 text-white p-7 shadow-2xs basis-1/4">
          <img src={logo} alt="Logo" />
          <p className="ml-2 text-3xl text-shadow-2xs">El Pulso del Futbol</p>
        </div>
        <Nav />
      </header>
    </>
  );
};

export default Header;
