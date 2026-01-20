import React, { useState } from "react";
import "./Modal.css";
import logo from '../assets/images/logo/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from "react-i18next";

function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
   
    //backend
    const [formData, setFormData] = useState({
      title: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      marketingEmails: false

    });

    const [passwordVisible, setPasswordVisible ] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible ] = useState(false);
    const [marketingEmails, setMarketingEmails ] = useState(false);
    const [alert, setAlert] = useState({ message: "", type: "" });
    const {t} = useTranslation();

    if (!isOpen) return null;

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    }

    const toggleSetPasswordVisibility = () => {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }

    const handleMarketingEmailsChange = (e) => {
      setMarketingEmails(e.target.checked);
    }

    //处理输入框的变化
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value
      });
    };

    //backend
    const handleRegister = async (e) => {
      e.preventDefault();
      setAlert({ message: "", type: "" });

      try {
          const response = await fetch("https://rhinecustom.onrender.com/api/register", {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json" 
              },
              body: JSON.stringify({
                ...formData,
                marketingEmails: marketingEmails // 确保这个值被发送
            })
          });

          const data = await response.json();
          if (response.ok) {
              localStorage.setItem("token", data.token); // 存储 Token
              setAlert({ message: "Congratulations! You have already successfully registered!", type: "success" });
              // 2 秒后关闭注册模态框并切换到登录界面
              setTimeout(() => {
                onClose();
                onSwitchToLogin();
              }, 2000);
        
              onSwitchToLogin();
          } else {
              let errorMessage = "";
              if (data.errors) {
                // 获取所有错误数组并展开，再只取第一个错误
                const errorList = Object.values(data.errors).flat();
                errorMessage = errorList[0];
              } else {
                errorMessage = data.message || "Registration failed.";
              }
              setAlert({ message: data.message || "Registration failed.", type: "warning" });
          }
        } catch (error) {
          setAlert({ message: "Network error. Please try again.", type: "warning" });
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
          <h2 className="mb-3">{t('register.joinUs')}</h2>

          {alert.message && (
            <div className={`alert ${alert.type === "success" ? "alert-success" : "alert-warning"}`} role="alert">
              {alert.message}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-row mb-3">
              <div className="form-group text-start flex-item">
                <label htmlFor="title">{t('register.title')}</label>
                <div className="custom-select">
                  <select id="title" name="title" className="form-control" value={formData.title} onChange={handleInputChange} required>
                      <option value="" disabled selected>{t('register.selectTitle')}</option>
                      <option value="mr">{t('register.mr')}</option>
                      <option value="ms">{t('register.ms')}</option>
                      <option value="mx">{t('register.mx')}</option>
                  </select>
                </div>
              </div>
              <div className="form-group text-start flex-item">
                  <label htmlFor="first_name">{t('register.firstName')}</label>
                  <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      className="form-control"
                      placeholder={t('register.firstName')}
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                  />
              </div>
              <div className="form-group text-start flex-item">
                  <label htmlFor="last_name">{t('register.lastName')}</label>
                  <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      className="form-control"
                      placeholder={t('register.lastName')}
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                  />
              </div>
            </div>
            <div className="form-group mb-3 text-start">
              <label htmlFor="email">{t('register.emailAddress')}</label>
              <input type="email" id="email" name="email" className="form-control" placeholder={t('register.enterEmailAddress')} value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group mb-3 text-start">
              <label htmlFor="password">{t('register.password')}</label>
              <div className="password-input-wrapper">
                  <input type={passwordVisible ? "text" : "password"} id="password" name="password"  className="form-control" placeholder={t('register.enterPassword')}
                  value={formData.password} onChange={handleInputChange} required />
                  <button type="button" className="password-toggle-btn" onClick={togglePasswordVisibility} aria-label="Toggle password visibility">
                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} className="icon-style"/>
                  </button>
              </div>
              <small className="password-hint">
                  {t('register.passwordHint')}
              </small>
            </div>
            <div className="form-group mb-3 text-start">
              <label htmlFor="password_confirmation">{t('register.confirmPassword')}</label>
              <div className="password-input-wrapper">
                  <input type={confirmPasswordVisible ? "text" : "password"} id="password_confirmation" name="password_confirmation"  className="form-control" placeholder={t('register.enterPassword')}
                  value={formData.password_confirmation} onChange={handleInputChange} required />
                  <button type="button" className="password-toggle-btn" onClick={toggleSetPasswordVisibility} aria-label="Toggle password visibility">
                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} className="icon-style"/>
                  </button>
              </div>
            </div>
            <div className="form-group mb-3 text-start">
              <label>
                  <input
                      type="checkbox"
                      id="marketing-emails"
                      name="marketingEmails"
                      checked={marketingEmails}
                      onChange={handleMarketingEmailsChange}
                  />
                  {" "}{t('register.marketing')}
              </label>
            </div>
            <button type="submit" className="w-100 mb-3">
                {t('register.createAccount')}
            </button>
            <div>
                <p>————— {t('register.alreadyIn')} —————</p>
                <p><button type="button" className="btn-link" onClick={onSwitchToLogin}><strong>{t('register.loginHere')}</strong></button>{" "}
                    {t('register.unlock')}</p>
            </div>
          </form>

        </div>
      </div>
    );
}

export default RegisterModal;