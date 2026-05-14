// chave api geolocalização: 6bd8b0a9c42c434eb2c7c341288caaf4

// Substitua "SUA_CHAVE_AQUI" pela chave que você recebeu no cadastro
const apiKey = '6bd8b0a9c42c434eb2c7c341288caaf4I'; 
const url = `https://ipgeolocation.io{apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Exemplo de como usar os dados retornados
    document.getElementById('localizacao-usuario').innerText = `Você está acessando de ${data.city}, ${data.country_name}`;
  })
  .catch(error => console.error('Erro ao buscar a geolocalização:', error));

