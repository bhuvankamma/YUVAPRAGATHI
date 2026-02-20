// src/ImageCarousel.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import ac from '../assets/ac.png';
import mp from '../assets/mp.webp';
import biharMapImage from '../assets/biharmap.png';
import hs from '../assets/hs.jpg';
import schemeImage from '../assets/Scheme.webp';
import farmingImage from '../assets/people.jpg';

const ImageCarousel = () => {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  const importedImages = [ac, mp, biharMapImage, hs, schemeImage, farmingImage];

  useEffect(() => {
    const translatedImages = t('carousel_images', { returnObjects: true });
    if (Array.isArray(translatedImages) && translatedImages.length > 0) {
      const combinedImages = translatedImages.map((image, index) => ({
        ...image,
        src: importedImages[index],
      }));
      setImages(combinedImages);
    }
  }, [i18n.language]);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );

  const goToNext = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );

  if (images.length === 0) return <div>Loading images...</div>;

  return (
    <section
      className="relative w-screen left-1/2 right-1/2 -mx-[50vw] my-8 overflow-hidden rounded-none"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 animate-gradientScroll bg-[length:400%_400%] bg-gradient-to-r from-amber-100 via-green-100 to-blue-100"></div>

      {/* Image Wrapper */}
      <div
        className="relative z-10 w-full flex items-center justify-center"
        style={{ height: '65vh', minHeight: '400px' }}
      >
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt || 'carousel image'}
          className="max-h-full w-auto object-contain object-center transition-opacity duration-700 ease-in-out"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Caption Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20 
                      bg-gradient-to-t from-black/60 to-transparent 
                      p-4 text-white text-center">
        <p className="text-base md:text-lg font-medium drop-shadow-md">
          {images[currentIndex].description}
        </p>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 
                   bg-white/70 text-gray-800 p-2 rounded-full shadow-sm 
                   hover:bg-white hover:shadow-md transition-all backdrop-blur-sm z-30"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 
                   bg-white/70 text-gray-800 p-2 rounded-full shadow-sm 
                   hover:bg-white hover:shadow-md transition-all backdrop-blur-sm z-30"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 w-2.5 rounded-full ${
              index === currentIndex ? 'bg-white shadow-md' : 'bg-gray-400/70'
            } transition-all duration-300`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default ImageCarousel;
