import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./LocalHospital.module.css";
import { useState, useRef } from "react";

// Função de busca de CEP integrada
const buscarCEP = async (cep, setEndereco, setUserLocation, setLoading) => {
  if (!cep || cep.length < 8) {
    alert("Digite um CEP válido com 8 dígitos");
    return;
  }

  setLoading(true);
  
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado!");
      setLoading(false);
      return;
    }

    const enderecoFormatado = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
    setEndereco(enderecoFormatado);

    const geoResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        `${data.logradouro} ${data.bairro} ${data.localidade} ${data.uf}`
      )}&limit=1`
    );
    const geoData = await geoResponse.json();

    if (geoData && geoData[0]) {
      const lat = parseFloat(geoData[0].lat);
      const lon = parseFloat(geoData[0].lon);
      setUserLocation([lat, lon]);
    } else {
      setUserLocation([-23.5505, -46.6333]);
    }
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    alert("Erro ao buscar CEP. Tente novamente.");
  } finally {
    setLoading(false);
  }
};

// HOSPITAIS REAIS DE SÃO PAULO
const hospitais = [
  {
    id: 1,
    nome: "Hospital das Clínicas da USP",
    coordenadas: [-23.5575, -46.6759],
    endereco: "Av. Dr. Enéas de Carvalho Aguiar, 255 - Cerqueira César",
    telefone: "(11) 2661-0000",
    especialidades: "Emergência, Clínica Geral, Cirurgias",
  },
  {
    id: 2,
    nome: "Hospital Alemão Oswaldo Cruz",
    coordenadas: [-23.5628, -46.6562],
    endereco: "Rua João Julião, 331 - Paraíso",
    telefone: "(11) 3549-0000",
    especialidades: "Emergência, Cardiologia, Oncologia",
  },
  {
    id: 3,
    nome: "Hospital Santa Catarina",
    coordenadas: [-23.5744, -46.6572],
    endereco: "Av. Paulista, 200 - Bela Vista",
    telefone: "(11) 3015-0000",
    especialidades: "Emergência, Maternidade, Pediatria",
  },
  {
    id: 4,
    nome: "Hospital Sírio-Libanês",
    coordenadas: [-23.5653, -46.6635],
    endereco: "Rua Dona Adma Jafet, 91 - Bela Vista",
    telefone: "(11) 3155-0000",
    especialidades: "Emergência, Cardiologia, Neurologia",
  },
  {
    id: 5,
    nome: "Hospital São Camilo",
    coordenadas: [-23.5489, -46.6419],
    endereco: "Rua Doutor Plínio de Queirós, 15 - Ipiranga",
    telefone: "(11) 2067-0000",
    especialidades: "Emergência, Ortopedia, Clínica Médica",
  },
  {
    id: 6,
    nome: "Hospital Beneficência Portuguesa",
    coordenadas: [-23.5598, -46.6485],
    endereco: "Rua Maestro Cardim, 769 - Bela Vista",
    telefone: "(11) 3505-0000",
    especialidades: "Emergência, Cardiologia, Transplantes",
  },
];

// Ícones personalizados
const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
  iconSize: [35, 35],
  iconAnchor: [17.5, 35],
  popupAnchor: [0, -35],
});

const hospitalSelecionadoIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
  iconSize: [55, 55],
  iconAnchor: [27.5, 55],
  popupAnchor: [0, -55],
  className: styles.markerSelecionado,
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const LocalHospital = () => {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState([-23.5505, -46.6333]);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [popupOpenId, setPopupOpenId] = useState(null);
  const mapRef = useRef(null);
  const mapaSectionRef = useRef(null);

  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const calcularTempoEstimado = (distancia) => {
    const tempoMinutos = Math.round(distancia * 3);
    if (tempoMinutos < 60) return `${tempoMinutos} min`;
    return `${Math.floor(tempoMinutos / 60)}h ${tempoMinutos % 60}min`;
  };

  const hospitaisOrdenados = [...hospitais].sort((a, b) => {
    const distA = calcularDistancia(
      userLocation[0], userLocation[1],
      a.coordenadas[0], a.coordenadas[1]
    );
    const distB = calcularDistancia(
      userLocation[0], userLocation[1],
      b.coordenadas[0], b.coordenadas[1]
    );
    return distA - distB;
  });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      buscarCEP(cep, setEndereco, setUserLocation, setLoading);
    }
  };

  const centralizarNoHospital = (hospital) => {
    setSelectedHospitalId(hospital.id);
    setPopupOpenId(hospital.id);
    
    if (mapRef.current) {
      mapRef.current.setView(hospital.coordenadas, 16);
    }
    
    if (mapaSectionRef.current) {
      mapaSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getHospitalIcon = (hospital) => {
    return selectedHospitalId === hospital.id ? hospitalSelecionadoIcon : hospitalIcon;
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.tituloHospital}>Hospitais próximos</h1>
        
        <div className={styles.cepBox}>
          <input
            type="text"
            placeholder="Digite seu CEP e pressione Enter"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={9}
            disabled={loading}
            autoFocus
          />
          <button 
            onClick={() => buscarCEP(cep, setEndereco, setUserLocation, setLoading)}
            disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
        
        {endereco && <div className={styles.endereco}>{endereco}</div>}
      </div>

      {/* MAPA CENTRALIZADO */}
      <div className={styles.mapaSection} ref={mapaSectionRef}>
        <div className={styles.mapaContainer}>
          <MapContainer
            key={userLocation[0]}
            center={userLocation}
            zoom={13}
            className={styles.mapa}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={userLocation} icon={userIcon}>
              <Popup>
                <div className={styles.popupContent}>
                  <strong>Sua localização</strong>
                  <br />
                  {endereco || "Localização atual"}
                </div>
              </Popup>
            </Marker>

            {hospitaisOrdenados.map((hospital) => {
              const distancia = calcularDistancia(
                userLocation[0], userLocation[1],
                hospital.coordenadas[0], hospital.coordenadas[1]
              );
              
              return (
                <Marker
                  key={hospital.id}
                  position={hospital.coordenadas}
                  icon={getHospitalIcon(hospital)}
                  eventHandlers={{
                    click: () => {
                      setSelectedHospitalId(hospital.id);
                      setPopupOpenId(hospital.id);
                    },
                  }}
                >
                  {popupOpenId === hospital.id && (
                    <Popup onClose={() => setPopupOpenId(null)} autoPan={true}>
                      <div className={styles.popupContent}>
                        <strong>{hospital.nome}</strong>
                        <br />
                        <strong>Tempo estimado:</strong> {calcularTempoEstimado(distancia)}
                        <br />
                        {hospital.especialidades}
                        <br />
                        {hospital.endereco}
                        <br />
                        <strong>Distância:</strong> {distancia.toFixed(1)} km
                        <br />
                        {hospital.telefone}
                      </div>
                    </Popup>
                  )}
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* LISTA DE HOSPITAIS */}
      <div className={styles.hospitaisSection}>
        <div className={styles.sectionHeader}>
          <h2>Hospitais próximos a você</h2>
          <span className={styles.quantidade}>{hospitaisOrdenados.length} unidades</span>
        </div>
        
        <div className={styles.listaHospitais}>
          {hospitaisOrdenados.map((hospital) => {
            const distancia = calcularDistancia(
              userLocation[0], userLocation[1],
              hospital.coordenadas[0], hospital.coordenadas[1]
            );
            
            return (
              <div 
                className={`${styles.cardHospital} ${selectedHospitalId === hospital.id ? styles.cardSelecionado : ''}`} 
                key={hospital.id}
              >
                <div className={styles.cardHeader}>
                  <h3>{hospital.nome}</h3>
                </div>
                
                <div className={styles.cardInfo}>
                  <p><strong>Especialidades:</strong> {hospital.especialidades}</p>
                  <p><strong>Endereço:</strong> {hospital.endereco}</p>
                  <p><strong>Distância:</strong> {distancia.toFixed(1)} km</p>
                  <p><strong>Telefone:</strong> {hospital.telefone}</p>
                </div>
                
                <button 
                  className={styles.verMapaBtn}
                  onClick={() => centralizarNoHospital(hospital)}
                >
                  Ver no mapa
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAIXA DE INFORMAÇÕES COM ÍCONES SVG */}
      <div className={styles.infoFooter}>
        <div className={styles.infoContainer}>
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div className={styles.infoText}>
              <h4>Atualização em tempo real</h4>
              <p>Informações sempre atualizadas</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 12 2 21 11 18 11 18 22 6 22 6 11 3 11"/>
              </svg>
            </div>
            <div className={styles.infoText}>
              <h4>Veja rotas rápidas</h4>
              <p>Melhor caminho até o hospital</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8v4l3 3M12 22C7 22 3 18 3 13V6l9-4 9 4v7c0 5-4 9-9 9z"/>
              </svg>
            </div>
            <div className={styles.infoText}>
              <h4>Emergência?</h4>
              <p>Ligue <strong>192</strong> ou vá ao hospital</p>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12" y2="18"/>
              </svg>
            </div>
            <div className={styles.infoText}>
              <h4>Precisa de ajuda?</h4>
              <p>Central <strong>0800 123 4567</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LocalHospital };