import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { setCredentials } from "../features/auth/authSlice";
import API from "../api/axios";
import type { User } from "../types/auth.types";

const ProfilePage = () => {

  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);

  const { cartItems } =
    useAppSelector(
      (state) => state.cart
    );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(
          "/auth/profile"
        );

        setUser(res.data.user);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const [editing, setEditing] =
    useState(false);

  const [name, setName] =
    useState(user?.name || "");

  const [email, setEmail] =
    useState(user?.email || "");

  const [password, setPassword] =
    useState("");

  const dispatch = useAppDispatch();
  const handleUpdateProfile =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();
      try {
        const updatedData: Partial<User> & { password?: string } = {
          name,
          email
        };

        if (password.trim()) {
          updatedData.password =
            password;
        }

        const { data } =
          await API.put(
            "/users/profile",
            updatedData
          );

        setUser(data.user);

        dispatch(
          setCredentials({
            user: data.user,
            token:
              localStorage.getItem(
                "token"
              ),
          })
        );

        toast.success(
          "Profile updated"
        );

        setEditing(false);
      } catch (error) {
        toast.error(
          "Update failed"
        );
      }
    };
  return (
    <div className="min-h-[80vh] bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div
          className="
          bg-white rounded-2xl shadow-md
          p-8 flex flex-col md:flex-row
          items-center justify-between
          gap-6
        "
        >
          <div className="flex items-center gap-6">
            <div
              className="
              w-24 h-24 rounded-full
              bg-black text-white
              flex items-center justify-center
              text-4xl font-bold
            "
            >
              {user?.name?.charAt(0)}
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                {user?.name}
              </h1>

              <p className="text-slate-500 mt-2">
                {user?.email}
              </p>
              <br />

              {user?.role === "admin" ? (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full">
                  Admin
                </span>
              ) : (
                <span className="bg-black text-white px-3 py-1 rounded-full">
                  User
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-5">
            <div
              className="
              bg-slate-100 rounded-xl
              px-6 py-4 text-center
            "
            >
              <p className="text-slate-500">
                Cart Items
              </p>

              <h2 className="text-2xl
                  md:text-3xl
                  font-semibold
                  tracking-tight
                  text-slate-900">
                {cartItems.length ?? 0}
              </h2>
            </div>
            <div
              className="
              bg-slate-100 rounded-xl
              px-6 py-4 text-center
            "
            >
              <p className="text-slate-500">
                Reviews
              </p>

              <h2 className="text-2xl
                  md:text-3xl
                  font-semibold
                  tracking-tight
                  text-slate-900">
                0
              </h2>
            </div>
          </div>
        </div>

        <div
          className="
          mt-8 bg-white rounded-2xl
          shadow-md p-8
        "
        >
          <h2 className="text-2xl font-bold mb-6">
            Account Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-500">
                Full Name
              </p>

              <p className="text-lg font-semibold mt-1">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="text-slate-500">
                Email Address
              </p>

              <p className="text-lg font-semibold mt-1">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-slate-500">
                Account Type
              </p>

              <p className="text-lg font-semibold mt-1 capitalize">
                {user?.role}
              </p>
            </div>

            <div>
              <p className="text-slate-500">
                Status
              </p>

              <p className="text-green-600 font-semibold mt-1">
                Active
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() =>
            setEditing(true)
          }
          className="
              mt-6 bg-black text-white
              px-6 py-3 rounded-lg
             hover:bg-slate-800
              hover:scale-105
              active:scale-95
              transition duration-200
            "
        >
          Edit Profile
        </button>
      </div>
      {editing && (
        <div
          className="
            fixed inset-0 bg-black/50
            flex items-center justify-center
            z-50
          "
        >
          <form
            onSubmit={
              handleUpdateProfile
            }
            className="
             bg-white rounded-2xl
              p-8 w-full max-w-md
              flex flex-col gap-4
            "
          >
            <h2 className="text-2xl font-bold mb-2">
              Edit Profile
            </h2>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Name"
              className="
                border p-3 rounded
                focus:outline-none
                focus:ring-2
               focus:ring-black
              "
            />
            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Email"
              className="
                border p-3 rounded
                focus:outline-none
                focus:ring-2
               focus:ring-black
              "
            />
            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="New Password"
              className="
                border p-3 rounded
                focus:outline-none
                focus:ring-2
               focus:ring-black
              "
            />

            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                className="
                  flex-1 bg-black text-white
                  py-3 rounded-lg
                 hover:bg-slate-800
                  transition
                  "
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() =>
                  setEditing(false)
                }
                className="
                  flex-1 border
                  py-3 rounded-lg
                   hover:bg-slate-100
                  transition
                "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;