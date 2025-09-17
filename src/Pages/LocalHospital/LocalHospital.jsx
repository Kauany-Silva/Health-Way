import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from './LocalHospital.module.css';

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

export {LocalHospital};
