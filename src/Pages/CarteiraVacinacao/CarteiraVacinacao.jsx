import styles from './CarteiraVacinacao.module.css';
import { VacinaCard, Skeleton } from '../../Components';
import { useCarteiraVacinacao } from './Hooks/useCarteiraVacinacao';

export function CarteiraVacinacao() {

  const {
    vacinas,
    form,
    errors,
    loading,
    handleSubmit,
    handleChange,
    handleDeleteVacina,
    handleEditVacina
  } = useCarteiraVacinacao();

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
}
