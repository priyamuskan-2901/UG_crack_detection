import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Import your results JSON here, if available.
// import resultsData from './your-results.json';

const ResultsDisplay = ({ data }) => {
    const [expandedItem, setExpandedItem] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
  
    const toggleExpand = () => {
      setExpandedItem(expandedItem === imagePath ? null : imagePath);
    };
  
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const fileName = file.name;
        setImagePath(fileName);
        setPreviewImage(URL.createObjectURL(file));
  
        const result = Object.values(data).find(
          (item) => item.relative_path.endsWith(fileName)
        );
  
        setSelectedResult(result || null);
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left Side - Classification Results */}
          <div className="w-1/2 p-6">
            {/* Main Heading */}
            <h1 className="text-3xl font-bold mb-6">LULC Image Classification</h1>
            <h2 className="text-2xl font-bold mb-4">Classification Results</h2>
  
            {/* Image Upload Input */}
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
  
            {/* Display Result for the Selected Image */}
            {selectedResult ? (
              <div key={imagePath} className="result-item">
                <div
                  onClick={toggleExpand}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-lg cursor-pointer"
                >
                  <h3 className="text-lg font-semibold truncate">{imagePath}</h3>
                  <span
                    className={`badge px-3 py-1 rounded-full text-sm ${
                      selectedResult.confidence > 90
                        ? 'bg-green-100 text-green-800'
                        : selectedResult.confidence > 70
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {selectedResult.predicted_class}
                  </span>
                  {expandedItem === imagePath ? <ChevronUp /> : <ChevronDown />}
                </div>
  
                {expandedItem === imagePath && (
                  <div className="bg-gray-50 p-3 rounded-lg mt-2">
                    <p className="text-sm">Confidence: {selectedResult.confidence.toFixed(2)}%</p>
  
                    <h4 className="text-lg font-semibold mt-3">Top Prediction:</h4>
                    <ul className="list-disc list-inside text-sm mt-2">
                      {selectedResult.top_3_predictions.map((pred, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{pred.class}</span>
                          <span>{pred.confidence.toFixed(2)}%</span>
                        </li>
                      ))}
                    </ul>
  
                    <p className="text-sm mt-3">File Path: {selectedResult.relative_path}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Please upload an image to see the results.</p>
            )}
          </div>
  
          {/* Right Side - Image Preview */}
          <div className="w-1/2 flex items-center justify-center p-6 bg-gray-50">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Uploaded preview"
                className="w-full h-full object-cover rounded-lg shadow"
              />
            ) : (
              <p className="text-gray-500">No image uploaded</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default ResultsDisplay;
  