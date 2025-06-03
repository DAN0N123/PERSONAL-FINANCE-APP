import { createContext, useState, ReactNode, useEffect } from "react";

type User = {
  id: number;
  email: string;
  name: string;
};

type UserContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
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
