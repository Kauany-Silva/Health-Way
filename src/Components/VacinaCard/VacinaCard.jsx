import styles from './VacinaCard.module.css';

const VacinaCard = ({ vacina, onDelete, onEdit }) => {
  return (
    <div className={styles.cardVacina}>
      <h3>{vacina.nome}</h3>
      <p><strong>Data:</strong> {vacina.data}</p>
      <p><strong>Dose:</strong> {vacina.dose}</p>

      <div className={styles.cardButtons}>
        <button onClick={() => onEdit(vacina)}>Editar</button>
        <button onClick={() => onDelete(vacina.id)}>Excluir</button>
      </div>
    </div>
  );
};

export { VacinaCard };
