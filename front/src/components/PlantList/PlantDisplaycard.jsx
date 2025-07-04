import './PlantDisplaycard.css'
import noImage from '../../assets/img/No_Image_Available.jpg'
export default function PlantDisplayCard({ plant, onClick }) {
    const capitalizeWords = (str) => {
        if (typeof str !== 'string') return '';  
        return str
            .split(' ')                     
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))  
            .join(' ');                    
        };
    const imageUrl =
    plant.default_image?.medium_url ||
    plant.default_image?.small_url ||
    noImage;  // Fallback image if no image is available

  return (
    <div
      className="plant-display-card"
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(plant.id)}
    >
      <img
        src={imageUrl}
        alt={plant.common_name || 'Plant'}
        className="plant-image"
      />
      <h3>{plant.common_name ? capitalizeWords(plant.common_name) : 'Unknown'}</h3>

    </div>
  );
}