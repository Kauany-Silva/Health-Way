import { useState } from "react";
import styles from "./Medicamentos.module.css";

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([
    { id: 1, nome: "Paracetamol", dias: "Seg, Qua, Sex", horario: "08:00", finalidade: "Dor / Febre" },
    { id: 2, nome: "Amoxicilina", dias: "Seg, Ter, Qui", horario: "12:00", finalidade: "Infecção bacteriana" },
    { id: 3, nome: "Vitamina D", dias: "Todos os dias", horario: "09:00", finalidade: "Suplementação" },
  ]);

  const [modoAdd, setModoAdd] = useState(false);

  const [novoMed, setNovoMed] = useState({
    nome: "",
    dias: "",
    horario: "",
    finalidade: "",
  });

  const handleChange = (e) => {
    setNovoMed({ ...novoMed, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const novo = {
      id: Date.now(),
      ...novoMed,
    };

    setMedicamentos([...medicamentos, novo]);

    setNovoMed({ nome: "", dias: "", horario: "", finalidade: "" });
    setModoAdd(false);
  };

  const handleDelete = (id) => {
    setMedicamentos(medicamentos.filter((med) => med.id !== id));
  };

  return (
    <div className={styles.medicamentosPage}>
      <h2 className={styles.titulo}>Gerenciamento de Medicamentos</h2>
      <p className={styles.subtitulo}>
        Acompanhe horários, dias de uso, finalidade e edite quando necessário.
      </p>

      <button className={styles.botaoAdicionar} onClick={() => setModoAdd(true)}>
        + Adicionar medicamento
      </button>

      {/* FORMULÁRIO */}
      {modoAdd && (
        <div className={styles.formBox}>
          <h3>Novo medicamento</h3>

          <input
            name="nome"
            placeholder="Nome"
            value={novoMed.nome}
            onChange={handleChange}
          />

          <input
            name="dias"
            placeholder="Dias de uso"
            value={novoMed.dias}
            onChange={handleChange}
          />

          <input
            name="horario"
            placeholder="Horário"
            value={novoMed.horario}
            onChange={handleChange}
          />

          <input
            name="finalidade"
            placeholder="Finalidade"
            value={novoMed.finalidade}
            onChange={handleChange}
          />

          <div>
            <button onClick={handleAdd}>Salvar</button>
            <button onClick={() => setModoAdd(false)}>Cancelar</button>
          </div>
        </div>
      )}

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
          {medicamentos.map((med) => (
            <tr key={med.id}>
              <td>{med.nome}</td>
              <td>{med.dias}</td>
              <td>{med.horario}</td>
              <td>{med.finalidade}</td>
              <td>
                <button className={styles.botaoEditar}>
                  Editar
                </button>

                <button
                  className={styles.botaoExcluir}
                  onClick={() => handleDelete(med.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Medicamentos }