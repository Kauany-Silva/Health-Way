import { Link } from "react-router-dom";
import style from "./Cadastro.module.css";
import heroVideo from "../../Assets/Videos/hero.mp4";

const Cadastro=()=> {

  return (
    
    <div className={style.container}>

      <section className={style.hero}>
        <video autoPlay loop muted playsInline className={style.videoBg}>
          <source src={heroVideo} type="video/mp4"/>
        </video>
      </section>

      <div className={style.box}>
        <div className={style.titulo}>  <h1> Health Way</h1></div>
        <h2 className={style.tituloLoginCadastro}>Cadastro</h2>
        <form className={style.form}>
          <div className={style.inputWrapper}>
            <input type="text" placeholder="Nome completo" required />
          </div>
          <div className={style.inputWrapper}>
            <input type="email" placeholder="Email" required />
          </div>
          <div className={style.inputWrapper}>
            <input type="text" placeholder="CPF" required />
          </div>
          <div className={style.inputWrapper}>
            <input type="text" placeholder="Endereço" required />
          </div>
          <div className={style.inputWrapper}>
            <input type="password" placeholder="Senha" required />
          </div>
          <button type="submit" className={style.submitBtn}>
            Cadastrar
          </button>
        </form>

        <p className={style.loginText}>
          Já tem conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
};
export {Cadastro}
