import { Button } from "react-bootstrap";
import './Plantcard.css'; 
/**
 * Renders a card displaying plant information.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.plant - The plant object containing plant information.
 * @param {string} props.plant.common_name - The common name of the plant.
 * @param {string} props.plant.scientific_name - The scientific name of the plant.
 * @param {Array} props.plant.other_name - An array of other names for the plant.
 * @param {string} props.plant.watering - The watering requirements for the plant.
 * @param {Array} props.plant.sunlight - The sunlight requirements for the plant.
 * @param {boolean} props.plant.indoor - Indicates if the plant can be grown indoors.
 * @param {Object} props.plant.hardiness - The hardiness zone range for the plant.
 * @param {number} props.plant.hardiness.min - The minimum hardiness zone for the plant.
 * @param {number} props.plant.hardiness.max - The maximum hardiness zone for the plant.
 * @param {Object} props.plant.default_image - The default image object for the plant.
 * @param {string} props.plant.default_image.medium_url - The medium size image URL for the plant.
 * @param {string} props.plant.default_image.small_url - The small size image URL for the plant.
 */
export default function PlantCard({ plant }) {
    // Helper to capitalize words
    const capitalizeWords = (str) => {
        if (!str || typeof str !== "string") return "Unknown";
        return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <div className="plant-card">
            {/* Plant Image */}
            {plant.default_image && (
                <img
                    src={plant.default_image.medium_url || plant.default_image.small_url}
                    alt={plant.common_name || "Plant Image"}
                    className="plant-image-details"
                />
            )}

            {/* Plant Info */}
            <div className="plant-info">
                <h3>{plant.common_name ? capitalizeWords(plant.common_name) : "Unknown"}</h3>
                <p><strong>Scientific Name:</strong> {plant.scientific_name ? capitalizeWords(plant.scientific_name) : "Unknown"}</p>
                <p><strong>Other Names:</strong> {plant.other_name ? plant.other_name.map(capitalizeWords).join(", ") : "None"}</p>
                <p><strong>Watering:</strong> {plant.watering ? capitalizeWords(plant.watering) : "Unknown"}</p>
                <p><strong>Sunlight:</strong> {Array.isArray(plant.sunlight) ? plant.sunlight.map(capitalizeWords).join(", ") : "Unknown"}</p>
                <p><strong>Indoor:</strong> {plant.indoor ? "Yes" : "No"}</p>
                <p><strong>Hardiness:</strong> {plant.hardiness ? `Zone ${plant.hardiness.min} - ${plant.hardiness.max}` : "Unknown"}</p>
                <Button variant="primary">Add to Garden</Button>
            </div>
        </div>
    );
}
