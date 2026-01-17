import React, { useState } from "react";
import "./Modal.css";
import logo from '../assets/images/logo/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function LoginModal({ isOpen, onClose, onSwitchToRegister, setUser }) {

    const [email, setEmail] = useState(""); //backend
    const [password, setPassword] = useState(""); //backend
    const [passwordVisible, setPasswordVisible ] = useState(false);
    const [error, setError] = useState("") //backend

    if (!isOpen) return null;

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    //backend
    const handleLogin = async(e) => {
      e.preventDefault();
      setError(""); //清空错误信息
      
      try {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token); // 存储 Token
            setUser(data.user); // 更新用户状态
            // 获取用户信息
            const userResponse = await fetch("http://127.0.0.1:8000/api/me", {
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
          <h2 className="mb-3">Login to start your next trip!</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3 text-start">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group mb-3 text-start">
              <label htlmFor="password">Password</label>
              <div className="password-input-wrapper">
                  <input type={passwordVisible ? "text" : "password"} id="password" name="password"  className="form-control" placeholder="Enter your password" 
                  value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button type="button" className="password-toggle-btn" onClick={togglePasswordVisibility} aria-label="Toggle password visibility">
                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} className="icon-style"/>
                  </button>
              </div>
              
            </div>
            <button type="submit" className="w-100 mb-3">
              Log in
            </button>
            <div>
                <p>————— Not a member? —————</p>
                <p><button type="button" className="btn-link" onClick={onSwitchToRegister}><strong>Join now</strong></button>{" "}
              and enjoy the best experience with RhineCustom.
            </p>
            </div>
          </form>

        </div>
      </div>
    );
}

export default LoginModal;