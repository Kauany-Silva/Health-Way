import { useEffect, useState } from 'react';
import styles from './CarteiraVacinacao.module.css';
import { VacinaCard } from '../../Components';
import { getVacinas, addVacina, updateVacina, deleteVacina } from '../../API/vacinas'; // importando funções da API

const CarteiraVacinacao = () => {
  const [vacinas, setVacinas] = useState([]);
  const [form, setForm] = useState({ nome: '', data: '', dose: '' });

  // Pegar vacinas ao carregar
  useEffect(() => {
    fetchVacinas();
  }, []);

  const fetchVacinas = async () => {
    const data = await getVacinas();
    setVacinas(data);
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleAddVacina = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.data || !form.dose) return alert('Preencha todos os campos');

    const novaVacina = { ...form };
    await addVacina(novaVacina); // adiciona na API
    setForm({ nome: '', data: '', dose: '' });
    fetchVacinas(); // atualiza lista
  };

  const handleDeleteVacina = async (id) => {
    await deleteVacina(id);
    fetchVacinas();
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.nomeDashboard}>Health Way</h1>
      <h2 className={styles.tituloVacina}>Carteira de Vacinação</h2>

      <form className={styles.formVacina} onSubmit={handleAddVacina}>
        <input
          type="text"
          name="nome"
          placeholder="Nome da vacina"
          value={form.nome}
          onChange={handleChange}
          className={styles.inputVacina}
        />
        <input
          type="date"
          name="data"
          value={form.data}
          onChange={handleChange}
          className={styles.inputVacina}
        />
        <input
          type="text"
          name="dose"
          placeholder="Dose (ex: 1ª dose, reforço)"
          value={form.dose}
          onChange={handleChange}
          className={styles.inputVacina}
        />
        <button type="submit" className={styles.buttonVacina}>Adicionar Vacina</button>
      </form>

      <div className={styles.vacinasList}>
        {vacinas.length === 0 && <p>Nenhuma vacina cadastrada.</p>}
        {vacinas.map(vacina => (
          <VacinaCard
            key={vacina.id}
            vacina={vacina}
            onDelete={() => handleDeleteVacina(vacina.id)} // se VacinaCard tiver botão de excluir
          />
        ))}
      </div>
    </div>
  );
};

export { CarteiraVacinacao };
