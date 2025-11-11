import React, { useEffect, useState } from 'react';
import './RoutesPage.css';
import ImageCarousel from '../components/ImageCarousel';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="routes-container">
    <h1 className="page-title">热门路线推荐</h1>
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
            <h2 className="route-title"><strong>{route.title}</strong></h2>
            {route.subtitle && <p className="route-subtitle">{route.subtitle}</p>}
            <p className="short-desc"><strong>主要景点: </strong>{route.shortDesc}</p>
            <p><strong>旅行时长:</strong> {route.duration}</p>
            <p><strong>热门指数:</strong> {route.likeCount}</p>
      
          </div>
        </div>
      );
    })}
  </div>
  );
}

export default RoutesPage;