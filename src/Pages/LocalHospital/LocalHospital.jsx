import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./LocalHospital.module.css";
import { useState } from "react";
import { buscarCEP } from "../../Backend/API/geolocalizacao.js";

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

// ícone customizado
const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const LocalHospital = () => {

  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");

  return (
    <section className={styles.hospitais}>

      <h2 className={styles.tituloHospital}>
        Hospitais próximos
      </h2>

      <p className={styles.subtituloHospital}>
        Veja a localização e o tempo médio de espera em cada unidade.
      </p>

      {/* FORMULÁRIO CEP */}
      <div className={styles.cepBox}>

        <input
          type="text"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />

        <button onClick={() => buscarCEP(cep, setEndereco)}>
          Buscar
        </button>

      </div>

      {/* ENDEREÇO RETORNADO */}
      <div className={styles.endereco}>
        {endereco}
      </div>

      <div className={styles.containerHospitais}>

        {/* MAPA */}
        <div className={styles.mapa}>

          <MapContainer
            center={[-23.55052, -46.633308]}
            zoom={14}
            style={{
              height: "400px",
              width: "100%",
              borderRadius: "12px",
            }}
          >

            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {hospitais.map((h, index) => (

              <Marker
                key={index}
                position={h.coordenadas}
                icon={hospitalIcon}
              >

                <Popup>
                  <strong>{h.nome}</strong>
                  <br />
                  Tempo de espera: {h.tempo}
                  <br />
                  {h.endereco}
                </Popup>

              </Marker>

            ))}

          </MapContainer>

        </div>

        {/* LISTA */}
        <div className={styles.listaHospitais}>

          {hospitais.map((h, index) => (

            <div
              className={styles.cardHospitais}
              key={index}
            >

              <h3>{h.nome}</h3>

              <p>
                <strong>Tempo de espera:</strong> {h.tempo}
              </p>

              <p>
                <strong>Endereço:</strong> {h.endereco}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export { LocalHospital };