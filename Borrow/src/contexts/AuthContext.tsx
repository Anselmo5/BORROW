import { createContext, useEffect, useState } from "react";
import { loginService } from "../services/auth";
import { getToken, getUser, removeToken, removeUser, saveToken, saveUser } from "../utils/storage";
import type { User } from "../types/user";

interface AuthContextData {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const storedToken = getToken();

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const storedUser = getUser();
        if (!storedUser) throw new Error("Perfil não encontrado");
        setToken(storedToken);
        setUser(storedUser);
      } catch {
        removeToken();
        removeUser();
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(email: string, password: string) {
    const response = await loginService({
      email,
      password,
    });

    saveToken(response.token);
    setToken(response.token);

    setUser(response.user);
    saveUser(response.user);
  }

  function logout() {
    removeToken();
    removeUser();
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}