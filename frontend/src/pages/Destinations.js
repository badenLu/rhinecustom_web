import React, { useEffect, useState } from "react";
import "./Destinations.css";
import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import i18n from "i18next";

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
    fetch("http://127.0.0.1:8000/api/destinations")
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
          destination.category &&
          destination.category.toLowerCase().includes(selectedCategory.toLowerCase())
      )
      :destinations;
 

  return (
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
              setSelectedCategory("Culture");
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
            placeholder="Search"
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
         d.city.toLowerCase().includes(searchQuery.toLocaleLowerCase())
        || d.country.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) : true
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
  );
};

export default Destinations;
