import { Link } from "react-router-dom";
import "./navBar.scss";

const Navbar = () => {
  return (
    <div className="wrapperNavBar">
      <div className="navBarContainer">
      <Link to="/">
        <img
          className="navBarLogo"
          src="../../../public/assets/icons/fork-spoon_15730976.png"
          alt="fork and spoon icon"
        ></img>
        </Link>
        <Link to="/shoppinglist">
        <img
          className="navBarLogo"
          src="../../../public/assets/icons/shopping-cart_15550018.png"
          alt="shopping cart icon"
        ></img>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
