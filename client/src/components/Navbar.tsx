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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="
        max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        h-16
        flex items-center justify-between
      ">
        <Link to="/">
          <h1 className="
              text-2xl font-extrabold
              tracking-tight
              bg-gradient-to-r
              from-black to-slate-600
              bg-clip-text text-transparent
            "
          >
            ShopMERN
          </h1>
        </Link>

        <div className="flex gap-5 items-center">
          <Link
            to="/cart"
            className="
              relative font-medium
             text-slate-600
             hover:text-black
             transition duration-200
            after:absolute
            after:left-0
            after:-bottom-1
            after:h-[2px]
            after:w-0
           after:bg-black
            after:transition-all
            hover:after:w-full
          "    
        >
            Cart 
            <span className="
              absolute -top-2 -right-3
             bg-black text-white
              text-xs font-bold
              w-5 h-5 rounded-full
              flex items-center justify-center
            "
            >
              {cartItems.length}
            </span>
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="
  relative font-medium
  text-slate-600
  hover:text-black
  transition duration-200

  after:absolute
  after:left-0
  after:-bottom-1
  after:h-[2px]
  after:w-0
  after:bg-black
  after:transition-all
  hover:after:w-full
"         >
                Login
              </Link>

              <Link
                to="/register"
                className="
  relative font-medium
  text-slate-600
  hover:text-black
  transition duration-200

  after:absolute
  after:left-0
  after:-bottom-1
  after:h-[2px]
  after:w-0
  after:bg-black
  after:transition-all
  hover:after:w-full
"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="
  relative font-medium
  text-slate-600
  hover:text-black
  transition duration-200

  after:absolute
  after:left-0
  after:-bottom-1
  after:h-[2px]
  after:w-0
  after:bg-black
  after:transition-all
  hover:after:w-full
"        >
                Profile
              </Link>

              <Link
                to="/admin"
                className="
  relative font-medium
  text-slate-600
  hover:text-black
  transition duration-200

  after:absolute
  after:left-0
  after:-bottom-1
  after:h-[2px]
  after:w-0
  after:bg-black
  after:transition-all
  hover:after:w-full
"        >
                Admin
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 hover:scale-105 active:scale-95 transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;