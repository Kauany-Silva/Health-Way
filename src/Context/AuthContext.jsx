import { createContext, useState, useContext } from "react";

// criação do contexto
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

// hook para acessar o contexto mais facilmente
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth, AuthContext };
