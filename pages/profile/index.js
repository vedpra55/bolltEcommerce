import ProfileLogedInContainer from "../../components/profile/profileLogedInContainer";
import CompleteProfile from "../../components/profile/completeProfile";

import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import Image from "next/image";

export default function ProfilePage() {
  const { Login, Logout, user, setUser, sessionUser } = useAuth();

  useEffect(() => {}, [user]);

  return user?.email ? (
    <ProfileLogedInContainer setUser={setUser} Logout={Logout} user={user} />
  ) : user && !user.email ? (
    <CompleteProfile sessionUser={sessionUser} setUser={setUser} />
  ) : (
    <div className="flex items-center justify-center h-96">
      <button
        onClick={Login}
        className="relative w-48 h-20 hover:scale-110 transition-transform"
      >
        <Image src="/googleBtn.png" className=" object-contain" layout="fill" />
      </button>
    </div>
  );
}
