import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import "./DestinationDetail.css";
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import {Helmet} from "react-helmet-async";
import API_URL from "../config";

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [travelTips, setTravelTips] = useState({});
  const [activeTipCategory, setActiveTipCategory] = useState('seasonDetails');
  const lang = i18n.language;
  const {t} = useTranslation();

  useEffect(() => {
    fetch(`${API_URL}/api/destinations/${id}`)
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
    return <div className="detail-loading">{t('general-strings.loading')}</div>;
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

  const destinationNames = {
    '1': '巴黎',
    '2': '罗马',
    '3': '因特拉肯',
    '4': '巴塞罗那',
    '5': '慕尼黑',
    '6': '阿姆斯特丹',
    '7': '布拉格',
    '8': '哈尔施塔特',
    '9': '多洛米蒂',
    '10': '特内里费',
    '11': '波尔图',
    '12': '哥本哈根',
  };
  const name = destinationNames[id] || `目的地 ${id}`;

  return (
      <>
        <Helmet>
          <title>{name}旅行指南 - Rhine Custom</title>
          <meta name="description" content={`探索${name}的最佳旅行路线和景点推荐`} />
          <link rel="canonical" href={`https://www.rhinecustom.com/destination/${id}`} />
        </Helmet>
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
      </>
  );
};

export default DestinationDetail;
