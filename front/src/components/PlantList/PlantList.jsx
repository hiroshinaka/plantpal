import React, { useState } from 'react';
import './PlantList.css';   
import { getPlants, getPlantDetails } from '../../api/perenual';  
import PlantDisplayCard from '../PlantList/PlantDisplaycard';
import PlantCard from '../PlantList/Plantcard';

// Utility function to capitalize the first letter of each word

const PlantList = () => {
  //Search and display plants with pagination
  const [plants, setPlants] = useState([]);       // State to store the list of plants
  const [searchTerm, setSearchTerm] = useState('');  // State for user search input
  const [loading, setLoading] = useState(false);   // Loading state
  const [error, setError] = useState(null);        // Error state
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [isModalOpen, setIsModalOpen] = useState(false);    // State to control modal visibility
  const plantsPerPage = 6;      // Limit the number of plants per page

  // Detail‐modal state
  const [selectedId, setSelectedId]     = useState(null);
  const [details, setDetails]           = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [detailsError, setDetailsError]     = useState(null);





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
    // When a display‐card is clicked:
    const handleCardClick = async id => {
      setSelectedId(id);
      setLoadingDetails(true);
      setDetailsError(null);
      try {
        const data = await getPlantDetails(id);
        setDetails(data);
      } catch {
        setDetailsError('Could not load details.');
      } finally {
        setLoadingDetails(false);
      }
  };
  const closeDetails = () => {
    setSelectedId(null);
    setDetails(null);
  };

  const closeModal = () => {
    if (selectedId && selectedId !== 'SEARCH_MODAL') {
      // we’re in the DETAILS modal → go back to SEARCH modal
      setDetails(null);
      setDetailsError(null);
      setLoadingDetails(false);
      setSelectedId('SEARCH_MODAL');
    } else {
      // we’re in the SEARCH modal (or nothing) → fully close
      setSelectedId(null);
      setDetails(null);
      setDetailsError(null);
      setLoadingDetails(false);
      // (optional) clear search results:
      // setPlants([]);
      // setSearchTerm('');
    }
  };

  // Get current plants for the current page
  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = plants.slice(indexOfFirstPlant, indexOfLastPlant);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="plant-list-container">
      <h1>Plant List</h1>

      {/* Button to open modal */}
      <button onClick={() => setSelectedId('SEARCH_MODAL')}>Add Plants</button>

      {/* ─── SEARCH MODAL ─────────────────────────────────────────── */}
      {selectedId === 'SEARCH_MODAL' && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search for a plant"
              />
              <button type="submit">Search</button>
            </form>
            {loading && <p>Loading…</p>}
            {error   && <p className="error">{error}</p>}
            {!loading && !error && currentPlants.length > 0 && (
              <div className="plant-grid">
                {currentPlants.map(plant => (
                  <PlantDisplayCard
                    key={plant.id}
                    plant={plant}
                    onClick={handleCardClick}
                  />
                ))}
              </div>
            )}
            {!loading && !error && plants.length > plantsPerPage && (
              <div className="pagination">
                {Array.from({ length: Math.ceil(plants.length / plantsPerPage) }).map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i+1)}>
                    {i+1}
                  </button>
                ))}
              </div>
            )}
            {!loading && !error && plants.length === 0 && <p>No plants found.</p>}
          </div>
        </div>
      )}

      {/* ─── DETAILS MODAL ────────────────────────────────────────── */}
      {selectedId && selectedId !== 'SEARCH_MODAL' && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {loadingDetails && <p>Loading details…</p>}
            {detailsError  && <p className="error">{detailsError}</p>}
            {details       && <PlantCard plant={details} />}
          </div>
        </div>
      )}
    </div>
  );
}
export default PlantList;