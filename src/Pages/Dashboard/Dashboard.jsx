import { Link, Outlet, useLocation } from "react-router-dom";
import { FaSyringe, FaHome, FaHospital, FaCalendarCheck, FaPills, FaPaw, FaSignOutAlt } from "react-icons/fa";
import styles from "./Dashboard.module.css";
import LogoSlogan from "../../Assets/Imagens/Logo-HealthWay-Slogan.png";

const Dashboard = () => {
  const usuario = localStorage.getItem("usuario");
  const location = useLocation();

  // Verifica se está exatamente na rota /dashboard
  const estaNaRotaPrincipal = location.pathname === "/dashboard";

  return (
    <div className={styles.dashboard}>
      {/* Menu lateral */}
      <aside className={styles.sidebar}>
        <h2 className={styles.titulo}>Health Way</h2>

        <nav className={styles.menu}>
          <Link to="/dashboard" className={styles.menuItem}>
            <FaHome /> Início
          </Link>

          <Link to="vacinacao" className={styles.menuItem}>
            <FaSyringe /> Carteira de Vacinação
          </Link>

          <Link to="hospitais" className={styles.menuItem}>
            <FaHospital /> Localizar Hospitais
          </Link>

          <Link to="consultas" className={styles.menuItem}>
            <FaCalendarCheck /> Consultas
          </Link>

          <Link to="medicamentos" className={styles.menuItem}>
            <FaPills /> Medicamentos
          </Link>

          <Link to="pets" className={styles.menuItem}>
            <FaPaw /> Pets
          </Link>

          <Link to="/" className={styles.menuItem}>
            <FaSignOutAlt/> Sair
          </Link>
        </nav>
      </aside>

      {/* Área principal */}
      <main className={styles.conteudo}>
        {estaNaRotaPrincipal ? (
          <div>
            <h1 className={styles.nomeUsuario}>Bem-vindo, {usuario}!</h1>

            <div className={styles.LogoSlogan}>
              <img src={LogoSlogan} alt="Logo Health Way" />
            </div>
          </div>
        ) : (
          <Outlet /> // Renderiza as páginas filhas
        )}
      </main>
    </div>
  );
};

export { Dashboard };
