import { createContext, useContext, useState, ReactNode } from "react";
import { API_BASE_URL } from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("kalpvan_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) return false;
      const data = await res.json();
      const userData: User = { id: data._id, name: data.name, email: data.email, role: data.role };
      setUser(userData);
      localStorage.setItem("kalpvan_user", JSON.stringify(userData));
      localStorage.setItem("kalpvan_token", data.token);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      if (!res.ok) return false;
      const data = await res.json();
      const userData: User = { id: data._id, name: data.name, email: data.email, role: data.role ?? "user" };
      setUser(userData);
      localStorage.setItem("kalpvan_user", JSON.stringify(userData));
      localStorage.setItem("kalpvan_token", data.token);
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kalpvan_user");
    localStorage.removeItem("kalpvan_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
