import React from 'react';
import { Link } from "react-router-dom";
import logo from '../image/logo/Vector.svg'
// компанент Header (шапка)
function Header({ mail, route, onClick, title }) {

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);


  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (windowWidth > 500) {
      setMenuOpen(false);
    }
  }, [windowWidth]);

  // проверяем, находимся ли мы на странице входа или регистрации
  const isAuthPage = route === '/sign-in' || route === '/sign-up';

  // разметка
  return (
    <header className={`header ${menuOpen && !isAuthPage ? 'header__auth-active' : ''}`}>
      <img className="header__logo" src={logo} alt="логотип mesto Russia" />
      {isAuthPage ? (
        <Link to={route} className="header__link-entrance" type="button" onClick={onClick}>{title}</Link>
      ) : (
        <nav className={`header__auth ${menuOpen ? 'header__auth-open' : ''}`}>
          <p className="header__text">{mail}</p>
          <Link to={route} className="header__link" type="button" onClick={onClick}>{title}</Link>
        </nav>
      )}
      {!isAuthPage && (
        <div className={`header__burger ${menuOpen ? 'header__burger-open' : ''}`} onClick={handleMenuToggle}>
          <div className="header__burger-line"></div>
          <div className="header__burger-line"></div>
          <div className="header__burger-line"></div>
        </div>
      )}
    </header>
  )
}

export default Header;