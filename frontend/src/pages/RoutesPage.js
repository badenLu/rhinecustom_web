import React, { useEffect, useState } from 'react';
import './RoutesPage.css';
import ImageCarousel from '../components/ImageCarousel';
import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import i18n from "i18next";

const RoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      fetch("http://127.0.0.1:8000/api/routes")
        .then((response) => response.json())
        .then((data) => setRoutes(data))
        .catch((error) => console.error("Error festching destinations:", error));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/routes/${id}`);
  }
  const {t} = useTranslation();
  const lang = i18n.language;

  return (
    <div className="routes-container">
    <h1 className="page-title">{t('route-page.pageTitle')}</h1>
    {routes.map((route) => {
      // 在这里再声明 imageURLs，就能访问到当前 route
      const imageURLs = Array.isArray(route.images)
        ? route.images.map((name) => `http://127.0.0.1:8000/images/${name}`)
        : [];

      return (
        <div className="route-card" key={route.id}>
          <div className="route-image-container">
            <ImageCarousel images={imageURLs} />
          </div>

          <div className="route-content" onClick={() => handleCardClick(route.id)}>
            <h2 className="route-title"><strong>{route[`title_${lang}`]}</strong></h2>
            {route[`subtitle_${lang}`] && <p className="route-subtitle">{route[`subtitle_${lang}`]}</p>}
            <p className="short-desc"><strong>{t('route-page.mainViews')}</strong>{route[`shortDesc_${lang}`]}</p>
            <p><strong>{t('route-page.duration')}</strong> {route[`duration_${lang}`]}</p>
            <p><strong>{t('route-page.rating')}</strong> {route.likeCount}</p>
      
          </div>
        </div>
      );
    })}
  </div>
  );
}

export default RoutesPage;