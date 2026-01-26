import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "../css/About.css";
// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// 假设每个图片都正确导入了
import img1 from "../../assets/images/lightbox/img1.jpg";
import img2 from "../../assets/images/lightbox/img2.jpg";
import img3 from "../../assets/images/lightbox/img3.jpg";
import img4 from "../../assets/images/lightbox/img4.jpg";
import img5 from "../../assets/images/lightbox/img5.jpg";
import img6 from "../../assets/images/lightbox/img6.jpg";
import img7 from "../../assets/images/lightbox/img7.jpg";
import img8 from "../../assets/images/lightbox/img8.jpg";
import img9 from "../../assets/images/lightbox/img9.jpg";
import img10 from "../../assets/images/lightbox/img10.jpg";
import img11 from "../../assets/images/lightbox/img11.jpg";
import img12 from "../../assets/images/lightbox/img12.jpg";
import img13 from "../../assets/images/lightbox/img13.jpg";
import img14 from "../../assets/images/lightbox/img14.jpg";
import img15 from "../../assets/images/lightbox/img15.jpg";
import img16 from "../../assets/images/lightbox/img16.jpg";
import img17 from "../../assets/images/lightbox/img17.jpg";
import img18 from "../../assets/images/lightbox/img18.jpg";
import img19 from "../../assets/images/lightbox/img19.jpg";
import img20 from "../../assets/images/lightbox/img20.jpg";
import img21 from "../../assets/images/lightbox/img21.jpg";
import img22 from "../../assets/images/lightbox/img22.jpg";
import img23 from "../../assets/images/lightbox/img23.jpg";
import img24 from "../../assets/images/lightbox/img24.jpg";
import img25 from "../../assets/images/lightbox/img25.jpg";
import {Helmet} from "react-helmet-async";


const About = () => {
  const { t } = useTranslation(); 
  const brandPhilosophyContent = t('about.brandPhilosophyContent', { returnObjects: true });
  const founderContent = t('about.founderContent', { returnObjects: true });

  const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];
  const [index, setIndex] = useState(-1);

  // 直接使用手动导入的图片，不需要 assetLink
  const photos = [
    { src: img1, width: 600, height: 400, alt: "" },
    { src: img2, width: 300, height: 400, alt: "" },
    { src: img3, width: 600, height: 400, alt: "" },
    { src: img4, width: 600, height: 400, alt: "" },
    { src: img5, width: 300, height: 400, alt: "" },
    { src: img6, width: 600, height: 400, alt: "" },
    { src: img7, width: 400, height: 400, alt: "" },
    { src: img8, width: 600, height: 400, alt: "" },
    { src: img9, width: 600, height: 400, alt: "" },
    { src: img10, width: 800, height: 400, alt: "" },
    { src: img11, width: 600, height: 400, alt: "" },
    { src: img12, width: 300, height: 400, alt: "" },
    { src: img13, width: 600, height: 400, alt: "" },
    { src: img14, width: 300, height: 400, alt: "" },
    { src: img15, width: 300, height: 400, alt: "" },
    { src: img16, width: 600, height: 400, alt: "" },
    { src: img17, width: 600, height: 400, alt: "" },
    { src: img18, width: 600, height: 400, alt: "" },
    { src: img19, width: 600, height: 400, alt: "" },
    { src: img20, width: 400, height: 400, alt: "" },
    { src: img21, width: 600, height: 400, alt: "" },
    { src: img22, width: 600, height: 400, alt: "" },
    { src: img23, width: 600, height: 400, alt: "" },
    { src: img24, width: 600, height: 400, alt: "" },
    { src: img25, width: 600, height: 400, alt: "" },
  ].map(({ src, alt, width, height }) => ({
    src,
    alt,
    width,
    height,
    srcSet: breakpoints.map((breakpoint) => ({
      src, // 如果你有不同尺寸的图片，可以修改这里
      width: breakpoint,
      height: Math.round((height / width) * breakpoint),
    })),
  }));

  return (
    <>
      <Helmet>
        <title>关于我们 - Rhine Custom</title>
        <meta name="description" content="了解 Rhine Custom / 莱茵定制 的故事和我们的使命" />
        <link rel="canonical" href="https://www.rhinecustom.com/about" />
      </Helmet>

      <div className="album-container">
      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={100}
        onClick={({ index }) => setIndex(index)}
      />
      </div>

      <Lightbox
        slides={photos.map(({ src, alt }) => ({ src, alt }))}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />

      <main className="mx-auto">
        <section className="py-12 px-6 mx-auto">
          <h2 className="font-bold pt-5">
          {t('about.brandPhilosophyTitle')}
          </h2>
          {brandPhilosophyContent.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
         
        </section>
   
        <section className="py-12 px-6 mx-auto">
          <h2 className="font-bold">{t('about.founderTitle')}</h2>
          {founderContent.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </section>
      </main>
    </>
  );
};

export default About;
