import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; 

export const RotasPrivadas = () =>  { 
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; 
// Se o usuário estiver logado, libera as rotas filhas
// se não, vai pro login

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />; // renderiza as rotas filhas
};
