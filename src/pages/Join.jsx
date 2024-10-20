import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Join() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  const handleCardClick = (id) => {
    setScrollPosition(window.scrollY);
    navigate(`/card/${id}`);
  };

  return (
    <div className="cards font-semibold text-xl">
      <h2>Join Page</h2>
      <div>
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((cardId) => (
          <div
            key={cardId}
            className="card m-10"
            onClick={() => handleCardClick(cardId)}
          >
            Card {cardId}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Join;
