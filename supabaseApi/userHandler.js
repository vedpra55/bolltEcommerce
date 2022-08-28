import toast from "react-hot-toast";
import { supabase } from "../lib/supabase-client";

export async function LoginHandler() {
  const { user, session, error } = supabase.auth.signIn(
    {
      provider: "google",
    },
    {
      redirectTo: "http://localhost:3000/profile",
    }
  );

  if (error) toast.error(error);
}

export async function LogoutHandler() {
  await supabase.auth.signOut();
  toast.success("You Logout  Sucessfully");
}

export function listenUserStateChange(setUser) {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event == "SIGNED_OUT") {
      setUser(null);
    }
    if (event === "SIGNED_IN") {
      const userProfile = await getUserFromProfiles(session.user.id);
      setUser(userProfile);
    }
  });
}

export function getUserSession() {
  const user = supabase.auth.user();
  return user;
}

export async function getUserFromProfiles(id) {
  if (!id) return null;
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", id)
    .single();

  if (error) toast.error(error);
  return data;
}

export async function updateUserProfile(userInfo, user, id, setUser) {
  const { data, error } = await supabase
    .from("profile")
    .update({
      email: userInfo.email ? userInfo.email : user?.email,
      name: userInfo.name ? userInfo.name : user?.name,
      phoneNo: userInfo.phoneNo ? userInfo.phoneNo : user?.phoneNo,
      address: userInfo.address ? userInfo.address : user?.address,
    })
    .eq("id", id);

  if (error) toast.error(error.message);
  console.log(data);
  setUser(data[0]);
  toast.success("Profile updated sucessfully");
}

export function listenToProfile(id) {
  supabase.from(`profile:id=eq.${id}`).on("UPDATE", (payload) => {
    console.log(payload.new);
  });
}
