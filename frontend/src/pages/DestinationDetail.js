import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import "./DestinationDetail.css";
import {useTranslation} from "react-i18next";
import i18n from "i18next";

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [travelTips, setTravelTips] = useState({});
  const [activeTipCategory, setActiveTipCategory] = useState('seasonDetails');
  const lang = i18n.language;
  const {t} = useTranslation();

  useEffect(() => {
    fetch(`https://rhinecustom.onrender.com/api/destinations/${id}`)
      .then(res => res.json())
      .then(data => {
        setDestination(data);
        if (data[`attractions_${lang}`]) {
          try {
            const parsed = JSON.parse(data[`attractions_${lang}`]);
            setAttractions(parsed);
          } catch (e) {
            console.error("Error parsing attractions", e);
          }
        }
        if (data[`travelTips_${lang}`]) {
          try {
            const parsed = JSON.parse(data[`travelTips_${lang}`]);
            setTravelTips(parsed);
          } catch (e) {
            console.error("Error parsing travelTips", e);
          }
        }
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
              <p><strong>{t('general-strings.bestSeason')}:</strong> {bestSeason}</p>
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
              <p>{t('general-strings.noSeason')}</p>
            )}
          </div>
        );
      case 'transportation':
        return transportation ? (
          <p>{transportation}</p>
        ) : (
          <p>{t('general-strings.noTransportation')}</p>
        );
      case 'localCuisine':
        return localCuisine ? (
          <p>{localCuisine}</p>
        ) : (
          <p>{t('general-strings.noCuisine')}</p>
        );
      case 'additionalTips':
        return additionalTips ? (
          <p>{additionalTips}</p>
        ) : (
          <p>{t('general-strings.noExtraTips')}</p>
        );
      default:
        return <p>{t('general-strings.selectCategory')}</p>;
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
              {destination[`city_${lang}`]}, {destination[`country_${lang}`]}
            </h1>
            <p className="overview-text">{destination[`overview_${lang}`]}</p>
          </div>
        </div>
      </div>

      {/* Attractions Card */}
      <div className="card-container attractions-card">
        <div className="card-head">
          <h2>{t('destinations_details_subtitle.attractions')}</h2>
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
          <h2>{t('destinations_details_subtitle.travelTips')}</h2>
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
                  {t('destinations_details_subtitle.seasonDetails')}
                </li>
                <li
                  className={activeTipCategory === 'transportation' ? 'active' : ''}
                  onClick={() => setActiveTipCategory('transportation')}
                >
                  {t('destinations_details_subtitle.transportation')}
                </li>
                <li
                  className={activeTipCategory === 'localCuisine' ? 'active' : ''}
                  onClick={() => setActiveTipCategory('localCuisine')}
                >
                  {t('destinations_details_subtitle.localCuisine')}
                </li>
                <li
                  className={activeTipCategory === 'additionalTips' ? 'active' : ''}
                  onClick={() => setActiveTipCategory('additionalTips')}
                >
                  {t('destinations_details_subtitle.additionalTips')}
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
