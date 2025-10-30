import styles from './VacinaCard.module.css';

const VacinaCard=({ vacina })=> {
  return (
    <div className={styles.cardVacina}>
      <h3>{vacina.nome}</h3>
      <p><strong>Data:</strong> {vacina.data}</p>
      <p><strong>Dose:</strong> {vacina.dose}</p>
    </div>
  );
};

export {VacinaCard}