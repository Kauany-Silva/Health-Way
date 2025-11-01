import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context";

export const RotasPrivadas = () => {
  const { user } = useAuth();

  // Se o usuário estiver logado, libera as rotas filhas
  // se não, vai pro login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
