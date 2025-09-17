import style from './Menu.module.css';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className={style.menu}>
            <ul>
                <li>Início</li>
                <li>Sobre Nós</li>
                <li>Recursos</li>
                <li>Contato</li>
            </ul>
        </nav>
    );
};

export {Menu};
