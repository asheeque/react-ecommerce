import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutAuthUser } from "../../utils/firebase/firebase.utils";
import CategoryItem from "../../components/category-item/category-item.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  // const signOutHandler = async() => {
  //   await signOutAuthUser();
  //   setCurrentUser(null)
  // };
  const { isCartOpen} = useContext(CartContext)
  console.log(currentUser);
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutAuthUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon/>
        </div>
        {
          isCartOpen && <CartDropdown/>
        }
       
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
