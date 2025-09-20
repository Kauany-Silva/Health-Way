import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaVolumeUp, FaPlus, FaMinus, FaRedo } from "react-icons/fa";
import styles from "./PainelAcessibilidade.module.css";

const PainelAcessibilidade = () => {
  // Estados
  const [fontSize, setFontSize] = useState(16);
  const [contrasteAtivo, setContrasteAtivo] = useState(false);
  const [modoLeitura, setModoLeitura] = useState(false);

  // Atualiza a fonte global
  useEffect(() => {
    document.documentElement.style.setProperty("--font-base", `${fontSize}px`);
  }, [fontSize]);

  // Alterna alto contraste
  useEffect(() => {
    if (contrasteAtivo) {
      document.documentElement.style.setProperty("--bg-color", "#121212"); // fundo escuro
      document.documentElement.style.setProperty("--text-color", "#ffffff"); // texto branco
      document.documentElement.style.setProperty("--aMedio", "#1e88e5"); // azul contraste
    } else {
      // Valores padrão
      document.documentElement.style.setProperty("--bg-color", "var(--aClaro)");
      document.documentElement.style.setProperty("--text-color", "var(--aEscuro)");
      document.documentElement.style.setProperty("--aMedio", "#0077ff");
    }
  }, [contrasteAtivo]);

  // Modo leitura (mouseover desktop e toque mobile)
  useEffect(() => {
    const speakText = (texto) => {
      if (!texto || texto.trim() === "") return;
      window.speechSynthesis.cancel();
      const mensagem = new SpeechSynthesisUtterance(texto);
      window.speechSynthesis.speak(mensagem);
    };

    const handleMouseOver = (e) => {
      if (!modoLeitura) return;
      const texto = e.target.innerText || e.target.alt || "";
      speakText(texto);
    };

    const handleClick = (e) => {
      if (!modoLeitura) return;
      const texto = e.target.innerText || e.target.alt || "";
      speakText(texto);
    };

    if (modoLeitura) {
      document.addEventListener("mouseover", handleMouseOver);
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("click", handleClick);
    };
  }, [modoLeitura]);

  return (
    <div className={styles.painel}>
      {/* Controle de fonte */}
      <div className={styles.controleFonte}>
        <button onClick={() => setFontSize(prev => Math.max(prev - 2, 12))}>
          <span className={styles.desktop}>A-</span>
          <FaMinus className={styles.mobile} />
        </button>

        <span className={`${styles.valor} ${styles.desktop}`}>{fontSize}px</span>

        <button onClick={() => setFontSize(prev => Math.min(prev + 2, 30))}>
          <span className={styles.desktop}>A+</span>
          <FaPlus className={styles.mobile} />
        </button>

        <button onClick={() => setFontSize(16)}>
          <span className={styles.desktop}>Reset</span>
          <FaRedo className={styles.mobile} />
        </button>
      </div>

      {/* Alto contraste */}
      <div className={styles.contraste}>
        <button onClick={() => setContrasteAtivo(prev => !prev)}>
          <span className={styles.desktop}>
            {contrasteAtivo ? "Normal" : "Alto Contraste"}
          </span>
          {contrasteAtivo ? <FaSun className={styles.mobile} /> : <FaMoon className={styles.mobile} />}
        </button>
      </div>

      {/* Modo leitura */}
      <div className={styles.leitor}>
        <button onClick={() => setModoLeitura(prev => !prev)}>
          <span className={styles.desktop}>
            {modoLeitura ? "Desativar Leitor" : "Ativar Leitor"}
          </span>
          <FaVolumeUp className={styles.mobile} />
        </button>
      </div>
    </div>
  );
};

export { PainelAcessibilidade };
