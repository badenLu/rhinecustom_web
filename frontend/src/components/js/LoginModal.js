import React, { useState } from "react";
import "../css/Modal.css";
import logo from '../../assets/images/logo/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from "react-i18next";
import API_URL from "../../config";

function LoginModal({ isOpen, onClose, onSwitchToRegister, setUser }) {

    const [email, setEmail] = useState(""); //backend
    const [password, setPassword] = useState(""); //backend
    const [passwordVisible, setPasswordVisible ] = useState(false);
    const [error, setError] = useState("") //backend
    const {t} = useTranslation();

    if (!isOpen) return null;

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    //backend
    const handleLogin = async(e) => {
      e.preventDefault();
      setError(""); //清空错误信息
      
      try {
        const response = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token); // 存储 Token
            setUser(data.user); // 更新用户状态
            // 获取用户信息
            const userResponse = await fetch(`${API_URL}/api/me`, {
              method: "GET",
              headers: {
                  "Authorization": `Bearer ${data.token}`,
                  "Content-Type": "application/json"
              }
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                setUser(userData.user);
            }
            onClose(); // 关闭模态框
        } else {
            setError(data.message || "Login failed.");
        }
      } catch (error) {
          setError("Network error. Please try again.");
      }
    };


    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
           <div className="logo-container">
                <img src={logo} alt="RhineCustom Logo" className="logo-img"/>
                <span className="company-name">RhineCustom</span>
            </div>
          <h2 className="mb-3">{t('login.loginToStart')}</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3 text-start">
              <label htmlFor="email">{t('login.emailAddress')}</label>
              <input type="email" id="email" name="email" className="form-control" placeholder={t('login.enterEmailAddress')} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group mb-3 text-start">
              <label htlmFor="password">{t('login.password')}</label>
              <div className="password-input-wrapper">
                  <input type={passwordVisible ? "text" : "password"} id="password" name="password"  className="form-control" placeholder={t('login.enterPassword')}
                  value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button type="button" className="password-toggle-btn" onClick={togglePasswordVisibility} aria-label="Toggle password visibility">
                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} className="icon-style"/>
                  </button>
              </div>

            </div>
            <button type="submit" className="w-100 mb-3">
                {t('login.login')}
            </button>
            <div>
                <p>————— {t('login.notMember')} —————</p>
                <p><button type="button" className="btn-link" onClick={onSwitchToRegister}><strong>{t('login.joinNow')}</strong></button>{" "}
                    {t('login.andEnjoy')}
            </p>
            </div>
          </form>

        </div>
      </div>
    );
}

export default LoginModal;