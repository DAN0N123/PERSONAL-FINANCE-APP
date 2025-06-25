import { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "../../types/User";

type ContextUser = Pick<User, "id" | "email" | "name">;

type UserContextType = {
  user: ContextUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<ContextUser | undefined>>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

type Props = {
  children: ReactNode;
};

export default function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<User | undefined>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : undefined;
  });

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch("http://localhost:3000/user/getUser", {
        credentials: "include",
      });
      const result = await response.json();
      if (!result.ok) {
        setUser(undefined);
        localStorage.setItem("user", "");
      } else {
        setUser(result.result);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
