import style from "./NotFound.module.css";
import { Link } from "react-router-dom";
import HToy2 from "../../Assets/Imagens/HToy2.png";

const NotFound = () => {
  return (
    
    <div className={style.box}>
    <div className={style.titulo}>  <h1> Health Way</h1></div>  
    <img src={HToy2} alt="HToy" />
    <h1 className={style.notfound}>404 - Página não encontrada</h1>
    <p className={style.mensagem}>A página que você procura não existe.</p>
    <Link to="/">Voltar para a página inicial</Link>
    
    </div>
  );
};

export { NotFound };
