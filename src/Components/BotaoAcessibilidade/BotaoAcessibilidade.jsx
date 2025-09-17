import React, { useState, useEffect } from "react"; 
import { FaVolumeUp } from "react-icons/fa"; 
import styles from "./BotaoAcessibilidade.module.css";

const BotaoAcessibilidade = () => {
  const [leitorAtivo, setLeitorAtivo] = useState(false);

  const alternarContraste = () => {
    document.body.classList.toggle("alto-contraste");
  };

  const alternarLeitorTela = () => {
    setLeitorAtivo(!leitorAtivo);
    window.speechSynthesis.cancel();
  };

  const leituraGlobal = (event) => {
    // Evita ler os próprios botões
    if (
      event.target.closest("." + styles.botaoAcessibilidade) ||
      event.target.closest("." + styles.botaoAcessibilidade2)
    ) {
      return;
    }

    let texto = event.target.innerText || event.target.alt || event.target.title;

    if (!texto && event.target.querySelector) {
      const filhoComTexto = event.target.querySelector("p, h1, h2, h3, span, a");
      if (filhoComTexto) texto = filhoComTexto.innerText || filhoComTexto.textContent;
    }

    if (texto) {
      const utterance = new SpeechSynthesisUtterance(texto.trim());
      utterance.lang = "pt-BR";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (leitorAtivo) {
      document.body.addEventListener("mouseover", leituraGlobal);
      document.body.addEventListener("focusin", leituraGlobal);
    } else {
      document.body.removeEventListener("mouseover", leituraGlobal);
      document.body.removeEventListener("focusin", leituraGlobal);
    }

    return () => {
      document.body.removeEventListener("mouseover", leituraGlobal);
      document.body.removeEventListener("focusin", leituraGlobal);
    };
  }, [leitorAtivo]);

  return (
    <div className={styles.botaoContainer}>
      <button
        data-acessibilidade="contraste"
        className={styles.botaoAcessibilidade}
        onClick={alternarContraste}
      >
        Alto Contraste
      </button>
      <button
        data-acessibilidade="leitor"
        className={styles.botaoAcessibilidade2}
        onClick={alternarLeitorTela}
      >
        <FaVolumeUp /> {leitorAtivo ? "Desativar Leitor" : "Ativar Leitor"}
      </button>
    </div>
  );
};

export{BotaoAcessibilidade};
