import styles from './Rodape.module.css';

const Rodape = () => {
  const anoAtual = new Date().getFullYear();
  const criador = "Health Way"; 

  return (
    <footer className={styles.rodape}>
      <p className={styles.textoRodape}>© {anoAtual} Criado por {criador}.</p>
    </footer>
  );
};

export {Rodape};
