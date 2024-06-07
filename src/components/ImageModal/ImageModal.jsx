import React from "react";

import css from "./ImageModal.module.css";

import Modal from "react-modal";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, image, onRequestClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className={css.modal}
    overlayClassName={css.overlay}
  >
    <div className={css.modalcontent}>
      <img
        className={css.img}
        src={image.urls.regular}
        alt={image.alt_description}
        onClick={() => setSelectedImage(image)}
      />
    </div>
    <div className={css.modalinfo}>
      <p>Author: {image.user.name}</p>
      <p>Likes: {image.likes}</p>
      <p>Description: {image.alt_description}</p>
    </div>
  </Modal>
);

export default ImageModal;
