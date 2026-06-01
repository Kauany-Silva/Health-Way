import { useState } from "react";
import styles from "./Consultas.module.css";

const consultasData = [
  { 
    id: 1,
    paciente: "Mariana Gonçalves", 
    tipo: "Check-up geral", 
    data: "20/09/2025", 
    hora: "14:00", 
    medico: "Dr. João",
    status: "confirmada"
  },
  { 
    id: 2,
    paciente: "Carlos Mendes", 
    tipo: "Exame de sangue", 
    data: "25/09/2025", 
    hora: "10:00", 
    medico: "Dra. Maria",
    status: "pendente"
  },
  { 
    id: 3,
    paciente: "Ana Pereira", 
    tipo: "Consulta cardiológica", 
    data: "28/09/2025", 
    hora: "16:00", 
    medico: "Dr. Carlos",
    status: "confirmada"
  },
];

const Consultas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [consultas, setConsultas] = useState(consultasData);
  const [showModal, setShowModal] = useState(false);
  const [novaConsulta, setNovaConsulta] = useState({
    paciente: "",
    tipo: "",
    data: "",
    hora: "",
    medico: "",
    status: "pendente"
  });

  const totalConsultas = consultas.length;
  const consultasHoje = consultas.filter(c => c.data === "20/09/2025").length;
  const proximasConsultas = consultas.filter(c => {
    const [dia, mes, ano] = c.data.split("/");
    const dataConsulta = new Date(`${ano}-${mes}-${dia}`);
    const hoje = new Date();
    const dias7 = new Date();
    dias7.setDate(hoje.getDate() + 7);
    return dataConsulta >= hoje && dataConsulta <= dias7;
  }).length;
  const taxaComparecimento = 92;

  const consultasFiltradas = consultas.filter(consulta =>
    consulta.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consulta.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consulta.medico.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVerDetalhes = (consulta) => {
    alert(`Detalhes da consulta\n\nPaciente: ${consulta.paciente}\nTipo: ${consulta.tipo}\nData: ${consulta.data}\nHora: ${consulta.hora}\nMédico: ${consulta.medico}\nStatus: ${consulta.status === 'confirmada' ? 'Confirmada' : 'Pendente'}`);
  };

  const handleAdicionarConsulta = () => {
    if (!novaConsulta.paciente || !novaConsulta.tipo || !novaConsulta.data || !novaConsulta.hora || !novaConsulta.medico) {
      alert("Preencha todos os campos!");
      return;
    }

    const novaId = Math.max(...consultas.map(c => c.id), 0) + 1;
    const consultaCompleta = {
      ...novaConsulta,
      id: novaId
    };

    setConsultas([...consultas, consultaCompleta]);
    setShowModal(false);
    setNovaConsulta({
      paciente: "",
      tipo: "",
      data: "",
      hora: "",
      medico: "",
      status: "pendente"
    });
    alert("Consulta adicionada com sucesso!");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNovaConsulta({
      paciente: "",
      tipo: "",
      data: "",
      hora: "",
      medico: "",
      status: "pendente"
    });
  };

  return (
    <div className={styles.consultasPage}>
      <div className={styles.headerContainer}>
        <div>
          <h2 className={styles.titulo}>Consultas Agendadas</h2>
          <p className={styles.subtitulo}>
            Aqui você acompanha o histórico de todas as consultas médicas.
          </p>
        </div>
        <button 
          className={styles.btnAdicionar}
          onClick={() => setShowModal(true)}
        >
          + Nova Consulta
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{totalConsultas}</div>
          <div className={styles.statLabel}>Total de consultas</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{consultasHoje}</div>
          <div className={styles.statLabel}>Consultas hoje</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{proximasConsultas}</div>
          <div className={styles.statLabel}>Próximos 7 dias</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{taxaComparecimento}%</div>
          <div className={styles.statLabel}>Comparecimento</div>
        </div>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Buscar por paciente, médico ou tipo de consulta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.listaConsultas}>
        {consultasFiltradas.length > 0 ? (
          consultasFiltradas.map((consulta) => (
            <div className={`${styles.cardConsulta} ${styles[consulta.status]}`} key={consulta.id}>
              <div className={styles.statusBadge}>
                {consulta.status === "confirmada" ? "Confirmada" : "Pendente"}
              </div>
              <h3>{consulta.paciente}</h3>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Tipo:</span>
                <span className={styles.infoValue}>{consulta.tipo}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Data:</span>
                <span className={styles.infoValue}>{consulta.data}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Hora:</span>
                <span className={styles.infoValue}>{consulta.hora}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Médico:</span>
                <span className={styles.infoValue}>{consulta.medico}</span>
              </div>
              <button 
                className={styles.btnDetalhes}
                onClick={() => handleVerDetalhes(consulta)}
              >
                Ver detalhes
              </button>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            Nenhuma consulta encontrada para "{searchTerm}"
          </div>
        )}
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Nova Consulta</h3>
              <button className={styles.modalClose} onClick={handleCloseModal}>X</button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Paciente</label>
                <input
                  type="text"
                  placeholder="Nome completo do paciente"
                  value={novaConsulta.paciente}
                  onChange={(e) => setNovaConsulta({...novaConsulta, paciente: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Tipo de Consulta</label>
                <input
                  type="text"
                  placeholder="Ex: Check-up, Cardiologia, etc."
                  value={novaConsulta.tipo}
                  onChange={(e) => setNovaConsulta({...novaConsulta, tipo: e.target.value})}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Data</label>
                  <input
                    type="date"
                    value={novaConsulta.data}
                    onChange={(e) => {
                      const data = new Date(e.target.value);
                      const dataFormatada = data.toLocaleDateString('pt-BR');
                      setNovaConsulta({...novaConsulta, data: dataFormatada});
                    }}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Hora</label>
                  <input
                    type="time"
                    value={novaConsulta.hora}
                    onChange={(e) => setNovaConsulta({...novaConsulta, hora: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Médico(a)</label>
                <input
                  type="text"
                  placeholder="Nome do médico"
                  value={novaConsulta.medico}
                  onChange={(e) => setNovaConsulta({...novaConsulta, medico: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  value={novaConsulta.status}
                  onChange={(e) => setNovaConsulta({...novaConsulta, status: e.target.value})}
                >
                  <option value="pendente">Pendente</option>
                  <option value="confirmada">Confirmada</option>
                </select>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.btnCancelar} onClick={handleCloseModal}>
                Cancelar
              </button>
              <button className={styles.btnSalvar} onClick={handleAdicionarConsulta}>
                Salvar Consulta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Consultas, consultasData };