
import styles from "./Medicamentos.module.css";

const medicamentosData = [
  { id: 1, nome: "Paracetamol", dias: "Seg, Qua, Sex", horario: "08:00", finalidade: "Dor / Febre" },
  { id: 2, nome: "Amoxicilina", dias: "Seg, Ter, Qui", horario: "12:00", finalidade: "Infecção bacteriana" },
  { id: 3, nome: "Vitamina D", dias: "Todos os dias", horario: "09:00", finalidade: "Suplementação" },
];

const Medicamentos = () => {
  const handleEdit = (id) => {
    alert(`Editar medicamento com ID ${id}`);
    // adicionar a página de edição!!
  };

  return (
    <div className={styles.medicamentosPage}>
      <h2 className={styles.titulo}>Gerenciamento de Medicamentos</h2>
      <p className={styles.subtitulo}>
        Acompanhe horários, dias de uso, finalidade e edite quando necessário.
      </p>

      <table className={styles.tabela}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Dias</th>
            <th>Horário</th>
            <th>Finalidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {medicamentosData.map((med) => (
            <tr key={med.id}>
              <td>{med.nome}</td>
              <td>{med.dias}</td>
              <td>{med.horario}</td>
              <td>{med.finalidade}</td>
              <td>
                <button
                  className={styles.botaoEditar}
                  onClick={() => handleEdit(med.id)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export {Medicamentos};
