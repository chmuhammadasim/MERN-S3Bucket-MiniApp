// frontend/src/components/ImageList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/images');
        setImages(res.data);
      } catch (error) {
        console.error('Error fetching images', error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      <h2>Uploaded Images</h2>
      <div>
        {images.map((image) => (
          <img key={image._id} src={image.url} alt="Uploaded" width="200" />
        ))}
      </div>
    </div>
  );
};

export default ImageList;
