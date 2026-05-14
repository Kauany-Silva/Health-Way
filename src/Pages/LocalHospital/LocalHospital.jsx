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

// Componente auxiliar para atualizar o centro do mapa dinamicamente
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
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Ícone para marcar a localização detectada do usuário
const userIcon = new L.Icon({
  iconUrl: "flaticon.com",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const LocalHospital = () => {
  // Estados para gerenciar o texto de status e as coordenadas do mapa
  const [statusTexto, setStatusTexto] = useState("Carregando sua localização...");
  const [mapCenter, setMapCenter] = useState([-23.55052, -46.633308]); // Default: SP
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    const apiKey = 'SUA_CHAVE_AQUI'; // Substitua por sua chave da API
    const url = `ipgeolocation.io{apiKey}`;

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error("Erro na requisição");
        return response.json();
      })
      .then(data => {
        // Atualiza o texto com a cidade e país retornados
        setStatusTexto(`Você está acessando de ${data.city}, ${data.country_name}`);
        
        // Captura latitude e longitude da API
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);
        
        if (!isNaN(lat) && !isNaN(lng)) {
          setMapCenter([lat, lng]);
          setUserCoords([lat, lng]);
        }
      })
      .catch(error => {
        console.error(error);
        setStatusTexto("Não foi possível carregar sua localização.");
      });
  }, []);

  return (
    <section className={styles.hospitais}>
      <h2 className={styles.tituloHospital}>Hospitais próximos</h2>
      
      {/* O texto do comentário agora é dinâmico com base no estado da API */}
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
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Componente para mover a câmera quando o estado alterar */}
            <RecenterMap center={mapCenter} />

            {/* Marcador opcional da posição atual do usuário */}
            {userCoords && (
              <Marker position={userCoords} icon={userIcon}>
                <Popup>Você está aqui</Popup>
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
