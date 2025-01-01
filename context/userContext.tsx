// userContext.ts
import { createContext, useContext, useState } from "react";
import { User } from "firebase/auth"; // Import the User type from firebase/auth

// Define the context type to allow user to be either a User or null
interface UserContextType {
  user: User | null; // user can be null if no one is logged in
  setUser: (user: User | null) => void; // setUser can accept both User and null
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Initialize state as null

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
