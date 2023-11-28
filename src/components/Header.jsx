import { BsFillCheckSquareFill } from "react-icons/bs";

function Header() {
  return (
    <header>
      <h1 className="header--heading">TaskMe</h1>
      <div className="header--icon">
        <BsFillCheckSquareFill></BsFillCheckSquareFill>
      </div>
    </header>
  );
}

export default Header;
