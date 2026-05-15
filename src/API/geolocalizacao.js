async function buscarCEP() {

  const cep = document
    .getElementById("cep")
    .value
    .replace(/\D/g, "");

  if (cep.length !== 8) {
    alert("CEP inválido");
    return;
  }

  try {

    const resposta = await fetch(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    const dados = await resposta.json();

    if (dados.erro) {
      document.getElementById("endereco").innerHTML =
        "CEP não encontrado";
      return;
    }

    document.getElementById("endereco").innerHTML = `
      <p><strong>Rua:</strong> ${dados.logradouro}</p>
      <p><strong>Bairro:</strong> ${dados.bairro}</p>
      <p><strong>Cidade:</strong> ${dados.localidade}</p>
      <p><strong>Estado:</strong> ${dados.uf}</p>
    `;

  } catch (erro) {

    document.getElementById("endereco").innerHTML =
      "Erro ao buscar endereço";

    console.log(erro);
  }
}
