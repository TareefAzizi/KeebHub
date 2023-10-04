import { createContext, useState } from "react";
const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [msg, setMsg] = useState("Hello World");
  return <UserContext.Provider value={msg}>{children}</UserContext.Provider>;
}
