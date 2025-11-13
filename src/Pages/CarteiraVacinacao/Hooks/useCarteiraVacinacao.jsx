import { useState, useEffect } from 'react';
import { getVacinas, addVacina, deleteVacina, updateVacina } from "../../../API/vacinas";

export function useCarteiraVacinacao() {

  const [vacinas, setVacinas] = useState([]);
  const [form, setForm] = useState({ id: null, nome: '', data: '', dose: '' });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ nome: false, data: false, dose: false });

  useEffect(() => {
    fetchVacinas();
  }, []);

  function fetchVacinas() {
  console.log("→ Chamando API getVacinas...");
  getVacinas()
    .then(data => {
      console.log("→ Resposta da API:", data);
      setVacinas(data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("❌ Erro ao buscar vacinas:", err);
      setLoading(false);
    });
}


  function handleDeleteVacina(id) {
    deleteVacina(id).then(() => {
      setVacinas(prev => prev.filter(v => v.id !== id));
    });
  }

  function handleEditVacina(vacina) {
    setForm(vacina);
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: false }));
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
        setVacinas(prev =>
          prev.map(v => (v.id === form.id ? vacinaEditada : v))
        );
        setForm({ id: null, nome: '', data: '', dose: '' });
      });
      return;
    }

    // ADICIONAR
    addVacina(form).then(() => {
      fetchVacinas(); // <- Agora recarrega a lista corretamente
      setForm({ id: null, nome: '', data: '', dose: '' });
    });
  }

  return {
    vacinas,
    form,
    errors,
    loading,
    handleSubmit,
    handleChange,
    handleDeleteVacina,
    handleEditVacina
  };
}
