import styles from "./Cards.module.css";

const cardsData = [
  { cardTitulo: "Carteira Digital", descricao: "Guarde suas vacinas e exames em um só lugar." },
  { cardTitulo: "Consultas", descricao: "Acompanhe agendamentos passados e futuros." },
  { cardTitulo: "Hospitais Perto de Você", descricao: "Encontre rapidamente os hospitais mais próximos e acompanhe o tempo estimado de espera para um atendimento ágil." },
  { cardTitulo: "Cuidado com Seu Pet", descricao: "Organize vacinas e medicamentos do seu animal de estimação em um só lugar, garantindo saúde e bem-estar também para ele."}
];

const Cards = ({id}) => {
  return (
    <section id={id}>
      <section className={styles.cardsSection}>
      <div className={styles.textContent}>
        <h2>Recursos do </h2>
        <h2 className={styles.nomeRecursos}>Health Way</h2>
        <p>
          Conheça as funcionalidades que oferecemos para melhorar sua saúde e bem-estar.  
          Tudo em um só lugar, prático e seguro.
        </p>
      </div>

      <div className={styles.cardsGrid}>
        {cardsData.map((card, i) => (
          <div key={i} className={styles.cardLand}>
            <h3>{card.cardTitulo}</h3>
            <p>{card.descricao}</p>
            
          </div>
        ))}
      </div>
    </section>
    </section>
  );
};

export { Cards };
