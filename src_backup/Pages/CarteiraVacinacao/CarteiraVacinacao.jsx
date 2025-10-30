import React, { useState } from 'react';
import styles from './CarteiraVacinacao.module.css';
import {VacinaCard} from '../../Components';

const CarteiraVacinacao=()=> {
  const [vacinas, setVacinas] = useState([
    { id: 1, nome: 'COVID-19', data: '2023-05-10', dose: '2ª dose' },
    { id: 2, nome: 'Gripe', data: '2023-03-15', dose: 'Única' },
  ]);

  const [form, setForm] = useState({ nome: '', data: '', dose: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAddVacina(e) {
    e.preventDefault();
    if (!form.nome || !form.data || !form.dose) return alert('Preencha todos os campos');
    setVacinas([...vacinas, { id: Date.now(), ...form }]);
    setForm({ nome: '', data: '', dose: '' });
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
          <VacinaCard key={vacina.id} vacina={vacina} />
        ))}
      </div>
    </div>
  );
}

export {CarteiraVacinacao};