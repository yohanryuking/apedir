import React from "react";
import "@smastrom/react-rating/style.css";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { addStars } from "../../api/starsRate";
import Confetti from "../Confetti/Confetti";
import { useState } from "react";

export default function Stars(props) {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChangeStars = async (rate) => {
    try {
      await addStars(rate, props.user, props.bussiness);
      setShowConfetti(true);
    } catch (error) {
      console.error("Error adding stars:", error);
    }
  };

  const itemStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#f59e0b",
    inactiveFillColor: "gray",
  };

  const width = props.w;

  return (
    <section
      className="flex justify-between items-center"
      style={{ position: "relative" }}
    >
      <Rating
        style={{ maxWidth: width }}
        value={props.rate}
        onChange={(event) => {
          const newRating = event;
          props.setRate(newRating);
          handleChangeStars(newRating).then(() => {
            // props.setRate(newRating);
          });
        }}
        {...(props.readOnly ? { readOnly: true } : {})}
        itemStyles={itemStyles}
      />
      {showConfetti && <Confetti />}
      {props.rate > 0 && (
        <p style={{ fontSize: "1em", marginLeft: "5px" }}>
          {parseFloat(props.rate).toFixed(1)}
        </p>
      )}
    </section>
  );
}
