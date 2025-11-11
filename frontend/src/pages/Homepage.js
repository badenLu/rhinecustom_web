import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom";
import "./Homepage.css"; 
import { useTranslation } from "react-i18next";

import banner1 from "../assets/images/banner/banner1.jpg";
import banner2 from "../assets/images/banner/banner2.jpg";
import banner3 from "../assets/images/banner/banner3.jpg";
import banner4 from "../assets/images/banner/banner4.jpg";
import banner5 from "../assets/images/banner/banner5.jpg";

import image1 from "../assets/images/services/image1.jpg";
import image2 from "../assets/images/services/image2.jpg";
import image3 from "../assets/images/services/image3.jpg";
import image4 from "../assets/images/services/image4.jpg";
import image5 from "../assets/images/services/image5.jpg";
import image6 from "../assets/images/services/image6.jpg";
import image7 from "../assets/images/services/image7.jpg";
import image8 from "../assets/images/services/image8.jpg";
import image9 from "../assets/images/services/image9.jpg";
import image10 from "../assets/images/services/image10.jpg";
import image11 from "../assets/images/services/image11.jpg";
import image12 from "../assets/images/services/image12.jpg";
import image13 from "../assets/images/services/image13.jpg";
import image14 from "../assets/images/services/image14.jpg";
import image15 from "../assets/images/services/image15.jpg";
import image16 from "../assets/images/services/image16.jpg";


const Homepage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const bannerImages = [banner1, banner2, banner3, banner4, banner5];
  const bannerCaptions = t('homepage.bannerCaptions', { returnObjects: true}) || [];
  //banner内的搜索框内容输入
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/destination/${searchTerm}`);
    } else {
      alert(t('homepage.searchAlert'));
    }
  } 

  const imagesGroup = [
    [image1, image2, image3, image4],
    [image5, image6, image7, image8],
    [image9, image10, image11, image12],
    [image13, image14, image15, image16]
  ];

  const servicesData = t("homepage.services", { returnObjects: true }) || [];
  const services = servicesData.map((serviceData, i) => {
    const mergedItems = serviceData.items.map((itemText, j) => ({
      image: imagesGroup[i][j],
      title: itemText,
      routeId: j + 1
    }));

    return {
      title: serviceData.title,
      description: serviceData.description,
      items: mergedItems
    };
  })
 
 //控制两个button
  const serviceRefs = useRef([]); // 滚动容器引用，用数组存储多个service-category的ref
  // 滚动处理逻辑
  const handleScroll = (index, direction) => {
    const container = serviceRefs.current[index];
    if (!container) return;
    const serviceItem = container.querySelector(".service-item"); // 单个图片
    if (!serviceItem) return; 
    const itemWidth = serviceItem.offsetWidth; // 图片宽度
    const itemMargin = parseFloat(getComputedStyle(serviceItem).marginRight); // 图片间距
    const scrollAmount = itemWidth + itemMargin; // 每次滚动的距离
    if (direction === 1) {
      // 向右滚动
      container.scrollLeft += scrollAmount;
    } else {
      // 向左滚动
      container.scrollLeft -= scrollAmount;
    }
    // 更新箭头按钮状态
    updateScrollButtons(index, container);
  };
  // 检查滚动按钮状态
  const updateScrollButtons = (index, container) => {
    const leftButton = document.querySelectorAll(".left-arrow")[index];
    const rightButton = document.querySelectorAll(".right-arrow")[index];

    if (container.scrollLeft > 0){
      leftButton.classList.remove("hidden");
    } else {
      leftButton.classList.add("hidden");
    }

    if (container.scrollLeft + container.offsetWidth < container.scrollWidth) {
      rightButton.classList.remove("hidden");
    } else {
      rightButton.classList.add("hidden");
    }
  };
  // 初始化对齐和按钮状态
  useEffect(() => {
    serviceRefs.current.forEach((container, index) => {
      if (container) {
        updateScrollButtons(index, container);
      }
    })
  }, []);

  return (
    <div className="container-fluid">
      <div className="banner-container">
        <Carousel fade interval={2000}>
        {bannerImages.map((imgSrc, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 banner-img"
                src={imgSrc}
                alt={`Banner ${index + 1}`}
              />
              <div className="image-caption">
                {bannerCaptions[index]}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="banner-overlay">
          <h1 className="slogan">{t('homepage.slogan')}</h1>
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder={t('homepage.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search search-icon" onClick={handleSearch}></i> 
            </div>
            <button
              className="customization-button"
              onClick={() => navigate("/contact")}
            >
              {t('homepage.customization')}
            </button>
          </div>
        </div>
      </div>

   
      <div className="services-section">
        {/* 四个服务板块，每个占整行 */}
        {services.map((service, index) => (
          <div className="service-category" key={index}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <div className="service-slider">
              <button className={`arrow-btn left-arrow hidden`} onClick={() => handleScroll(index, -1)}>
                &#8592;
              </button>
              <div className="service-items-wrapper" ref={(el) => (serviceRefs.current[index] = el)}>
                {service.items.map((item, idx) => (
                  <div className="service-item" key={idx} onClick={() => navigate(`/routes/${item.routeId}`)}>
                    <img src={item.image} alt={item.title}/>
                    <h4>{item.title}</h4>
                  </div>
                ))}
              </div>
              <button className={`arrow-btn right-arrow`} onClick={() => handleScroll(index,1)}>
                &#8594;
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Homepage;

