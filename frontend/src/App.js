import React from 'react';
import ImageUploader from './components/ImageUploader';
import ImageList from './components/ImageList';

const App = () => {
  return (
    <div className="App">
      <h1>Image Upload to S3 and Display</h1>
      <ImageUploader />
      <ImageList />
    </div>
  );
};

export default App;
