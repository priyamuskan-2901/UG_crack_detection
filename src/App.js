import React, { useState } from 'react';
import jsonData from './predictions.json';
import './App.css';

const App = () => {
  const [imagePath, setImagePath] = useState('');
  const [result, setResult] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePath(file.name); // Set the file name as the image path
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePath('');
      setImagePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imagePath) {
      const imageAddress = `C:\\Users\\muska\\OneDrive\\Desktop\\data\\${imagePath}`;
      const imageData = jsonData.find(
        (data) => data['Image_Address'] === imageAddress
      );

      if (imageData) {
        const confidenceValue = parseFloat(imageData['Confidence of being Cracked']);
        const isCracked = confidenceValue >= 0.5;
        setResult(isCracked ? 'Cracked' : 'Not Cracked');
        setConfidence(confidenceValue);
      } else {
        setResult('Image not found in the data');
        setConfidence(0);
      }
    } else {
      setResult('Please select an image file');
      setConfidence(0);
    }
  };

  return (
    <div className="app-container">
      <div className="app-box">
        <h1 style={{ textAlign: 'center', paddingBottom: '20px' }}>Crack Detection</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <input
              type="file"
              onChange={handleImageChange}
              style={{
                textAlign: 'center',
                paddingBottom: '20px',
                justifyContent: 'center',
                alignItems: 'baseline',
              }}
            />
            <button type="submit" className="button">
              Predict
            </button>
          </form>
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Selected Image" />
            </div>
          )}
          {result && (
            <div className="results">
              <p>Result: {result}</p>
              <p>Confidence: {confidence}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
