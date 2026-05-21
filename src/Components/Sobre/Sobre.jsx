import styles from './Sobre.module.css'


import Kauany from "../../Assets/Imagens/Kauany.jpg"; 
import Livia from "../../Assets/Imagens/Livia.jpg"; 
import Maria from "../../Assets/Imagens/Maria.jpg"; 
import Yasmin from "../../Assets/Imagens/Yasmin.jpg";
const Sobre = ({ id }) => (
    <section id={id} className={styles.sobre}>
      <div className={styles.container}>
        <div className={styles.texto}>
          <h3 className={styles.subtitulo}>Sobre Nós</h3>
          <h1 className={styles.titulo}>Trabalhando Juntos Para o Melhor</h1>
          <p>
            O <span>Health Way</span> nasceu para transformar a forma como as
            pessoas cuidam da sua saúde.
          </p>
         
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


export {Sobre};
