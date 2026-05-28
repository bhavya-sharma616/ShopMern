import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import API from "../api/axios";

const ProfilePage = () => {
  const [user, setUser] =
    useState<any>(null);

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

  return (
    <div className="mt-20 text-center">
      <h1 className="text-3xl font-bold">
        Profile
      </h1>

      {user && (
        <div className="mt-5">
          <p>Name: {user.name}</p>

          <p>Email: {user.email}</p>

          <p>Role: {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;