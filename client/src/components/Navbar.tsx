import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { isAuthenticated } =
    useAppSelector((state) => state.auth);

  const { cartItems } = useAppSelector((state) => state.cart);
  <Link to="/cart">
    Cart ({cartItems.length})
  </Link>
  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

 return (
  <nav className="flex justify-between items-center px-8 py-4 bg-black text-white shadow-md">
    <Link
      to="/"
      className="text-2xl font-bold"
    >
      ShopMern
    </Link>

    <div className="flex gap-5 items-center">
      <Link
        to="/cart"
        className="hover:text-gray-300 transition duration-200"
      >
        Cart ({cartItems.length})
      </Link>

      {!isAuthenticated ? (
        <>
          <Link
            to="/login"
        className="hover:text-gray-300 transition duration-200"
          >
            Login
          </Link>

          <Link
            to="/register"
            className=" hover:text-gray-300 transition duration-200"
          >
            Register
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/profile"
            className="hover:text-gray-300 transition duration-200"          >
            Profile
          </Link>

          <Link
            to="/admin"
            className="hover:text-gray-300 transition duration-200"          >
            Admin
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-gray-800 hover:scale-105 active:scale-95 transition duration-200"
          >
            Logout
          </button>
        </>
      )}
    </div>
  </nav>
);
}

export default Navbar;