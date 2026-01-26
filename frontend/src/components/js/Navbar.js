import React, { useState, useRef, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import "../css/Navbar.css";
import logo from '../../assets/images/logo/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faUser, faGlobe, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useTranslation  } from "react-i18next";

// 导入默认头像图片
import defaultMrAvatar from '../../assets/images/avatar/default_mr.png';
import defaultMsAvatar from '../../assets/images/avatar/default_ms.png';
import defaultMxAvatar from '../../assets/images/avatar/default_mx.png';

const Navbar = ({ onLoginClick, user, onLogout }) => {
    const { t, i18n } = useTranslation();
    const language = i18n.language;
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const langMenuRef = useRef(null);

    const [ isOpen, setIsOpen ] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // 关闭移动端菜单
    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);
        setIsLangMenuOpen(false);
    };

    // 处理用户下拉菜单
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // 处理logout事件
    const handleLogout = () => {
        onLogout();
    };

    // 点击外部区域时关闭下拉菜单
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

    // 阻止body滚动（当菜单打开时）
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* 半透明遮罩层 */}
            {isOpen && <div className="menu-overlay" onClick={closeMenu}></div>}

            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    {/* Logo */}
                    <a className="navbar-brand" href="/frontend/public">
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
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                    >
                        {isOpen ? (
                            <FontAwesomeIcon icon={faTimes} className="close-icon" />
                        ) : (
                            <span className="navbar-toggler-icon"></span>
                        )}
                    </button>

                    {/* Main Navigation */}
                    <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" end onClick={closeMenu}>
                                    {t('navbar.homepage')}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/destinations" onClick={closeMenu}>
                                    {t('navbar.destinations')}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/routes" onClick={closeMenu}>
                                    {t('navbar.routes')}
                                    <FontAwesomeIcon icon={faFire} className="ms-1 fa-beat" style={{ color: "orange" }} />
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact" onClick={closeMenu}>
                                    {t('navbar.contact')}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about" onClick={closeMenu}>
                                    {t('navbar.aboutUs')}
                                </NavLink>
                            </li>
                        </ul>

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
        </>
    );
};

export default Navbar;
