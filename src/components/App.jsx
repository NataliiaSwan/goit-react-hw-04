import React, { useState, useEffect } from "react";

import axios from "axios";

import "./App.css";

import { Toaster, toast } from "react-hot-toast";

import SearchBar from "./SearchBar/SearchBar";

import ImageGallery from "./ImageGallery/ImageGallery";

import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";

import Loader from "./Loader/Loader";

import ErrorMessage from "./ErrorMessage/ErrorMessage";

import ImageModal from "./ImageModal/ImageModal";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearchSubmit = (searchQuery) => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query");
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    setError(null);
  };

  const fetchImages = async (query, page) => {
    setLoading(true);
    try {
      const accessKey = "3nwnlnE0zb3anD8SNR_0wUFNVsDkt3uC3XTqsaGS0xw";
      const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=10&client_id=${accessKey}`;
      const response = await axios.get(url);
      const newImages = response.data.results;
      if (page === 1) {
        setImages(newImages);
      } else {
        setImages((prevImages) => [...prevImages, ...newImages]);
      }
    } catch (error) {
      console.error("Error fetching data from Unsplash", error);
      setError("Error fetching images");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  useEffect(() => {
    if (!query) return;
    fetchImages(query, page);
  }, [query, page]);

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} setSelectedImage={setSelectedImage} />
          {loading && <Loader />}
          {images.length > 0 && !loading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}
      {selectedImage && (
        <ImageModal
          isOpen={true}
          image={selectedImage}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
