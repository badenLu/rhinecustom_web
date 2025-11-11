import React, { useState, useRef, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import "./Navbar.css";
import logo from '../assets/images/logo/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faUser, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useTranslation  } from "react-i18next";

// 导入默认头像图片
import defaultMrAvatar from '../assets/images/avatar/default_mr.png';
import defaultMsAvatar from '../assets/images/avatar/default_ms.png';
import defaultMxAvatar from '../assets/images/avatar/default_mx.png';

const Navbar = ({ onLoginClick, user, onLogout }) => { //接收onLoginClick作为props
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const langMenuRef = useRef(null);

    const [ isOpen, setIsOpen ] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const menuRef = useRef(null); 

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang); 
        setIsLangMenuOpen(false); 
      };
    
    //处理用户下拉菜单
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    //处理logout事件
    const handleLogout = () => {
        onLogout();
      };

    //点击外部区域时关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }

            if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
                setIsLangMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid"> {/* 添加 .container 类 */}
            {/* Logo */}
            <a className="navbar-brand" href="/">
             <div className="logo-container">
                <img src={logo} alt="RhineCustom Logo" className="logo-img"/>
                <span className="company-name">RhineCustom</span>
             </div>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>

            {/* Main Navigation */}
            <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" end>
                            {t('navbar.homepage')}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/destinations">
                            {t('navbar.destinations')}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/routes">
                            {t('navbar.routes')}
                            <FontAwesomeIcon icon={faFire} className="ms-1 fa-beat" style={{ color: "orange" }} />
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/contact">
                            {t('navbar.contact')}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">
                          {t('navbar.aboutUs')}
                        </NavLink>
                    </li>
                </ul>

                <div className="d-flex align-items-center">
                     {user ? (
                        <div className="user-menu-container" ref={menuRef}>
                            {/* 点击头像或文字时展开菜单 */}
                            <div className="d-flex align-items-center user-info" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faUser} className="user-icon me-2" />
                            <span>{t('navbar.hello')}, {user.first_name}</span>
                            </div>
                            {/* 下拉菜单 */}
                            {isMenuOpen && (
                            <div className="user-dropdown-menu">
                              {/* 下拉菜单顶部：头像区域 */}
                              <div className="dropdown-header text-center">
                                <div className="avatar-area">
                                  {user.avatar ? (
                                    <img src={user.avatar} alt="avatar" className="dropdown-avatar" />
                                  ) : (
                                    <img
                                        src={
                                            user.title === "mr"
                                                ? defaultMrAvatar
                                                : user.title === "ms"
                                                ? defaultMsAvatar
                                                : defaultMxAvatar
                                        }
                                        alt="default avatar"
                                        className="dropdown-avatar"
                                    />
                                  )}
                                </div>
                                <a href="/profile" className="user-name-link">
                                  <p className="user-name">{user.first_name}&nbsp;&nbsp;{user.last_name}</p>
                                </a>
                                <p className="user-email">{user.email}</p>
                              </div>
                              {/* 下拉菜单主体：菜单选项 */}
                              <div className="dropdown-body">
                                <ul className="list-unstyled">
                                  <li><a href="/profile" className="dropdown-item">{t('navbar.personalData')}</a></li>
                                  <li><a href="/activities" className="dropdown-item">{t('navbar.personalActivities')}</a></li>
                                  <li><a href="/comments" className="dropdown-item">{t('navbar.personalComments')}</a></li>
                                </ul>
                              </div>
                              {/* 下拉菜单底部：退出登录 */}
                              <div className="dropdown-footer">
                                <button onClick={handleLogout} className="dropdown-item">{t('navbar.logout')}</button>
                              </div>
                            </div>
                            )}
                        </div>
                    ) : (
                    <button className="me-2" onClick={onLoginClick}>
                        {t('navbar.login')}
                    </button>
                    )}
                </div>

                <div className="language-selector-container" ref={langMenuRef}>
                    <div 
                        className="language-display d-flex align-items-center" 
                        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    >
                        <FontAwesomeIcon icon={faGlobe} className="me-1 " />
                        {language === 'en' ? 'EN' : '中文'}
                    </div>

                    {isLangMenuOpen && (
                        <div className="language-dropdown-menu">
                        <div 
                            className="dropdown-item" 
                            onClick={() => handleLanguageChange('en')}
                        >
                            English
                        </div>
                        <div 
                            className="dropdown-item"
                            onClick={() => handleLanguageChange('zh')}
                        >
                            中文
                        </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;
