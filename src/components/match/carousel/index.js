import React, { useEffect, useState } from "react";
import "./carousel.css";

const Carousel = (props) => {
  const { children, show } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  const [touchPosition, setTouchPosition] = useState(null);

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    console.log(currentIndex)
    console.log(length)
    console.log(show)
    // if (currentIndex <= length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    // }
  };

  const prev = () => {
    // if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    // }
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      next();
    }

    if (diff < -5) {
      prev();
    }

    setTouchPosition(null);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {true && (
          <ArrowButton direction="left" onClick={prev} />
        )}
        <div
          className="carousel-content-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`carousel-content show-${show}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
            }}
          >
            {children}
          </div>
        </div>
        {true && (
          <ArrowButton direction="right" onClick={next} />
        )}
      </div>
    </div>
  );
};

const ArrowButton = ({ direction, onClick }) => (
  <button onClick={onClick} className={`arrow-button ${direction}`}>
    {direction === "left" ? "<" : ">"}
  </button>
);

export default Carousel;
