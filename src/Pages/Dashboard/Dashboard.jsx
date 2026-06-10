import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaSyringe,
  FaHome,
  FaHospital,
  FaCalendarCheck,
  FaPills,
  FaPaw,
  FaSignOutAlt,
  FaRegNewspaper
} from "react-icons/fa";
import { useState, useEffect, useRef, useCallback } from "react";

import styles from "./Dashboard.module.css";
import LogoSlogan from "../../Assets/Imagens/Logo.png";

const Dashboard = () => {
  const userStorage = JSON.parse(localStorage.getItem("user") || "null");
  const usuario = userStorage?.name || userStorage?.nome || "Usuário";
  const location = useLocation();
  const estaNaRotaPrincipal = location.pathname === "/dashboard";

  // Estado do carrossel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [carouselItems, setCarouselItems] = useState([]);
  const progressIntervalRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const progressBarRef = useRef(null);

  // Dados das notícias
  const noticias = [
    { id: 1, titulo: "Fiocruz recebe delegação do Inserm e celebra 35 anos de cooperação", fonte: "Fiocruz", data: "08/06/2026", link: "https://campusvirtual.fiocruz.br", imagem: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200", badge: "COOPERACAO" },
    { id: 2, titulo: "InfoGripe: número de casos de SRAG mantém crescimento no país", fonte: "Fiocruz", data: "08/06/2026", link: "https://agencia.fiocruz.br", imagem: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200", badge: "SAUDE" },
    { id: 3, titulo: "Anvisa aprova primeira caneta de semaglutida sintética para diabetes", fonte: "Anvisa", data: "05/06/2026", link: "https://www.gov.br/anvisa", imagem: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1200", badge: "MEDICAMENTOS" }
  ];

  // Acesso rápido
  const quickAccess = [
    { icon: "fa-syringe", title: "Ver Vacinas", desc: "Consulte suas vacinas e carteirinha", link: "vacinacao" },
    { icon: "fa-calendar-alt", title: "Consultar Agendamentos", desc: "Veja seus proximos agendamentos", link: "consultas" },
    { icon: "fa-hospital", title: "Encontrar Hospital", desc: "Encontre unidades perto de voce", link: "hospitais" }
  ];

  const getCurrentMonthCampaign = useCallback(() => {
    const now = new Date();
    const month = now.getMonth();
    
    const campaigns = {
      0: { name: "Janeiro Branco", theme: "Saude Mental", action: "Cuide da mente", icon: "fa-brain", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800", stats: ["CVV: 188", "Terapia e cuidar"] },
      1: { name: "Fevereiro Roxo", theme: "Lupus, Alzheimer e Fibromialgia", action: "Informacao e acolhimento", icon: "fa-ribbon", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800", stats: ["Diagnostico precoce", "Apoio a pacientes"] },
      2: { name: "Marco Azul", theme: "Cancer Colorretal", action: "Prevencao salva vidas", icon: "fa-stethoscope", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800", stats: ["Exame a partir dos 45", "Alimentacao saudavel"] },
      3: { name: "Abril Verde", theme: "Seguranca no Trabalho", action: "Prevencao de acidentes", icon: "fa-hard-hat", image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800", stats: ["EPIs sao essenciais", "Ambiente seguro"] },
      4: { name: "Maio Amarelo", theme: "Transito Seguro", action: "Pare, olhe, cuide", icon: "fa-traffic-light", image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800", stats: ["Cinto de seguranca", "Celular so parado"] },
      5: { name: "Junho Vermelho", theme: "Doacao de Sangue", action: "Doe sangue, doe vida", icon: "fa-droplet", image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800", stats: ["Um doador salva 4 vidas", "Doe regularmente"] },
      6: { name: "Julho Amarelo", theme: "Hepatites Virais", action: "Previna-se, faca o teste", icon: "fa-liver", image: "https://images.unsplash.com/photo-1579154204601-0154f3518e6a?w=800", stats: ["Teste rapido gratuito", "Vacina contra Hepatite B"] },
      7: { name: "Agosto Dourado", theme: "Aleitamento Materno", action: "Amamentacao e amor", icon: "fa-baby-carriage", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800", stats: ["Ate 2 anos ou mais", "Leite materno e ouro"] },
      8: { name: "Setembro Verde", theme: "Doacao de Orgaos", action: "Diga sim a vida", icon: "fa-heart", image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800", stats: ["Converse com sua familia", "Um doador salva ate 10 vidas"] },
      9: { name: "Outubro Rosa", theme: "Prevencao ao Cancer de Mama", action: "Toque, observe, previna", icon: "fa-ribbon", image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800", stats: ["Mamografia anual 40+", "Autoexame mensal"] },
      10: { name: "Novembro Azul", theme: "Saude do Homem", action: "Prevencao do cancer de prostata", icon: "fa-male", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800", stats: ["PSA a partir dos 45", "Check-up anual"] },
      11: { name: "Dezembro Laranja", theme: "Cuidados com a Pele", action: "Proteja-se do sol", icon: "fa-sun", image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800", stats: ["FPS 30+ todo dia", "Chapeu e sombra"] }
    };
    
    return campaigns[month];
  }, []);

  const getSlides = useCallback(() => {
  const monthCampaign = getCurrentMonthCampaign();
  
  return [
    { 
      id: 0, 
      category: "dica", 
      badge: "DICA SAUDAVEL", 
      title: "Beba água regularmente!", 
      desc: "Manter-se hidratado ajuda na disposição, pele saudável e funcionamento dos rins. O ideal é beber 2 litros por dia.", 
      stats: ["70% do corpo é água", "Beba a cada 2h"], 
      image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80", 
      icon: "fa-tint" 
    },
    { 
      id: 1, 
      category: "dica", 
      badge: "DICA SAUDAVEL", 
      title: "Movimente-se!", 
      desc: "30 minutos de atividade física por dia melhoram o humor, previnem doenças e aumentam a qualidade de vida.", 
      stats: ["Reduz risco cardíaco", "Libera endorfina"], 
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80", 
      icon: "fa-walking" 
    },
    { 
      id: 2, 
      category: "dica", 
      badge: "DICA SAUDAVEL", 
      title: "Durma bem!", 
      desc: "Dormir de 7 a 8 horas por noite fortalece o sistema imunológico e melhora a memória e concentração.", 
      stats: ["Melhora cognição", "Fortalece imunidade"], 
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80", 
      icon: "fa-bed" 
    },
    { 
      id: 3, 
      category: "dica", 
      badge: "DICA SAUDAVEL", 
      title: "Alimentação equilibrada", 
      desc: "Inclua frutas, verduras e legumes no dia a dia. Eles fornecem vitaminas essenciais para o bom funcionamento do corpo.", 
      stats: ["5 porções/dia", "Priorize naturais"], 
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80", 
      icon: "fa-apple-alt" 
    },
    { 
      id: 4, 
      category: "vacina", 
      badge: "CAMPANHA NACIONAL", 
      title: "Vacinação contra gripe 2026", 
      desc: "Campanha nacional de vacinação contra influenza está disponível em todos os postos de saúde. Público-alvo: idosos, crianças e gestantes.", 
      stats: ["80% de cobertura", "Até 30/06"], 
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80", 
      icon: "fa-syringe" 
    },
    { 
      id: 5, 
      category: "alerta", 
      badge: "ALERTA EPIDEMIOLÓGICO", 
      title: "Dengue: estado de atenção", 
      desc: "Casos de dengue aumentaram 40% nas últimas semanas. Elimine água parada e use repelente!", 
      stats: ["15 estados em alerta", "Sintomas: febre + dor"], 
      image: "https://picsum.photos/id/204/800/400", 
      icon: "fa-mosquito" 
    },
    { 
      id: 6, 
      category: "evento", 
      badge: "EVENTO GRATUITO", 
      title: "Mutirão de saúde", 
      desc: "Aferição de pressão, testes de glicemia, orientação nutricional e vacinação. Leve documentos!", 
      stats: ["8h às 16h", "Veja o local mais perto"], 
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80", 
      icon: "fa-calendar-check" 
    },
    { 
      id: 7, 
      category: "promocao", 
      badge: "PROMOÇÃO ESPECIAL", 
      title: "Academia com 50% OFF", 
      desc: "Planos de saúde parceiros oferecem desconto em academias. Confira sua operadora e comece a se exercitar!", 
      stats: ["Válido até 30/06", "+100 academias"], 
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", 
      icon: "fa-dumbbell" 
    },
    { 
      id: 8, 
      category: "campanha_mes", 
      badge: `${monthCampaign.name}`, 
      title: `${monthCampaign.theme}`, 
      desc: `${monthCampaign.action}. Participe e compartilhe essa corrente do bem!`, 
      stats: monthCampaign.stats, 
      image: monthCampaign.image, 
      icon: monthCampaign.icon 
    }
  ];
}, [getCurrentMonthCampaign]);

  // Configurar carrossel infinito
  useEffect(() => {
    const originalSlides = getSlides();
    setSlides(originalSlides);
    setCarouselItems([...originalSlides, ...originalSlides]);
  }, [getSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      const next = prev + 1;
      const totalSlides = slides.length;
      
      if (slidesContainerRef.current) {
        slidesContainerRef.current.style.transition = 'transform 0.8s ease-in-out';
        slidesContainerRef.current.style.transform = `translateX(-${next * 100}%)`;
      }
      
      if (next >= totalSlides) {
        setTimeout(() => {
          if (slidesContainerRef.current) {
            slidesContainerRef.current.style.transition = 'none';
            slidesContainerRef.current.style.transform = `translateX(0)`;
            setCurrentSlide(0);
            slidesContainerRef.current.offsetHeight;
            slidesContainerRef.current.style.transition = 'transform 0.8s ease-in-out';
          }
        }, 800);
        return 0;
      }
      
      return next;
    });
    resetAutoPlay();
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    if (index === currentSlide) return;
    setCurrentSlide(index);
    if (slidesContainerRef.current) {
      slidesContainerRef.current.style.transition = 'transform 0.8s ease-in-out';
      slidesContainerRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
    resetAutoPlay();
  }, [currentSlide]);

  const startProgressBar = useCallback(() => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    if (progressBarRef.current) {
      progressBarRef.current.style.width = '0%';
    }
    
    let width = 0;
    progressIntervalRef.current = setInterval(() => {
      if (!isHovering) {
        width += 1;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${width}%`;
        }
        if (width >= 100) {
          clearInterval(progressIntervalRef.current);
          nextSlide();
        }
      }
    }, 70);
  }, [isHovering, nextSlide]);

  const resetAutoPlay = useCallback(() => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    startProgressBar();
  }, [startProgressBar]);

  useEffect(() => {
    if (carouselItems.length > 0) {
      startProgressBar();
    }
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [carouselItems.length, startProgressBar]);

  useEffect(() => {
    if (slidesContainerRef.current && carouselItems.length > 0) {
      slidesContainerRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide, carouselItems.length]);

  const getCategoryClass = (category) => {
    switch(category) {
      case 'dica': return styles.categoryDica;
      case 'vacina': return styles.categoryVacina;
      case 'alerta': return styles.categoryAlerta;
      case 'evento': return styles.categoryEvento;
      case 'promocao': return styles.categoryPromocao;
      case 'campanha_mes': return styles.categoryCampanhaMes;
      default: return '';
    }
  };

  const getActiveDot = (index) => {
    if (slides.length > 0) {
      return currentSlide % slides.length === index;
    }
    return false;
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <h2 className={styles.titulo}>Health Way</h2>
        <nav className={styles.menu}>
          <Link to="/dashboard" className={styles.menuItem}>
            <FaHome className={styles.icon}/> <span className={styles.menuText}>Inicio</span>
          </Link>
          <Link to="vacinacao" className={styles.menuItem}>
            <FaSyringe className={styles.icon}/> <span className={styles.menuText}>Carteira de Vacinacao</span>
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
           <Link to="noticias" className={styles.menuItem}>
            <FaNewspaper className={styles.icon}/> <span className={styles.menuText}>Notícias</span>
          </Link>
          <Link to="/" className={styles.menuItem}>
            <FaSignOutAlt className={styles.icon}/> <span className={styles.menuText}>Sair</span>
          </Link>
        </nav>
      </aside>

      <main className={styles.conteudo}>
        {estaNaRotaPrincipal ? (
          <>
            {/* Hero Section */}
            <section className={styles.hero}>
              <div className={styles.heroContent}>
                <h1>Bem-vindo, {usuario}</h1>
                <p>Acompanhe sua saude aqui</p>
              </div>
            </section>

            {/* Carrossel Infinito */}
            <div className={styles.carouselWrapper}>
              <h2 className={styles.carouselTitle}>
                <i className="fas fa-calendar-alt"></i>
                Destaques do mes
              </h2>
              <div 
                className={styles.carouselContainer}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className={styles.carouselSlides} ref={slidesContainerRef}>
                  {carouselItems.map((slide, index) => (
                    <div 
                      key={`${slide.id}-${index}`} 
                      className={`${styles.carouselSlide} ${getCategoryClass(slide.category)}`}
                    >
                      <div className={styles.slideText}>
                        <span className={styles.slideBadge}>
                          <i className={`fas ${slide.icon}`}></i> {slide.badge}
                        </span>
                        <h3>{slide.title}</h3>
                        <p>{slide.desc}</p>
                        <div className={styles.slideStats}>
                          {slide.stats.map((stat, idx) => (
                            <div key={idx} className={styles.stat}>
                              <i className="fas fa-check-circle"></i> {stat}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div 
                        className={styles.slideImage} 
                        style={{ backgroundImage: `url('${slide.image}')` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className={styles.carouselProgress} ref={progressBarRef}></div>
              </div>
              <div className={styles.carouselDots}>
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`${styles.dot} ${getActiveDot(index) ? styles.dotActive : ''}`}
                    onClick={() => goToSlide(index)}
                  ></div>
                ))}
              </div>
            </div>

            {/* Acesso Rapido - SEM BORDA */}
            <div className={styles.acessoRapidoSection}>
              <h2 className={styles.acessoRapidoTitle}>Acesso rapido</h2>
              <div className={styles.quickGrid}>
                {quickAccess.map((item, index) => (
                  <Link key={index} to={item.link} className={styles.quickCard}>
                    <div className={styles.icon}><i className={`fas ${item.icon}`}></i></div>
                    <div className={styles.text}>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                    <div className={styles.arrow}><i className="fas fa-arrow-right"></i></div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Em Destaque - Noticias SEM BORDA */}
            <div className={styles.noticiasSection}>
              <div className={styles.noticiasHeader}>
                <h2>Em destaque</h2>
                <a href="#" onClick={(e) => e.preventDefault()}>Ver todas as noticias →</a>
              </div>
              <div className={styles.newsGrid}>
                {noticias.map(noticia => (
                  <a 
                    key={noticia.id}
                    href={noticia.link}
                    className={styles.newsCard}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={noticia.imagem} loading="lazy" alt={noticia.titulo} />
                    <div className={styles.newsContent}>
                      <span className={styles.badge}>{noticia.badge}</span>
                      <h3>{noticia.titulo}</h3>
                      <div className={styles.newsFooter}>
                        <span>{noticia.fonte}</span>
                        <span>{noticia.data}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

           {/* FAIXA DE INFORMAÇÕES COM ÍCONES SVG - DADOS ORIGINAIS */}
<div className={styles.infoFooter}>
  <div className={styles.infoContainer}>
    <div className={styles.infoItem}>
      <div className={styles.infoIcon}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>
      <div className={styles.infoText}>
        <h4>Próximo agendamento</h4>
        <p>Consulta clínica geral - <strong>22/05/2026 às 09:00</strong></p>
      </div>
    </div>

    <div className={styles.infoItem}>
      <div className={styles.infoIcon}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 11 12 2 21 11 18 11 18 22 6 22 6 11 3 11"/>
        </svg>
      </div>
      <div className={styles.infoText}>
        <h4>Carteirinha de vacinação</h4>
        <p>Atualizada - <strong>Última atualização: 10/05/2026</strong></p>
      </div>
    </div>

    <div className={styles.infoItem}>
      <div className={styles.infoIcon}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8v4l3 3M12 22C7 22 3 18 3 13V6l9-4 9 4v7c0 5-4 9-9 9z"/>
        </svg>
      </div>
      <div className={styles.infoText}>
        <h4>Hospital mais próximo</h4>
        <p><strong>Hospital das Clínicas</strong> - 1,2 km de distância</p>
      </div>
    </div>

    <div className={styles.infoItem}>
      <div className={styles.infoIcon}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
          <line x1="12" y1="18" x2="12" y2="18"/>
        </svg>
      </div>
      <div className={styles.infoText}>
        <h4>Emergência</h4>
        <p>Ligue <strong>192</strong> - SAMU 24h</p>
      </div>
    </div>
  </div>
</div>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export { Dashboard };