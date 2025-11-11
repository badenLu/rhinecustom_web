import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import "./DestinationDetail.css";

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [travelTips, setTravelTips] = useState({});
  const [activeTipCategory, setActiveTipCategory] = useState('seasonDetails');

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/destinations/${id}`)
      .then(res => res.json())
      .then(data => {
        setDestination(data);
        if (data.attractions) {
          try {
            const parsed = JSON.parse(data.attractions);
            setAttractions(parsed);
          } catch (e) {
            console.error("Error parsing attractions", e);
          }
        };
        if (data.travelTips) {
          try {
            const parsed = JSON.parse(data.travelTips);
            setTravelTips(parsed);
          } catch (e) {
            console.error("Error parsing travelTips", e);
          }
        };
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!destination) {
    return <div className="detail-loading">Loading...</div>;
  }

  const {
    bestSeason,
    seasonDetails,
    transportation,
    localCuisine,
    additionalTips
  } = travelTips;

  const renderTipContent = () => {
    switch (activeTipCategory) {
      case 'seasonDetails':
        return (
          <div>
            {bestSeason && (
              <p><strong>Best Season:</strong> {bestSeason}</p>
            )}
            {seasonDetails ? (
              <ul>
                {Object.entries(seasonDetails).map(([season, detail], index) => (
                  <li key={index}>
                    <strong>{season}:</strong> {detail}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No season details available.</p>
            )}
          </div>
        );
      case 'transportation':
        return transportation ? (
          <p>{transportation}</p>
        ) : (
          <p>No transportation info available.</p>
        );
      case 'localCuisine':
        return localCuisine ? (
          <p>{localCuisine}</p>
        ) : (
          <p>No local cuisine info available.</p>
        );
      case 'additionalTips':
        return additionalTips ? (
          <p>{additionalTips}</p>
        ) : (
          <p>No additional tips available.</p>
        );
      default:
        return <p>Select a category to see details.</p>;
    }
  };

  return (
    <div className="detail-container">
      <div className="header-container">
        <div
          className="header-inner"
          style={{
            backgroundImage: `url(${destination.image || "/images/default.jpg"})`
          }}
        >
          <div className="header-overlay">
            <h1 className="detail-title">
              {destination.city}, {destination.country}
            </h1>
            <p className="overview-text">{destination.overview}</p>
          </div>
        </div>
      </div>

      {/* Attractions Card */}
      <div className="card-container attractions-card">
        <div className="card-head">
          <h2>Attractions</h2>
        </div>
        <div className="card-body">
          {attractions.length > 0 ? (
            <ul>
              {attractions.map((item, index) => (
                <li key={index} className="attraction-item">
                  <p><strong>{item.name}:</strong> {item.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No attractions available.</p>
          )}
        </div>
      </div>

      <div className="card-container travel-tips-card">
        <div className="card-head">
          <h2>Travel Tips</h2>
        </div>    
        <div className="card-body">
          <div className="tips-wrapper">
            {/* 左侧菜单 */}
            <div className="tips-menu">
              <ul>
                <li
                  className={activeTipCategory === 'seasonDetails' ? 'active' : ''}
                  onClick={() => setActiveTipCategory('seasonDetails')}
                >
                  Season Details
                </li>
                <li
                  className={activeTipCategory === 'transportation' ? 'active' : ''}
                  onClick={() => setActiveTipCategory('transportation')}
                >
                  Transportation
                </li>
                <li
                  className={activeTipCategory === 'localCuisine' ? 'active' : ''}
                  onClick={() => setActiveTipCategory('localCuisine')}
                >
                  Local Cuisine
                </li>
                <li
                  className={activeTipCategory === 'additionalTips' ? 'active' : ''}
                  onClick={() => setActiveTipCategory('additionalTips')}
                >
                  Additional Tips
                </li>
              </ul>
            </div>
            <div className="tips-content">
              {renderTipContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
