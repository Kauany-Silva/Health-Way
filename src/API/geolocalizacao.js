export async function buscarCEP(cep, setEndereco) {

  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) {
    setEndereco("CEP inválido");
    return;
  }

  try {

    const resposta = await fetch(
      `https://viacep.com.br/ws/${cepLimpo}/json/`
    );

    const dados = await resposta.json();

    if (dados.erro) {
      setEndereco("CEP não encontrado");
      return;
    }

    setEndereco(
      `${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}`
    );

  } catch (erro) {
    setEndereco("Erro ao buscar CEP");
  }
}