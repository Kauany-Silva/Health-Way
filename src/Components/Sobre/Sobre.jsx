import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sobre.module.css";

import Kauany from "../../Assets/Imagens/Kauany.jpg";
import Livia from "../../Assets/Imagens/Livia.jpg";
import Maria from "../../Assets/Imagens/Maria.jpg";
import Yasmin from "../../Assets/Imagens/Yasmin.jpg";

const Sobre = () => {
  return (
    <section className={styles.sobre}>
      <div className={styles.container}>
        
        
        <div className={styles.texto}>
          <h3 className={styles.subtitulo}>Sobre Nós</h3>
          <h1 className={styles.titulo}>Trabalhando Juntos Para o Melhor</h1>
          <p>
            O <span>Health Way</span> nasceu para transformar a forma como as
            pessoas cuidam da sua saúde. Nosso grupo é formado por 4
            integrantes apaixonados por tecnologia e inovação, que acreditam que
            saúde deve ser simples, prática e acessível.
          </p>
        
         <Link to="/saibamaissobrenos" className={styles.botao}>
          Saiba Mais
        </Link>
        </div>

        <div className={styles.fotos}>
          <img src={Kauany} alt="Integrante 1" />
          <img src={Livia} alt="Integrante 2" />
          <img src={Maria} alt="Integrante 3" />
          <img src={Yasmin} alt="Integrante 4" />
        </div>

      </div>
    </section>
  );
};

export {Sobre};
