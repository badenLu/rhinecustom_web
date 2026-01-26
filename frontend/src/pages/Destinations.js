import React, { useEffect, useState } from "react";
import "./Destinations.css";
import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import {Helmet} from "react-helmet-async";
import API_URL from "../config";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("popularity");
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("culture");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    fetch(`${API_URL}/api/destinations`)
      .then((response) => response.json())
      .then((data) => {
        setDestinations(data);
      })
      .catch((error) => console.error("Error festching destinations:", error));
  }, []);

  // 处理筛选逻辑
  const filteredDestinations =
    filter === "popularity"
      ? destinations
      : selectedCategory
      ? destinations.filter(
        (destination) =>
          destination[`category_${lang}`] &&
          destination[`category_${lang}`].toLowerCase().includes(selectedCategory.toLowerCase())
      )
      :destinations;
 

  return (
      <>
          <Helmet>
              <title>目的地列表 - Rhine Custom</title>
              <meta name="description" content="浏览莱茵定制精选的全球旅行目的地，找到您的下一个冒险地点" />
              <link rel="canonical" href="https://www.rhinecustom.com/destinations" />
          </Helmet>
          <div className="destination-container">
              <div className="top-container">
                  {/* 筛选选项 */}
                  <div className="filter-container">
          <span
              className={filter === "popularity" ? "active" : ""}
              onClick={() => {
                  setFilter("popularity");
                  setShowCategories(false);
              }}
          >
            {t("destinations_filter-title.popularity")}
          </span>
                      <span
                          className={filter === "category" ? "active" : ""}
                          onClick={() => {
                              setFilter("category");
                              setSelectedCategory("");
                              setShowCategories(true);
                          }}
                      >
            {t("destinations_filter-title.category")}
          </span>
                  </div>

                  {/* 搜索框 */}
                  <div className="search-container">
                      <input
                          type="text"
                          placeholder={t('general-strings.search')}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="search-input"
                      />
                      <i className="fas fa-search search-icon"></i>
                  </div>
              </div>


              {showCategories && filter === "category" && (
                  <div className="category-options">
                      { [
                          t("destinations_filter-subtitle.culture"),
                          t("destinations_filter-subtitle.nature"),
                          t("destinations_filter-subtitle.gastronomy")
                      ].map((cat) => (
                          <button
                              key={cat}
                              className={selectedCategory === cat ? "active" : ""}
                              onClick={() => setSelectedCategory(cat)}
                          >
                              {cat}
                          </button>
                      ))}
                  </div>
              )}
              <div className="destination-grid">
                  {filteredDestinations.filter((d) => searchQuery ?
                      d[`city_${lang}`].toLowerCase().includes(searchQuery.toLocaleLowerCase())
                      || d[`country_${lang}`].toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) : true
                  )
                      .map((destination) => (
                          <div key={destination.id} className="destination-card"
                               onClick={() => navigate(`/destinations/${destination.id}`)}
                          >
                              <img
                                  src={destination.image ? destination.image : "/images/default.jpg"}
                                  alt={`${destination.city}, ${destination.country}`}
                                  className="destination-image"
                              />
                              <div className="destination-content">
                                  <h3 className="destination-name">
                                      {destination[`city_${lang}`]}, {destination[`country_${lang}`]}
                                  </h3>
                                  <p className="destination-example">e.g. {destination[`description_${lang}`]}</p>
                              </div>
                              <button className="find-more-button"
                                      onClick={(e) =>  {
                                          e.stopPropagation();
                                          navigate(`/destinations/${destination.id}`)
                                      }}
                              >
                                  {t('general-strings.findMore')}
                              </button>
                          </div>
                      ))}
              </div>
          </div>
      </>
  );
};

export default Destinations;
