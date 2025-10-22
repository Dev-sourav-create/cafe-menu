import React, { useState } from "react";

export const StarRating = ({ starCount = 5, value, onChange }) => {
  const [hoverValue, sethoverValue] = useState();

  return (
    <div className="cursor-pointer">
      {Array.from({ length: starCount }).map((_, idx) => (
        <span
          key={idx}
          onClick={() => onChange(idx + 1)}
          onMouseEnter={() => sethoverValue(idx + 1)}
          onMouseLeave={() => sethoverValue(0)}
          className={`text-3xl px-0.5 ${
            (hoverValue == 0 && idx < value) || idx < hoverValue ? "gold" : ""
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};
