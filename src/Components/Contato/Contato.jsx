import React from "react";
import styles from "./Contato.module.css";

const Contato = () => {
  return (
    <section className={styles.contato}>
      <div className={styles.containerContato}>
       
        <div className={styles.infoContato}>
          <h2>Contato</h2>
          <p>
            Quer saber mais ou tem alguma dúvida?  
            Preencha o formulário ao lado e responderemos o quanto antes.
          </p>
          <p>Kauany Silva:          <span className={styles.instagram}>@kauanycsilva._</span></p>
          <p>Livia Paiva:          <span  className={styles.instagram}>@wtf_lica</span></p>
          <p>Maria Julia:          <span className={styles.instagram}>@maria_julia1410</span></p>
          <p>Yasmin Salgado:          <span className={styles.instagram}>@piresmim_</span></p>
          <p>(12) 99211-8277</p>
        </div>

        <form className={styles.formContato}>
          <input
            type="text"
            className={styles.inputContato}
            placeholder="Seu Nome"
            required
          />
          <input
            type="email"
            className={styles.inputContato}
            placeholder="Seu Email"
            required
          />
          <textarea
            className={styles.inputContato}
            placeholder="Sua Mensagem"
            rows="5"
            required
          ></textarea>
          <button type="submit" className={styles.botaoContato}>
            Enviar Mensagem
          </button>
        </form>
      </div>
    </section>
  );
};

export {Contato};
