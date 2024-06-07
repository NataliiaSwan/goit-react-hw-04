import React from "react";

import ImageCard from "../ImageCard/ImageCard";

import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, setSelectedImage }) => {
  if (images.length === 0) {
    return null;
  }
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <li
          key={image.id}
          className={css.galleryitem}
          onClick={() => setSelectedImage(image)}
        >
          <ImageCard src={image.urls.small} alt={image.alt_description} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
