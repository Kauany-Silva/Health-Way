import style from './Cabecalho.module.css';
import Logo from '../../Assets/Imagens/Logo.png'


const Cabecalho = ({ titulo }) => {
    
    return (
        <header className={style.Cabecalho}>
            <img src={Logo} alt='Logo Health Way'></img>
            <h1>{titulo}</h1>
        </header>
    );
};

export{Cabecalho};
