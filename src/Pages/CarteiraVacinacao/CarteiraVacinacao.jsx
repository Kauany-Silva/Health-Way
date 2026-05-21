import { useState } from "react";
import styles from "./CarteiraVacinacao.module.css";

export function CarteiraVacinacao() {
  const [vacinas, setVacinas] = useState([]);
  const [busca, setBusca] = useState("");
  const [removendoId, setRemovendoId] = useState(null);

  const [form, setForm] = useState({
    id: null,
    nome: "",
    data: "",
    dose: ""
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validar() {
    let novosErros = {};
    if (!form.nome) novosErros.nome = true;
    if (!form.data) novosErros.data = true;
    if (!form.dose) novosErros.dose = true;

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validar()) return;

    if (form.id === null) {
      setVacinas([...vacinas, { ...form, id: Date.now() }]);
    } else {
      setVacinas(vacinas.map(v => v.id === form.id ? form : v));
    }

    setForm({ id: null, nome: "", data: "", dose: "" });
    setErrors({});
  }

  function handleEdit(v) {
    setForm(v);
  }

  function handleDelete(id) {
    if (removendoId) return;
    setRemovendoId(id);

    setTimeout(() => {
      setVacinas(vacinas.filter(v => v.id !== id));
      setRemovendoId(null);
    }, 300);
  }

  function formatarData(data) {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  const vacinasFiltradas = vacinas
    .filter(v => v.nome.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => new Date(b.data) - new Date(a.data));

  return (
    <div className={styles.dashboard}>

      <h1 className={styles.nomeDashboard}>Health Way</h1>
      <h2 className={styles.tituloVacina}>Carteira de Vacinação</h2>

      <input
        type="text" 
        placeholder= " Buscar vacina..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className={styles.inputBusca}
        
      />

      <form className={styles.formVacina} onSubmit={handleSubmit}>

        <input
          type="text"
          name="nome"
          placeholder="Nome da vacina"
          value={form.nome}
          onChange={handleChange}
          className={`${styles.inputVacina} ${errors.nome ? styles.erroInput : ''}`}
        />

        <input
          type="date"
          name="data"
          value={form.data}
          onChange={handleChange}
          className={`${styles.inputVacina} ${errors.data ? styles.erroInput : ''}`}
        />

        <input
          type="text"
          name="dose"
          placeholder="Dose"
          value={form.dose}
          onChange={handleChange}
          className={`${styles.inputVacina} ${errors.dose ? styles.erroInput : ''}`}
        />

        <button type="submit" className={styles.buttonVacina}>
          {form.id === null ? "Adicionar Vacina" : "Salvar Alterações"}
        </button>

        {Object.values(errors).some(Boolean) && (
          <p className={styles.mensagemErro}>
            Preencha todos os campos corretamente!
          </p>
        )}
      </form>

      <div className={styles.vacinasList}>
        {vacinasFiltradas.length === 0 ? (
          <p className={styles.vazio}>Nenhuma vacina cadastrada.</p>
        ) : (
          vacinasFiltradas.map((v) => (
            <div
              key={v.id}
              className={`${styles.registro} ${removendoId === v.id ? styles.removendo : ''}`}
            >
              <strong>{v.nome}</strong><br />
              {formatarData(v.data)} • {v.dose}

              <div className={styles.acoes}>
                <button onClick={() => handleEdit(v)}>Editar</button>
                <button
                  onClick={() => handleDelete(v.id)}
                  disabled={removendoId === v.id}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}