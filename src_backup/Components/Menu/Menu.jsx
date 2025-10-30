import style from './Menu.module.css';

const Menu = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={style.menu}>
      <ul>
        <li onClick={() => scrollToSection('inicio')}>Início</li>
        <li onClick={() => scrollToSection('sobre')}>Sobre Nós</li>
        <li onClick={() => scrollToSection('recursos')}>Recursos</li>
        <li onClick={() => scrollToSection('contato')}>Contato</li>
      </ul>
    </nav>
  );
};

export { Menu };
