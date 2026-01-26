import React, { useEffect, useState } from 'react';
import '../css/RoutesPage.css';
import ImageCarousel from '../../components/js/ImageCarousel';
import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import {Helmet} from "react-helmet-async";
import API_URL from "../../config";
import LoadingEffect from "../../components/js/LoadingEffect";

const RoutesPage = () => {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      fetch(`${API_URL}/api/routes`)
        .then((response) => response.json())
        .then((data) => setRoutes(data))
        .catch((error) => console.error("Error fetching destinations:", error));
  }, []);

  if (!routes) {
      return <LoadingEffect text={t('general-strings.loading')} />;
  }

  const handleCardClick = (id) => {
    navigate(`/routes/${id}`);
  }
  const {t} = useTranslation();
  const lang = i18n.language;

  return (
      <>
        <Helmet>
          <title>旅行路线 - Rhine Custom</title>
          <meta name="description" content="浏览我们的定制旅行路线，每条路线都经过精心策划" />
          <link rel="canonical" href="https://www.rhinecustom.com/routes" />
        </Helmet>
        <div className="routes-container">
          <h1 className="page-title">{t('route-page.pageTitle')}</h1>
          {routes.map((route) => {
            // 在这里再声明 imageURLs，就能访问到当前 route
            const imageURLs = Array.isArray(route.images)
                ? route.images.map((name) => `${API_URL}/images/${name}`)
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
      </>
  );
}

export default RoutesPage;