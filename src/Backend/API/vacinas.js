const BASE_URL = "http://localhost:3001";

export async function getVacinas() {
  
  const response = await fetch(`${BASE_URL}/vacinas`);
  return response.json();
}

export async function addVacina(vacina) {
  // remove id antes de enviar
  const { id, ...vacinaSemID } = vacina;

  const response = await fetch(`${BASE_URL}/vacinas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vacinaSemID),
  });

  return response.json();
}

export async function deleteVacina(id) {
  await fetch(`${BASE_URL}/vacinas/${id}`, { method: "DELETE" });
}

export async function updateVacina(id, dados) {
  const response = await fetch(`${BASE_URL}/vacinas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ ...dados, id }),
  });
  return response.json();
}
