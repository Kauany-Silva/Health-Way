import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../Cadastro/Cadastro.module.css";

const Login = () => {
  const [name, setName] = useState(""); // estado para armazenar o nome do usuario 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // salva o nome no localStorage
    localStorage.setItem("usuario", name);

    // futura validação poderia entrar aqui (ex: checar email/senha)
    navigate("/dashboard");
  };

  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.titulo}>
          <h1>Health Way</h1>
        </div>
        <h2 className={style.tituloLoginCadastro}>Login</h2>

        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.inputWrapper}>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)} // pega o nome digitado
              required
            />
          </div>
          
          <div className={style.inputWrapper}>
            <input type="email" placeholder="Email" required />
          </div>
          <div className={style.inputWrapper}>
            <input type="password" placeholder="Senha" required />
          </div>
          <button type="submit" className={style.submitBtn}>
            Entrar
          </button>
        </form>

        <p className={style.loginText}>
          Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export {Login};
