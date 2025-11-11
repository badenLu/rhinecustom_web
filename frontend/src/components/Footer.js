import React from "react";
import { useTranslation } from "react-i18next"; 
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../assets/images/logo/logo.png"

const Footer = () => {
  const { t } = useTranslation();
  
  return(
    <div className="footer-wrapper">
      <div className="footer-container">
        <div>
          <h5>{t("footer.quickLinks")}</h5>
          <p><Link to="/">{t("footer.link1")}</Link></p>
          <p><Link to="/routes">{t("footer.link2")}</Link></p>
          <p><Link to="/contact">{t("footer.link3")}</Link></p>
        </div>
        <div>
        <h5>{t("footer.contactUs")}</h5>
          <p>{t("footer.email")}: contact@rhinecustom.com</p>
          <p>{t("footer.address")}: Merzhauser Str.164,<br/> 79100 Freiburg, Germany</p>
          <p>{t("footer.phone")}: +123 456 7890</p>
        </div>
        <div>
        <h5>{t("footer.socialMedia")}</h5>
          <p>{t("footer.RedNote")}</p>
          <p>{t("footer.TikTok")}</p>
          <p>{t("footer.Wechat-Number")}</p>
        </div>
        <div>
          <img src={logo} alt="Logo" className="footer-logo" />
          <h5>{t("footer.legalTitle")}</h5>
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;