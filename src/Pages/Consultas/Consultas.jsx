import styles from "./Consultas.module.css";

const consultasData = [
   { paciente: "Mariana Gonçalves", tipo: "Check-up geral", data: "20/09/2025", hora: "14:00", medico: "Dr. João" },
  { paciente: "Carlos Mendes", tipo: "Exame de sangue", data: "25/09/2025", hora: "10:00", medico: "Dra. Maria" },
  { paciente: "Ana Pereira", tipo: "Consulta cardiológica", data: "28/09/2025", hora: "16:00", medico: "Dr. Carlos" },
    ];

const Consultas = () => {
  return (
    <div className={styles.consultasPage}>
      <h2 className={styles.titulo}>Consultas Agendadas</h2>
      <p className={styles.subtitulo}>
        Aqui você acompanha o histórico de todas as consultas médicas.
      </p>

      <div className={styles.listaConsultas}>
        {consultasData.map((consulta, index) => (
          <div className={styles.cardConsulta} key={index}>
            <h3>{consulta.paciente}</h3>
            <p><strong>Tipo:</strong> {consulta.tipo}</p>
            <p><strong>Data:</strong> {consulta.data}</p>
            <p><strong>Hora:</strong> {consulta.hora}</p>
            <p><strong>Médico:</strong> {consulta.medico}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export {Consultas, consultasData};
