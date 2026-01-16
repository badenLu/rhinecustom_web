import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../assets/images/logo/logo.png";
import {SiXiaohongshu, SiTiktok, SiWechat} from 'react-icons/si'

const Footer = () => {
  const { t } = useTranslation();

  return (
      <footer className="footer-wrapper">
        <div className="footer-container">

          {/* 上半部分：三列信息 */}
          <div className="footer-columns">

            <div className="footer-col">
              <h5 className="footer-title">{t("footer.quickLinks")}</h5>
              <Link to="/" className="footer-link">{t("footer.link1")}</Link>
              <Link to="/routes" className="footer-link">{t("footer.link2")}</Link>
              <Link to="/contact" className="footer-link">{t("footer.link3")}</Link>
            </div>

            <div className="footer-col">
              <h5 className="footer-title">{t("footer.contactUs")}</h5>
              <p>{t("footer.email")}: contact@rhinecustom.com</p>
              <p>{t("footer.address")}: Merzhauser Str.164,<br />79100 Freiburg, Germany</p>
              {/* <p>{t("footer.phone")}: +123 456 7890</p> */}
            </div>

            <div className="footer-col">
              <h5 className="footer-title">{t("footer.socialMedia")}</h5>
              <p>
                <SiXiaohongshu className="social-icon" size={30}/>
                {t("footer.rednote")}
              </p>
              <p>
                <SiTiktok className="social-icon" />
                {t("footer.tiktok")}
              </p>
              <p>
                <SiWechat className="social-icon" />
                {t("footer.wechat")}
              </p>
            </div>

            {/* 下半部分：Logo + Legal */}
            <div className="footer-col footer-legal">
              <img src={logo} alt="Logo" className="footer-logo" />
              <p className="footer-subtitle">{t("footer.legalTitle")}</p>
              <p className="footer-subtitle">{t("footer.copyright")}</p>
            </div>
          </div>

        </div>
      </footer>
  );
};

export default Footer;
