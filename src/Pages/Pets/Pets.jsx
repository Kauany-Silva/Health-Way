import { useState, useRef } from "react";
import styles from "./Pets.module.css";

export default function Pets() {
  const [toast, setToast] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showVaccineModal, setShowVaccineModal] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);
  const [petToDelete, setPetToDelete] = useState(null);
  const [selectedPetForVaccine, setSelectedPetForVaccine] = useState(null);
  const [selectedVaccineIndex, setSelectedVaccineIndex] = useState(null);

  // Refs para navegação por Enter
  const nomeInputRef = useRef(null);
  const racaInputRef = useRef(null);
  const especieSelectRef = useRef(null);
  const idadeInputRef = useRef(null);
  const vacinaInputRef = useRef(null);
  const fotoInputRef = useRef(null);

  const [form, setForm] = useState({
    nome: "",
    raca: "",
    especie: "Cachorro",
    idade: "",
    vacina: "",
    foto: "",
  });

  const [newVaccine, setNewVaccine] = useState({
    nome: "",
    data: "",
  });

  const especies = [
    "Cachorro",
    "Gato",
    "Pássaro",
    "Coelho",
    "Hamster",
    "Peixe",
    "Tartaruga",
    "Outro"
  ];

  const imagens = {
    Cachorro: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400",
    Gato: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=400",
    Pássaro: "https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=400",
    Coelho: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=400",
    Hamster: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=400",
    Peixe: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=400",
    Tartaruga: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=400",
    Outro: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400",
  };

  const [pets, setPets] = useState([
    {
      nome: "Thor",
      raca: "Golden Retriever",
      especie: "Cachorro",
      idade: "4 anos",
      vacina: "Raiva",
      foto: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400",
      vacinas: [
        { nome: "V10", data: "20/09/2025", aplicada: false },
        { nome: "Raiva", data: "01/10/2025", aplicada: false },
        { nome: "Giárdia", data: "10/04/2025", aplicada: true }
      ]
    },
  ]);

  // Função para classificar o status da vacina
  const getVaccineStatus = (data, aplicada) => {
    if (aplicada) return "success";
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    // Converte a data da vacina (formato DD/MM/YYYY) para Date
    const partes = data.split("/");
    const dataVacina = new Date(partes[2], partes[1] - 1, partes[0]);
    dataVacina.setHours(0, 0, 0, 0);
    
    if (dataVacina < hoje) return "pending";
    return "next";
  };

  const getStatusText = (status) => {
    switch(status) {
      case "pending": return "Atrasada";
      case "next": return "Próxima";
      case "success": return "Aplicada";
      default: return "Pendente";
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const clearForm = () => {
    setForm({
      nome: "",
      raca: "",
      especie: "Cachorro",
      idade: "",
      vacina: "",
      foto: "",
    });
    setEditingIndex(null);
  };

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    clearForm();
    setShowModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setForm((prev) => ({
        ...prev,
        foto: event.target.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // Função para navegar entre campos com Enter
  const handleKeyPress = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  const savePet = () => {
    const { nome, raca, especie, idade, vacina, foto } = form;

    if (!nome.trim() || !raca.trim() || !idade.trim() || !vacina.trim()) {
      showToast("Preencha todos os campos");
      return;
    }

    const novoPet = {
      nome,
      raca,
      especie,
      idade,
      vacina,
      foto: foto || imagens[especie] || imagens["Cachorro"],
      vacinas: []
    };

    if (editingIndex !== null) {
      const updated = [...pets];
      updated[editingIndex] = { ...updated[editingIndex], ...novoPet };
      setPets(updated);
      showToast("Pet editado com sucesso!");
    } else {
      setPets((prev) => [...prev, novoPet]);
      showToast("Pet cadastrado com sucesso!");
    }

    closeModal();
  };

  const editPet = (index) => {
    const pet = pets[index];

    setForm({
      nome: pet.nome,
      raca: pet.raca,
      especie: pet.especie,
      idade: pet.idade,
      vacina: pet.vacina,
      foto: pet.foto,
    });

    setEditingIndex(index);
    setShowModal(true);
  };

  const deletePet = (index) => {
    setPetToDelete(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = pets.filter((_, i) => i !== petToDelete);
    setPets(updated);
    setPetToDelete(null);
    setShowDeleteModal(false);
    showToast("Pet excluído com sucesso!");
  };

  const closeDeleteModal = () => {
    setPetToDelete(null);
    setShowDeleteModal(false);
  };

  // Funções para gerenciar vacinas
  const openVaccineModal = (petIndex) => {
    setSelectedPetForVaccine(petIndex);
    setNewVaccine({ nome: "", data: "" });
    setShowVaccineModal(true);
  };

  const closeVaccineModal = () => {
    setSelectedPetForVaccine(null);
    setNewVaccine({ nome: "", data: "" });
    setShowVaccineModal(false);
  };

  const addVaccine = () => {
    if (!newVaccine.nome.trim() || !newVaccine.data.trim()) {
      showToast("Preencha o nome e a data da vacina");
      return;
    }

    const updatedPets = [...pets];
    const pet = updatedPets[selectedPetForVaccine];
    
    const newVaccineEntry = {
      nome: newVaccine.nome,
      data: newVaccine.data,
      aplicada: false
    };
    
    if (!pet.vacinas) {
      pet.vacinas = [];
    }
    
    pet.vacinas.push(newVaccineEntry);
    setPets(updatedPets);
    showToast("Vacina adicionada com sucesso!");
    closeVaccineModal();
  };

  // Função para marcar/desmarcar vacina como aplicada
  const toggleVaccineApplied = (petIndex, vaccineIndex) => {
    const updatedPets = [...pets];
    const pet = updatedPets[petIndex];
    const vaccine = pet.vacinas[vaccineIndex];
    
    vaccine.aplicada = !vaccine.aplicada;
    
    setPets(updatedPets);
    showToast(vaccine.aplicada ? "Vacina marcada como aplicada!" : "Vacina marcada como não aplicada!");
  };

  return (
    <>
      {/* TOAST */}
      <div className={`${styles.toast} ${toast ? styles.show : ""}`}>
        {toast}
      </div>

      {/* ===================== PETS ===================== */}
      <section className={styles.section}>
        <h1 className={styles.title}>Pets</h1>

        <button className={styles.btn} onClick={openModal}>
          + Cadastrar Pet
        </button>

        <div className={styles.cards}>
          {pets.map((pet, petIndex) => (
            <div className={styles.card} key={petIndex}>
              {/* Informações do Pet */}
              <div className={styles.petTop}>
                <img src={pet.foto} alt={pet.nome} className={styles.petImg} />

                <div>
                  <div className={styles.petName}>{pet.nome}</div>
                  <div className={styles.petType}>{pet.raca}</div>
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Espécie</span>
                  <strong>{pet.especie}</strong>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.label}>Idade</span>
                  <strong>{pet.idade}</strong>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.label}>Nome da última vacina</span>
                  <strong>{pet.vacina}</strong>
                </div>
              </div>

              {/* Botões de Editar/Excluir */}
              <div className={styles.actions}>
                <button className={styles.editBtn} onClick={() => editPet(petIndex)}>
                  Editar
                </button>

                <button className={styles.deleteBtn} onClick={() => deletePet(petIndex)}>
                  Excluir
                </button>
              </div>

              {/* Carteira de Vacinação */}
              <div className={styles.vaccineSection}>
                <h3 className={styles.vaccineTitle}>Carteira de Vacinação</h3>
                
                {pet.vacinas && pet.vacinas.length > 0 ? (
                  <table className={styles.vaccineTable}>
                    <thead>
                      <tr>
                        <th>Vacina</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Aplicada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pet.vacinas.map((vacina, vacIndex) => {
                        const status = getVaccineStatus(vacina.data, vacina.aplicada);
                        return (
                          <tr key={vacIndex}>
                            <td>{vacina.nome}</td>
                            <td>{vacina.data}</td>
                            <td>
                              <span className={`${styles.badge} ${styles[status]}`}>
                                {getStatusText(status)}
                              </span>
                            </td>
                            <td className={styles.checkboxCell}>
                              <label className={styles.checkboxLabel}>
                                <input
                                  type="checkbox"
                                  checked={vacina.aplicada}
                                  onChange={() => toggleVaccineApplied(petIndex, vacIndex)}
                                  className={styles.checkbox}
                                />
                                <span className={styles.checkboxText}>
                                  {vacina.aplicada ? "Aplicada" : "Não aplicada"}
                                </span>
                              </label>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p className={styles.noVaccines}>Nenhuma vacina cadastrada</p>
                )}
                
                {/* Botão Adicionar Vacina logo abaixo da tabela */}
                <button 
                  className={styles.addVaccineBtn}
                  onClick={() => openVaccineModal(petIndex)}
                >
                  + Adicionar Vacina
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== HOSPITAIS ===================== */}
      <section className={styles.section}>
        <h1 className={styles.title}>Hospitais</h1>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h2 className={styles.hospitalTitle}>Clínica PetCare</h2>

            <div className={styles.info}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Atendimento</span>
                <strong>24 horas</strong>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.label}>Telefone</span>
                <strong>(11) 99999-9999</strong>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.label}>Endereço</span>
                <strong>Centro</strong>
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.editBtn} onClick={() => showToast("Contato aberto!")}>
                Entrar em contato
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MODAL CADASTRAR/EDITAR ===================== */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h2>{editingIndex !== null ? "Editar Pet" : "Cadastrar Pet"}</h2>

            <div className={styles.formGroup}>
              <label>Nome</label>
              <input
                ref={nomeInputRef}
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                onKeyPress={(e) => handleKeyPress(e, racaInputRef)}
                autoFocus
              />
            </div>

            <div className={styles.formGroup}>
              <label>Raça</label>
              <input
                ref={racaInputRef}
                value={form.raca}
                onChange={(e) => setForm({ ...form, raca: e.target.value })}
                onKeyPress={(e) => handleKeyPress(e, especieSelectRef)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Espécie</label>
              <select
                ref={especieSelectRef}
                value={form.especie}
                onChange={(e) => setForm({ ...form, especie: e.target.value })}
                onKeyPress={(e) => handleKeyPress(e, idadeInputRef)}
              >
                {especies.map((especie) => (
                  <option key={especie}>{especie}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Idade</label>
              <input
                ref={idadeInputRef}
                value={form.idade}
                onChange={(e) => setForm({ ...form, idade: e.target.value })}
                onKeyPress={(e) => handleKeyPress(e, vacinaInputRef)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Nome da última vacina</label>
              <input
                ref={vacinaInputRef}
                value={form.vacina}
                onChange={(e) => setForm({ ...form, vacina: e.target.value })}
                onKeyPress={(e) => handleKeyPress(e, fotoInputRef)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Foto</label>
              <input
                ref={fotoInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    savePet();
                  }
                }}
              />
              {form.foto && <img src={form.foto} className={styles.previewImage} alt="preview" />}
            </div>

            <div className={styles.modalActions}>
              <button className={styles.saveBtn} onClick={savePet}>
                Salvar
              </button>

              <button className={styles.cancelBtn} onClick={closeModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL DELETE ===================== */}
      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h2>Excluir Pet</h2>
            <p className={styles.deleteText}>Tem certeza que deseja excluir este pet?</p>

            <div className={styles.modalActions}>
              <button className={styles.deleteBtn} onClick={confirmDelete}>
                Excluir
              </button>

              <button className={styles.cancelBtn} onClick={closeDeleteModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL ADICIONAR VACINA ===================== */}
      {showVaccineModal && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h2>Adicionar Vacina</h2>

            <div className={styles.formGroup}>
              <label>Nome da Vacina</label>
              <input
                value={newVaccine.nome}
                onChange={(e) => setNewVaccine({ ...newVaccine, nome: e.target.value })}
                placeholder="Ex: V10, Raiva, Giárdia..."
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const dataInput = document.getElementById("vaccineDataInput");
                    if (dataInput) dataInput.focus();
                  }
                }}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Data da Vacina</label>
              <input
                id="vaccineDataInput"
                type="date"
                value={newVaccine.data}
                onChange={(e) => setNewVaccine({ ...newVaccine, data: e.target.value })}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addVaccine();
                  }
                }}
              />
            </div>

            <div className={styles.modalActions}>
              <button className={styles.saveBtn} onClick={addVaccine}>
                Adicionar
              </button>

              <button className={styles.cancelBtn} onClick={closeVaccineModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

<<<<<<< HEAD
export { Pets };
=======
export { Pets };  
>>>>>>> a2e3653e53157cbdcf26b51d486595624b3ee1fe
