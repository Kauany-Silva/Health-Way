import { useState, useEffect } from 'react';
import styles from './CarteiraVacinacao.module.css';
import { VacinaCard, Skeleton } from '../../Components';


const CarteiraVacinacao = () => {
  const [vacinas, setVacinas] = useState([
    { id: 1, nome: 'COVID-19', data: '2023-05-10', dose: '2ª dose' },
    { id: 2, nome: 'Gripe', data: '2023-03-15', dose: 'Única' },
  ]);
  const [form, setForm] = useState({ nome: '', data: '', dose: '' });
  const [loading, setLoading] = useState(true); // Estado de carregamento inicial
  const [adding, setAdding] = useState(false); // Estado de adição
  const [errors, setErrors] = useState({ nome: false, data: false, dose: false }); // Estado de erros

  // Simula carregamento inicial
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Remove erro ao digitar
    setErrors({ ...errors, [e.target.name]: false });
  }

  function handleAddVacina(e) {
    e.preventDefault();
    const newErrors = {
      nome: !form.nome,
      data: !form.data,
      dose: !form.dose,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return; // Se algum erro, não prossegue
    setAdding(true);
    setTimeout(() => {
      setVacinas([...vacinas, { id: Date.now(), ...form }]);
      setForm({ nome: '', data: '', dose: '' });
      setAdding(false);
      setErrors({ nome: false, data: false, dose: false });
    }, 500);
  }

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
          placeholder="Dose (ex: 1ª dose, reforço)"
          value={form.dose}
          onChange={handleChange}
          className={`${styles.inputVacina} ${errors.dose ? styles.erroInput : ''}`}
        />
        <button type="submit" className={styles.buttonVacina}>Adicionar Vacina</button>
      </form>

      <div className={styles.vacinasList}>
        {loading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} />
          ))
        ) : adding ? (
          <Skeleton />
        ) : vacinas.length === 0 ? (
          <p>Nenhuma vacina cadastrada.</p>
        ) : (
          vacinas.map(vacina => (
            <VacinaCard key={vacina.id} vacina={vacina} />
          ))
        )}
      </div>
    </div>
  );
};

export { CarteiraVacinacao };
