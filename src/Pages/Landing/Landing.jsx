import {Cabecalho, Menu, Hero, Sobre, Rodape, Cards, Contato} from '../../Components'
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.landing}>
      <Cabecalho titulo="Health Way" />
      <Menu />      
      <Hero id="inicio" />
      <Sobre id="sobre" />
      <Cards id="recursos" />
      <Contato id="contato" />

      <Rodape />
    </div>
  );
}

export {Landing};
