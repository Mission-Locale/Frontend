import { createContext, useState, useEffect } from "react";
import {
  loginUser as apiLogin,
  logoutUser as apiLogout,
  getUserProfile,
} from "@/utils/api";
import {
  getToken,
  clearUserSession,
  getUserRole,
} from "@/utils/storage";

const AuthContext = createContext(null);

export { AuthContext };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    async function checkAuth() {
      const token = getToken();

      if (token) {
        // Récupérer les données utilisateur depuis l'API
        try {
          const userData = await getUserProfile();
          if (userData) {
            const role = getUserRole();
            setUser({
              email: userData.email,
              firstName: userData.first_name,
              lastName: userData.last_name,
              role,
            });
            setIsAuthenticated(true);
          } else {
            clearUserSession();
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch {
          clearUserSession();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    }

    checkAuth();
  }, []);

  async function login(credentials) {

    clearUserSession();
    setUser(null);
    
    const userData = await apiLogin(credentials);
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  }

  async function logout() {
    try {
      await apiLogout();
    } catch (error) {
      console.error(error);
    } finally {
      clearUserSession();
      setUser(null);
      setIsAuthenticated(false);
    }
  }

  async function refreshUser() {
    try {
      const userData = await getUserProfile();
      if (userData) {
        const role = getUserRole();
        const user = {
          email: userData.email,
          firstName: userData.first_name,
          lastName: userData.last_name,
          role,
        };
        setUser(user);
        setIsAuthenticated(true);
        return user;
      } else {
        clearUserSession();
        setUser(null);
        setIsAuthenticated(false);
        return null;
      }
    } catch {
      clearUserSession();
      setUser(null);
      setIsAuthenticated(false);
      return null;
    }
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
