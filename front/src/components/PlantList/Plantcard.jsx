import { Button } from "react-bootstrap";

export default function PlantCard({ plant }) {
    return (
        <div>
            <div className="plant-card">
                {/* Display plant image if available */}
                {plant.default_image && (
                    <img 
                        src={plant.default_image.medium_url || plant.default_image.small_url} 
                        alt={plant.common_name || 'Plant Image'} 
                        className="plant-image"
                    />
                )}
                <h3>{plant.common_name ? plant.common_name : 'Unknown'}</h3>
                <p><strong>Scientific Name:</strong> {plant.scientific_name ? plant.scientific_name : 'Unknown'}</p>
                <p><strong>Other Names:</strong> {plant.other_name ? plant.other_name.join(', ') : 'None'}</p>
                
                <p><strong>Watering:</strong> {plant.watering || 'Unknown'}</p>
                <p><strong>Sunlight:</strong> {Array.isArray(plant.sunlight) ? plant.sunlight.join(', ') : 'Unknown'}</p>
                <p><strong>Indoor:</strong> {plant.indoor ? 'Yes' : 'No'}</p>
                <p><strong>Hardiness:</strong> {plant.hardiness ? `Zone ${plant.hardiness.min} - ${plant.hardiness.max}` : 'Unknown'}</p>
                <Button variant="primary">Add to Garden</Button>
            </div>
        </div>
    )
}