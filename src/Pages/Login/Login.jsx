import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../Cadastro/Cadastro.module.css";
import { useAuth } from "../../Context";

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth(); // pega a função para atualizar o user

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("usuario", name);
    setUser(name); // atualiza o contexto, agora RotasPrivadas vai liberar
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
};

export {Login};