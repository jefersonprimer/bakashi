'use client'

// components/Carousel.tsx
import { useRef } from "react";

const Carousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <h1 style={{ textAlign: "center" }}>Carrossel Full Width</h1>
      <div
        className="outer"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "500px", // Altura total da área visível
          overflow: "hidden",
        }}
      >
        {/* Botão esquerdo */}
        <button
          onClick={scrollLeft}
          style={{
            position: "absolute",
            left: "10px",
            zIndex: 10,
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          ◀
        </button>

        <div
          className="flex-container"
          ref={containerRef}
          style={{
            paddingLeft: "50px",
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            flexWrap: "nowrap",
            width: "100%",
            scrollBehavior: "smooth",
            gap: "5px",
            height: "400px", // Altura total da área de exibição dos cards
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="card"
              style={{
                flex: "0 0 250px", // Largura dos cards
                height: "410px",   // Altura dos cards
                border: "1px solid black",
                textAlign: "center",
                lineHeight: "250px", // Alinha o texto no meio do card
                backgroundColor: "#f0f0f0",
              }}
            >
              Card {index + 1}
            </div>
          ))}
        </div>

        {/* Botão direito */}
        <button
          onClick={scrollRight}
          style={{
            position: "absolute",
            right: "10px",
            zIndex: 10,
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Carousel;
