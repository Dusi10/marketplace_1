import { FaStar } from "react-icons/fa";
import "../formating/format.css";
import { useState } from "react";
import { Button } from "react-bootstrap";

export const Rating = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div>
      {/*Creating 5 stars with mapping each star to an element of a 5 slot array */}
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label className="starLabel">
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={
                rating != null
                  ? ratingValue <= (hover || rating)
                    ? "#0e5feb"
                    : "#e4e5e9"
                  : "#e4e5e9"
              }
              size={35}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );

      })}<span className="spacing"><Button variant="outline-primary">SUBMIT</Button></span>
              
    </div>
  );
};
