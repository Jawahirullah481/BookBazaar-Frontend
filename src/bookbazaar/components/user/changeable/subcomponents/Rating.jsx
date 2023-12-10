import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarBorder } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Rating = ({ rating }) => {

    let absoluteValue = Math.floor(rating);
    let decimalValue = rating.toString().substring(2);

    const ratingStars = [];

    function createRating(absoluteValue, decimalValue) {

        // Creating fill with gold
        for (let i = 1; i <= absoluteValue; i++) {
            ratingStars.push(
                <FontAwesomeIcon key={i} icon={faStar} style={{ color: "#c5ad03", }} className="rating-star" />
            )
        }

        // Creating half fill with gold
        if (decimalValue > 0) {
            absoluteValue += 1;
            ratingStars.push(
                <FontAwesomeIcon key={absoluteValue} icon={faStarHalfStroke} style={{ color: "#c5ad03", }} className="rating-star"/>
            )
        }

        // Creating border gold
        for (let i = absoluteValue + 1; i <= 5; i++) {
            ratingStars.push(
                <FontAwesomeIcon key={i} icon={faStarBorder} style={{ color: "#c5ad03", }} className="rating-star" />
            )
        }

    }

    createRating(absoluteValue, decimalValue)

    return (
        <div className="Rating">
            {ratingStars}
        </div>
    );
}

export default Rating;