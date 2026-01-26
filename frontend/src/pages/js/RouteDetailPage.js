import React, { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../css/RouteDetailPage.css';
import { useParams } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import i18n from "i18next";
import {Helmet} from "react-helmet-async";
import API_URL from "../../config";
import LoadingEffect from "../../components/js/LoadingEffect";

const RouteDetailPage = () => {
  const { id } = useParams();
  const [route, setRoute] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { t } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    fetch(`${API_URL}/api/routes/${id}`)
      .then(res => res.json())
      .then(data => setRoute(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!route) {
    return <LoadingEffect text={t('general-strings.loading')} />;
  }

  const images = route.images.map(name => `${API_URL}/images/${name}`);

  const routesNames = {
    '1': '法国瑞士意大利',
    '2': '德国奥地利意大利',
    '3': '意大利法国南欧',
    '4': '瑞士德国法国荷兰莱茵河'
  };

  const routesName = routesNames[id];

  return (
      <>
        <Helmet>
          <title>路线 {routesName} 详情 - Rhine Custom</title>
          <meta name="description" content={`查看路线 ${routesName} 的详细行程安排和旅行建议`} />
          <link rel="canonical" href={`https://www.rhinecustom.com/route/${id}`} />
        </Helmet>
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
                            {t('general-strings.seeAllImages')}({images.length})
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
                <h2>{t('route-details.trip-overview')}</h2>
                <div dangerouslySetInnerHTML={{ __html: route[`overview_${lang}`] }} />
              </TabPanel>

              <TabPanel>
                <h2>{t('route-details.dailyPlan')}</h2>
                <div dangerouslySetInnerHTML={{ __html: route[`itinerary_${lang}`] }} />
              </TabPanel>

              <TabPanel>
                <h2>{t('route-details.reviews')}</h2>
                <p>{t('route-details.noReview')}</p>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </>
  );
};

export default RouteDetailPage;
