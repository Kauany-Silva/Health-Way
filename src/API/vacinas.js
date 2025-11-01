import axios from 'axios';

const API_URL = 'http://localhost:5000/vacinas';

export const getVacinas = async () => (await axios.get(API_URL)).data;
export const addVacina = async (vacina) => (await axios.post(API_URL, vacina)).data;
export const updateVacina = async (id, vacina) => (await axios.put(`${API_URL}/${id}`, vacina)).data;
export const deleteVacina = async (id) => await axios.delete(`${API_URL}/${id}`);
