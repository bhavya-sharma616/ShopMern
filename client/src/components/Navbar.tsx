import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { isAuthenticated } =
    useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  return (
    <nav className="flex justify-between p-4 border-b">
      <Link to="/">Home</Link>
      
      <div className="flex gap-4">
        <Link to ="/cart">Cart</Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile">
              Profile
            </Link>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;