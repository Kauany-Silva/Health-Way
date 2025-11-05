import { useState, useEffect } from 'react';
import styles from './CarteiraVacinacao.module.css';
import { VacinaCard, Skeleton } from '../../Components';
import { getVacinas, addVacina, deleteVacina, updateVacina } from "../../API/vacinas";

const CarteiraVacinacao = () => {
  const [vacinas, setVacinas] = useState([]);
  const [form, setForm] = useState({ id: null, nome: '', data: '', dose: '' });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ nome: false, data: false, dose: false });

  useEffect(() => {
    getVacinas().then(data => {
      setVacinas(data);
      setLoading(false);
    });
  }, []);

  function handleDeleteVacina(id) {
    deleteVacina(id).then(() => {
      setVacinas(vacinas.filter(v => v.id !== id));
    });
  }

  function handleEditVacina(vacina) {
    setForm(vacina);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {
      nome: !form.nome,
      data: !form.data,
      dose: !form.dose
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    // EDITAR
    if (form.id !== null) {
      updateVacina(form.id, form).then(vacinaEditada => {
        setVacinas(vacinas.map(v => (v.id === form.id ? vacinaEditada : v)));
        setForm({ id: null, nome: '', data: '', dose: '' });
      });
      return;
    }

    // ADICIONAR
    addVacina(form).then(novaVacina => {
      setVacinas([...vacinas, novaVacina]);
      setForm({ id: null, nome: '', data: '', dose: '' });
    });
  }

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.nomeDashboard}>Health Way</h1>
      <h2 className={styles.tituloVacina}>Carteira de Vacinação</h2>

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
  <p className={styles.mensagemErro}>Preencha todos os campos corretamente!</p>
)}

      </form>

      <div className={styles.vacinasList}>
        {loading ? (
          Array.from({ length: 2 }).map((_, index) => <Skeleton key={index} />)
        ) : vacinas.length === 0 ? (
          <p>Nenhuma vacina cadastrada.</p>
        ) : (
          vacinas.map(vacina => (
            <VacinaCard
              key={vacina.id}
              vacina={vacina}
              onDelete={handleDeleteVacina}
              onEdit={handleEditVacina}
            />
          ))
        )}
      </div>
    </div>
  );
};

export { CarteiraVacinacao };
