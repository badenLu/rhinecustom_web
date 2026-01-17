import React, { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './RouteDetailPage.css';
import { useParams } from 'react-router-dom';
import {useTranslation} from "react-i18next";

const RouteDetailPage = () => {
  const { id } = useParams();
  const [route, setRoute] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/routes/${id}`)
      .then(res => res.json())
      .then(data => setRoute(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!route) return <div>Loading...</div>;

  const images = route.images.map(name => `http://127.0.0.1:8000/images/${name}`);

  return (
    <div className="route-detail-page">
      <div className="image-section">
        <div className="image-grid">
          <div className="left-image" onClick={() => { setPhotoIndex(0); setIsOpen(true); }}>
            <img src={images[0]} alt="Main" />
          </div>
          <div className="right-images">
            {images.slice(1, 5).map((img, index) => (
              <div 
                key={index} 
                className="small-image"
                onClick={() => { setPhotoIndex(index + 1); setIsOpen(true); }}
              >
                <img src={img} alt={`Sub ${index + 1}`} />
                {index === 3 && images.length > 5 && (
                  <div className="overlay">
                    查看全部图片({images.length})
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={photoIndex}
        slides={images.map(src => ({ src }))}
        on={{ view: ({ index }) => setPhotoIndex(index) }}
        className="custom-lightbox"
      />

      <div className="tab-section">
        <Tabs>
          <TabList>
            <Tab>{t("route-tab-section-title.overview")}</Tab>
            <Tab>{t("route-tab-section-title.itinerary")}</Tab>
            <Tab>{t("route-tab-section-title.reviews")}</Tab>
          </TabList>

          <TabPanel>
            <h2>行程概述</h2>
            <div dangerouslySetInnerHTML={{ __html: route.overview }} />
          </TabPanel>

          <TabPanel>
            <h2>日程安排</h2>
            <div dangerouslySetInnerHTML={{ __html: route.itinerary }} />
          </TabPanel>

          <TabPanel>
            <h2>客户评论</h2>
            <p>暂无评论</p>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default RouteDetailPage;
