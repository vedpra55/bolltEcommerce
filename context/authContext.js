import { useEffect, useState, useContext, createContext } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { supabase } from "../lib/supabase-client";

import {
  LoginHandler,
  LogoutHandler,
  getUserSession,
} from "../supabaseApi/userHandler";

const AuthContext = createContext();

export function AuthStateContext({ children }) {
  const [user, setUser] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);

  function Login() {
    LoginHandler();
  }

  function Logout() {
    LogoutHandler();
    setUser(null);
    toast.success("Log out sucessfully");
  }

  const userFetcher = async () => {
    const res = await fetch(
      `http://localhost:3000/api/userApi?id=${sessionUser.id}`
    );
    const data = res.json();
    return data;
  };

  const { data: userRes, error } = useSWR(
    sessionUser ? sessionUser.id : null,
    userFetcher
  );

  if (error) toast.error("Something goes wrong please refresh the page");

  useEffect(() => {
    const userSession = supabase.auth.user();
    console.log(userSession);
    setSessionUser(userSession);
    window.addEventListener("hashchange", function () {
      const userSession = getUserSession();
      setSessionUser(userSession);
      toast.success("You loged in sucessfully");
    });
  }, []);

  useEffect(() => {
    setUser(userRes?.data);
  }, [userRes]);

  return (
    <AuthContext.Provider value={{ Login, Logout, user, setUser, sessionUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
