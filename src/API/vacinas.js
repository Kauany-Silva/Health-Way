const BASE_URL = "http://localhost:3001/vacinas";

export async function getVacinas() {
  const response = await fetch(BASE_URL);
  return response.json();
}

export async function addVacina(vacina) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vacina),
  });
  return response.json();
}

export async function deleteVacina(id) {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}

export async function updateVacina(id, dados) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ ...dados, id }),
  });
  return response.json();
}
