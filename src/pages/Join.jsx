import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinPage() {
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
    <div>
      <h2>Join Page</h2>
      <div className="cards">
        {[1, 2, 3, 4].map(cardId => (
          <div key={cardId} className="card" onClick={() => handleCardClick(cardId)}>
            Card {cardId}
          </div>
        ))}
      </div>
    </div>
  );
}

export default JoinPage;
