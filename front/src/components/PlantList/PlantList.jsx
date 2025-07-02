import React, { useState } from 'react';
import { getPlants } from '../../api/perenual';  

// Utility function to capitalize the first letter of each word
const capitalizeWords = (str) => {
  if (typeof str !== 'string') return '';  
  return str
    .split(' ')                     
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  
    .join(' ');                    
};

const PlantList = () => {
  const [plants, setPlants] = useState([]);       // State to store the list of plants
  const [searchTerm, setSearchTerm] = useState('');  // State for user search input
  const [loading, setLoading] = useState(false);   // Loading state
  const [error, setError] = useState(null);        // Error state
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [isModalOpen, setIsModalOpen] = useState(false);  // Track if the modal is open

  // Limit the number of plants per page
  const plantsPerPage = 6;  

  // Function to fetch plants based on the search term
  const fetchPlants = async (term) => {
    setLoading(true);       // Set loading to true when fetching starts
    setError(null);         // Reset any previous error
    try {
      const data = await getPlants(term);   // Call the API function with the search term
      setPlants(data);        // Store the retrieved plants data
      setCurrentPage(1);      // Reset to the first page whenever a new search is made
    } catch (err) {
      setError('Failed to fetch plant data.');  // Handle any errors
    }
    setLoading(false);       // Set loading to false when fetching is complete
  };

  // Handle form submission for search
  const handleSearch = (e) => {
    e.preventDefault();      // Prevent page reload on form submit
    if (searchTerm.trim() !== '') {
      fetchPlants(searchTerm);  // Trigger data fetching with the search term
    }
  };

  // Get current plants for the current page
  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = plants.slice(indexOfFirstPlant, indexOfLastPlant);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Plant List</h1>

      {/* Button to open modal */}
      <button onClick={() => setIsModalOpen(true)}>
        Add Plants
      </button>

      {/* Modal for searching plants */}
      {isModalOpen && (
        <div className="modal" style={{ display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}  // Update the search term state
                placeholder="Search for a plant"
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      )}


      {/* Display loading message */}
      {loading && <p>Loading...</p>}

      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the list of plants in card format */}
      {!loading && !error && searchTerm.trim() !== '' && currentPlants.length > 0 && (
        <div className="plant-grid">
          {currentPlants.map((plant) => (
            <div key={plant.id} className="plant-card">
              {/* Display plant image if available */}
              {plant.default_image && (
                <img 
                  src={plant.default_image.medium_url || plant.default_image.small_url} 
                  alt={plant.common_name || 'Plant Image'} 
                  className="plant-image"
                />
              )}
              <h3>{plant.common_name ? capitalizeWords(plant.common_name) : 'Unknown'}</h3>
              <p><strong>Scientific Name:</strong> {plant.scientific_name ? capitalizeWords(plant.scientific_name) : 'Unknown'}</p>
              <p><strong>Watering:</strong> {plant.watering || 'Unknown'}</p>
              <p><strong>Sunlight:</strong> {Array.isArray(plant.sunlight) ? plant.sunlight.join(', ') : 'Unknown'}</p>
              <p><strong>Indoor:</strong> {plant.indoor ? 'Yes' : 'No'}</p>
              <p><strong>Hardiness:</strong> {plant.hardiness ? `Zone ${plant.hardiness.min} - ${plant.hardiness.max}` : 'Unknown'}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && searchTerm.trim() !== '' && plants.length > plantsPerPage && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(plants.length / plantsPerPage) }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Show a message if no plants are found */}
      {!loading && !error && searchTerm.trim() !== '' && plants.length === 0 && (
        <p>No plants found. Try a different search term.</p>
      )}
    </div>
  );
};

export default PlantList;
