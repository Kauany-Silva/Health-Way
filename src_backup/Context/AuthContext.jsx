import { createContext, useState, useContext } from "react";

// criação o contexto
const AuthContext = createContext();

// provedor -> fornecedor do contexto
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook para acessar o contexto mais fácil
const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth, AuthContext}
