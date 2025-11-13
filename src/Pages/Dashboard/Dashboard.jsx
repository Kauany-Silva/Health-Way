import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaSyringe,
  FaHome,
  FaHospital,
  FaCalendarCheck,
  FaPills,
  FaPaw,
  FaSignOutAlt,
} from "react-icons/fa";

import styles from "./Dashboard.module.css";

import LogoSlogan from "../../Assets/Imagens/Logo.png";
import MedicaVacinacao from "../../Assets/Imagens/MedicaVacinacao.jpg";
import MosquitoDengue from "../../Assets/Imagens/MosquitoDengue.jpg";
import AtividadeFisica from "../../Assets/Imagens/AtividadeFisica.jpg";

const Dashboard = () => {
  const userStorage = JSON.parse(localStorage.getItem("user") || "null");
  const usuario = userStorage?.name || userStorage?.nome || "Usuário";

  const location = useLocation();
  const estaNaRotaPrincipal = location.pathname === "/dashboard";

  const noticiasSaude = [
    {
      titulo: "Campanha Nacional de Vacinação 2025 começa este mês",
      fonte: "Governo Brasil",
      link: "https://www.gov.br/saude/pt-br",
      img: MedicaVacinacao,
    },
    {
      titulo: "OMS alerta para aumento de casos de dengue no Brasil",
      fonte: "Organização Mundial da Saúde",
      link: "https://www.who.int/pt",
      img: MosquitoDengue,
    },
    {
      titulo: "Nova pesquisa indica benefícios da atividade física leve diária",
      fonte: "Governo Brasil",
      link: "https://saude.gov.br",
      img: AtividadeFisica,
    },
  ];

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <h2 className={styles.titulo}>Health Way</h2>
        <nav className={styles.menu}>
          <Link to="/dashboard" className={styles.menuItem}>
            <FaHome className={styles.icon}/> <span className={styles.menuText}>Início</span>
          </Link>
          <Link to="vacinacao" className={styles.menuItem}>
            <FaSyringe className={styles.icon}/> <span className={styles.menuText}>Carteira de Vacinação</span>
          </Link>
          <Link to="hospitais" className={styles.menuItem}>
            <FaHospital className={styles.icon}/> <span className={styles.menuText}>Localizar Hospitais</span>
          </Link>
          <Link to="consultas" className={styles.menuItem}>
            <FaCalendarCheck className={styles.icon}/> <span className={styles.menuText}>Consultas</span>
          </Link>
          <Link to="medicamentos" className={styles.menuItem}>
            <FaPills className={styles.icon}/> <span className={styles.menuText}>Medicamentos</span>
          </Link>
          <Link to="pets" className={styles.menuItem}>
            <FaPaw className={styles.icon}/> <span className={styles.menuText}>Pets</span>
          </Link>
          <Link to="/" className={styles.menuItem}>
            <FaSignOutAlt className={styles.icon}/> <span className={styles.menuText}>Sair</span>
          </Link>
        </nav>
      </aside>

      <main className={styles.conteudo}>
        {estaNaRotaPrincipal ? (
          <>
            <header className={styles.headerRow}>
              <div className={styles.bemVindo}>
                <h1 className={styles.nomeUsuario}>Bem-vindo, {usuario} 👋</h1>
                <p className={styles.subtitulo}>Acompanhe sua saúde aqui</p>
              </div>
              <div className={styles.logoWrapper}>
                <img
                  src={LogoSlogan}
                  alt="Logo Health Way"
                  className={styles.logoDashboard}
                />
              </div>
            </header>

            <section className={styles.mainGrid}>
              <div className={styles.cardPanel}>
                <h2>Acesso rápido</h2>
                <div className={styles.cardsContainer}>
                  <Link to="vacinacao" className={styles.card}>
                    <FaSyringe /> Ver Vacinas
                  </Link>
                  <Link to="consultas" className={styles.card}>
                    <FaCalendarCheck /> Consultar Agendamentos
                  </Link>
                  <Link to="hospitais" className={styles.card}>
                    <FaHospital /> Encontrar Hospital
                  </Link>
                </div>
              </div>
            </section>

            <section className={styles.CarrosselNoticias}>
              <h2>Em destaque 🩺</h2>
              <div className={styles.carouselContainer}>
                {noticiasSaude.map((noticia, index) => (
                  <a
                    key={index}
                    href={noticia.link}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.newsCard}
                  >
                    <img src={noticia.img} alt={noticia.titulo} />
                    <div className={styles.newsOverlay}>
                      <span className={styles.newsCategory}>SAÚDE</span>
                      <h3 className={styles.newsTitle}>{noticia.titulo}</h3>
                      <p className={styles.newsFonte}>{noticia.fonte}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export { Dashboard };