import { Link } from "react-router-dom";
import styles from "./SaibaMaisSobreNos.module.css";

import Kauany from "../../Assets/Imagens/Kauany.jpg";
import Livia from "../../Assets/Imagens/Livia.jpg";
import Maria from "../../Assets/Imagens/Maria.jpg";
import Yasmin from "../../Assets/Imagens/Yasmin.jpg";

const SaibaMaisSobreNos = () => {
  return (
    <section className={styles.saibaMais}>
      <div className={styles.container}>
        <h3 className={styles.subtitulo}>Nossa História</h3>
        <h1 className={styles.titulo}>Conheça Melhor o Time Health Way</h1>
        <p className={styles.descricao}>
          Nosso objetivo com o <span>Health Way</span> surgiu de conversas entre o grupo, quando percebemos que muitas pessoas não possuem mais suas carteiras de vacinação físicas. Essa falta de organização e acesso aos registros de saúde acaba privando-as de diversos serviços e cuidados importantes. Além disso, notamos que a ausência de tecnologia para gerenciar horários de medicamentos e históricos de consultas gera muitos problemas na rotina de quem precisa acompanhar sua saúde de forma prática.
        </p>
        <p className={styles.descricao}>Para colocar nosso projeto em prática, decidimos criar uma solução que centralize todas essas informações em um único lugar de fácil acesso. Assim, os usuários podem consultar vacinas, exames e horários de medicação de forma simples e organizada. Nosso foco foi unir praticidade e tecnologia, oferecendo uma ferramenta que realmente facilite o cuidado com a saúde no dia a dia.</p>

        <div className={styles.integrantes}>
          <div className={styles.pessoa}>
            <img src={Kauany} alt="Kauany" />
            <h4>Kauany Silva</h4>
            <p>Líder do grupo, organiza e coordena o time para que tudo funcione bem. Gosta de trabalhar na base dos códigos, pretende cursar Análise e Desenvolvimento de Sistema e Engenharia de Software. Competitiva, gosta de esportes e de se envolver em projetos diferentes que desafiem suas habilidades.</p>
          </div>
          <div className={styles.pessoa}>
            <img src={Livia} alt="Livia" />
            <h4>Livia Paiva</h4>
            <p>Gosta muito de esportes e pretende cursar Análise e Desenvolvimento de Sistemas e Engenharia de Software. Ela se interessa bastante pela parte de Banco de Dados e ajuda o grupo pesquisando informações, trazendo inspirações e organizando a documentação do projeto.</p>
          </div>
          <div className={styles.pessoa}>
            <img src={Maria} alt="Maria" />
            <h4>Maria Julia </h4>
            <p>Atua na área de design, com foco em experiência do usuário. Trabalha principalmente no CSS, garantindo que o site seja intuitivo, visualmente atraente e envolvente. Gosta de explorar soluções criativas e funcionais, sempre buscando alinhar estética e usabilidade para oferecer a melhor experiência possível.</p>
          </div>
          <div className={styles.pessoa}>
            <img src={Yasmin} alt="Yasmin" />
            <h4>Yasmin Salgado</h4>
            <p>Responsável pelo conteúdo e comunicação do grupo, garantindo clareza e empatia nas informações. Também contribui ajudando a pensar na identidade visual da marca, tornando o projeto mais consistente e atraente.</p>
          </div>
        </div>

        <Link to="/" className={styles.botao}>
          Voltar à Home
        </Link>
      </div>
    </section>
  );
};

export {SaibaMaisSobreNos};
