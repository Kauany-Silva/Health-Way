
import styles from "./Pets.module.css";

const petsData = [
  { nome: "Thor", especie: "Cachorro", ultimaVacina: "Raiva - 12/08/2025" },
  { nome: "Luna", especie: "Gato", ultimaVacina: "Gripe felina - 05/07/2025" },
  { nome: "Bolt", especie: "Cachorro", ultimaVacina: "Vacina múltipla - 20/06/2025" },
];

const Pets = () => {
  return (
    <div className={styles.petsPage}>
      <h2 className={styles.titulo}>Meus Pets</h2>
      <p className={styles.subtitulo}>
        Acompanhe vacinas, consultas e histórico de saúde dos seus animais.
      </p>

      <div className={styles.listaPets}>
        {petsData.map((pet, index) => (
          <div className={styles.cardPet} key={index}>
            <h3>{pet.nome}</h3>
            <p><strong>Espécie:</strong> {pet.especie}</p>
            <p><strong>Última vacina:</strong> {pet.ultimaVacina}</p>
          </div>
          
        ))}
      </div>
      <div>
        <button className={styles.CadastrarPet}>
          Cadastrar Pet

        </button>
      </div>
    </div>
  );
};

export {Pets};