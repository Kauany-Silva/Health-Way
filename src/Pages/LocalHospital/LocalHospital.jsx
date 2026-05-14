/* import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from './LocalHospital.module.css';

// <p id="localizacao-usuario">Carregando sua localização...</p>


const hospitais = [
  {
    nome: "Hospital Central",
    coordenadas: [-23.55052, -46.633308],
    tempo: "30 min",
    endereco: "Av. Principal, 123",
  },
  {
    nome: "Clínica Vida",
    coordenadas: [-23.555, -46.63],
    tempo: "15 min",
    endereco: "Rua Saúde, 45",
  },
  {
    nome: "Hospital São Lucas",
    coordenadas: [-23.545, -46.64],
    tempo: "50 min",
    endereco: "Av. Esperança, 678",
  },
];

// Ícone customizado para os marcadores
const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const LocalHospital = () => {
  return (
    <section className={styles.hospitais}>
      <h2 className={styles.tituloHospital}>Hospitais próximos</h2>
      <p className={styles.subtituloHospital}>
        Veja a localização e o tempo médio de espera em cada unidade.
      </p>

      <div className={styles.containerHospitais}>
        <div className={styles.mapa}>
          <MapContainer
            center={[-23.55052, -46.633308]} // centro de SP
            zoom={14}
            style={{ height: "400px", width: "100%", borderRadius: "12px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {hospitais.map((h, index) => (
              <Marker
                key={index}
                position={h.coordenadas}
                icon={hospitalIcon}
              >
                <Popup>
                  <strong>{h.nome}</strong> <br />
                  Tempo de espera: {h.tempo} <br />
                  {h.endereco}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className={styles.listaHospitais}>
          {hospitais.map((h, index) => (
            <div className={styles.cardHospitais} key={index}>
              <h3>{h.nome}</h3>
              <p><strong>Tempo de espera:</strong> {h.tempo}</p>
              <p><strong>Endereço:</strong> {h.endereco}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export {LocalHospital}; */


import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from './LocalHospital.module.css';

// Componente auxiliar para mover o mapa para a nova localização
const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 14);
  }, [center, map]);
  return null;
};

const hospitais = [
  {
    nome: "Hospital Central",
    coordenadas: [-23.55052, -46.633308],
    tempo: "30 min",
    endereco: "Av. Principal, 123",
  },
  {
    nome: "Clínica Vida",
    coordenadas: [-23.555, -46.63],
    tempo: "15 min",
    endereco: "Rua Saúde, 45",
  },
  {
    nome: "Hospital São Lucas",
    coordenadas: [-23.545, -46.64],
    tempo: "50 min",
    endereco: "Av. Esperança, 678",
  },
];

const hospitalIcon = new L.Icon({
  iconUrl: "flaticon.com",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const userIcon = new L.Icon({
  iconUrl: "flaticon.com",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const LocalHospital = () => {
  const [statusTexto, setStatusTexto] = useState("Digite um CEP para buscar a localização.");
  const [mapCenter, setMapCenter] = useState([-23.55052, -46.633308]); 
  const [userCoords, setUserCoords] = useState(null);
  const [cep, setCep] = useState(""); // Estado para guardar o CEP digitado

  const buscarCep = (e) => {
    e.preventDefault();
    
    // Remove traços ou espaços que o usuário possa digitar
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      setStatusTexto("Por favor, digite um CEP válido com 8 números.");
      return;
    }

    setStatusTexto("Buscando endereço...");

    // 1. Busca os dados de endereço na API ViaCEP
    fetch(`viacep.com.br{cepLimpo}/json/`)
      .then(response => response.json())
      .then(data => {
        if (data.erro) {
          throw new Error("CEP não encontrado.");
        }

        const enderecoCompleto = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        setStatusTexto(`Endereço encontrado: ${enderecoCompleto}`);

        // 2. Transforma o endereço retornado em coordenadas (Latitude e Longitude) via Nominatim OpenStreetMap
        const queryEndereco = encodeURIComponent(`${data.logradouro}, ${data.localidade}, Brasil`);
        return fetch(`openstreetmap.org{queryEndereco}&limit=1`);
      })
      .then(response => response.json())
      .then(geoData => {
        if (geoData && geoData.length > 0) {
          const lat = parseFloat(geoData[0].lat);
          const lon = parseFloat(geoData[0].lon);

          // Atualiza o centro do mapa e o marcador do usuário
          setMapCenter([lat, lon]);
          setUserCoords([lat, lon]);
        } else {
          console.warn("Não foi possível gerar as coordenadas exatas deste endereço no mapa.");
        }
      })
      .catch(error => {
        console.error(error);
        setStatusTexto("Erro ao buscar o CEP. Verifique o número digitado.");
      });
  };

  return (
    <section className={styles.hospitais}>
      <h2 className={styles.tituloHospital}>Hospitais próximos</h2>
      
      {/* Formulário de Busca por CEP */}
      <form onSubmit={buscarCep} style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          placeholder="Digite o CEP (ex: 01001000)" 
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          maxLength={9}
          style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 16px", borderRadius: "6px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
          Buscar endereço
        </button>
      </form>

      <p className={styles.subtituloHospital}>
        {statusTexto}
      </p>

      <div className={styles.containerHospitais}>
        <div className={styles.mapa}>
          <MapContainer
            center={mapCenter}
            zoom={14}
            style={{ height: "400px", width: "100%", borderRadius: "12px" }}
          >
            <TileLayer
              attribution='&copy; <a href="openstreetmap.org">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <RecenterMap center={mapCenter} />

            {userCoords && (
              <Marker position={userCoords} icon={userIcon}>
                <Popup>Sua busca está aqui</Popup>
              </Marker>
            )}

            {hospitais.map((h, index) => (
              <Marker
                key={index}
                position={h.coordenadas}
                icon={hospitalIcon}
              >
                <Popup>
                  <strong>{h.nome}</strong> <br />
                  Tempo de espera: {h.tempo} <br />
                  {h.endereco}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className={styles.listaHospitais}>
          {hospitais.map((h, index) => (
            <div className={styles.cardHospitais} key={index}>
              <h3>{h.nome}</h3>
              <p><strong>Tempo de espera:</strong> {h.tempo}</p>
              <p><strong>Endereço:</strong> {h.endereco}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { LocalHospital };


