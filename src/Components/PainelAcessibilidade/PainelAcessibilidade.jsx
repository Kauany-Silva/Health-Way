import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaVolumeUp, FaPlus, FaMinus, FaRedo, FaUniversalAccess } from "react-icons/fa";
import styles from "./PainelAcessibilidade.module.css";

const PainelAcessibilidade = () => {
  const [aberto, setAberto] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [contrasteAtivo, setContrasteAtivo] = useState(false);
  const [modoLeitura, setModoLeitura] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-base", `${fontSize}px`);
  }, [fontSize]);

  // Alterna alto contraste
  useEffect(() => {
    if (contrasteAtivo) {
      document.documentElement.style.setProperty("--bg-color", "var(--aEscuro)");
      document.documentElement.style.setProperty("--text-color", "var(--offwhite)");
      document.documentElement.style.setProperty("--aMedio", "#1e88e5");
    } else {
      document.documentElement.style.setProperty("--bg-color", "var(--aClaro)");
      document.documentElement.style.setProperty("--text-color", "var(--aEscuro)");
      document.documentElement.style.setProperty("--aMedio", "#0077ff");
    }
  }, [contrasteAtivo]);

  useEffect(() => {
    const speakText = (texto) => {
      if (!texto) return;
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(texto);
      window.speechSynthesis.speak(msg);
    };

    const handle = (e) => {
      if (!modoLeitura) return;
      const texto = e.target.innerText || e.target.alt || "";
      speakText(texto);
    };

    if (modoLeitura) {
      document.addEventListener("mouseover", handle);
      document.addEventListener("click", handle);
    }

    return () => {
      document.removeEventListener("mouseover", handle);
      document.removeEventListener("click", handle);
    };
  }, [modoLeitura]);

  return (
    <>
      <button 
        className={styles.botaoAcessibilidade}
        onClick={() => setAberto(!aberto)}
      >
        < FaUniversalAccess/>
      </button>

      {aberto && (
        <div className={styles.painel}>
          
          <div className={styles.linha}>
            <button onClick={() => setFontSize((p) => Math.max(p - 2, 12))}>
              <FaMinus />
            </button>

            <span>{fontSize}px</span>

            <button onClick={() => setFontSize((p) => Math.min(p + 2, 30))}>
              <FaPlus />
            </button>

            <button onClick={() => setFontSize(16)}>
              <FaRedo />
            </button>
          </div>

          <button 
            className={styles.botao}
            onClick={() => setContrasteAtivo((p) => !p)}
          >
            {contrasteAtivo ? <FaSun /> : <FaMoon />}
            {contrasteAtivo ? " Modo Claro" : " Modo Escuro"}
          </button>

          <button 
            className={styles.botao}
            onClick={() => setModoLeitura((p) => !p)}
          >
            <FaVolumeUp />
            {modoLeitura ? " Desligar Leitor" : " Ligar Leitor"}
          </button>

        </div>
      )}
    </>
  );
};

export { PainelAcessibilidade };