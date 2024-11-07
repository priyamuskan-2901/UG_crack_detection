import React from 'react';
import ResultsDisplay from './components/ResultsDisplay';
import jsonData from './classification_results.json';
function App() {
  return (
    <div className="App">
      {/* Pass the JSON data as a prop to the ResultsDisplay component */}
      <ResultsDisplay data={jsonData} />
    </div>
  );
}

export default App;