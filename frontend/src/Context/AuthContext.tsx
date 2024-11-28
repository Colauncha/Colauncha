import { createContext,useContext,useState,ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout:() => void;
  setIsAuthenticated: (value: boolean) => void;
  token: string | null;
  setToken: (value: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  setIsAuthenticated: () => {},
  token: null,
  setToken: () => {}
  
});



// const AuthContext = createContext({isAuthenticated: false });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const login = () => {
      setIsAuthenticated(true);
  };

  const logout = () => {
      setIsAuthenticated(false);
      setToken(null);
  };

  return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout, setIsAuthenticated, token, setToken }}>
          {children}
      </AuthContext.Provider>
  );
};




  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };