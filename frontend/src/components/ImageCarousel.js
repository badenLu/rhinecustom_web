import React, { useState } from 'react';
import './ImageCarousel.css'; 

const ImageCarousel = ({ images }) => {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  //如果后端没返回图片，或者数组为空，则显示占位图片
  if (!images || images.length ===0) {
    return (
      <div className="carousel-empty">
        <img src="/placeholder.jpg" alt="placeholder"/>
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  
  return (
    <div className="carousel-container">
      <div className="carousel-image-wrapper">
        <img 
          src={images[currentIndex]}
          alt={`slide-${currentIndex}`}
          className="carousel-image"
        />
        <button className="arrow-button prev-button" onClick={handlePrev}>&lt;</button>
        <button className="arrow-button next-button" onClick={handleNext}>&gt;</button>
      </div>
      <div className="carousel-dots">
        {images.map((_, index) =>(
          <span 
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick = {() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
