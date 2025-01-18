import React from "react";

interface OutdoorProps {
  imageUrl: string;
  title: string;
  audiotype: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  addToQueueText?: string;
  addToQueueLink?: string;
}

const Outdoor: React.FC<OutdoorProps> = ({
  imageUrl,
  title,
  audiotype,
  description,
  buttonText = "Saiba mais",
  buttonLink = "#",
  addToQueueText = "Adicionar à Fila",
  addToQueueLink = "#",
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "16px",
        padding: "24px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        width: "1350px",
        height: "371px",
        margin: "0 auto",
      }}
    >
      {/* Imagem */}
      <div
        style={{
          flex: "1", // Ajustado para ocupar 50% do container
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Texto */}
      <div
        style={{
          flex: "1", // Ajustado para ocupar 50% do container
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            margin: "0 0 16px",
            color: "#333",
          }}
        >
          {title}
        </h2>
        <h2
          style={{
            fontSize: "24px",
            margin: "0 0 16px",
            color: "#333",
          }}
        >
          {audiotype}
        </h2>
        <p
          style={{
            fontSize: "16px",
            margin: "0 0 16px",
            lineHeight: "1.5",
            color: "#555",
          }}
        >
          {description}
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          {buttonText && buttonLink && (
            <a
              href={buttonLink}
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#0070f3",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              {buttonText}
            </a>
          )}
          {addToQueueText && addToQueueLink && (
            <a
              href={addToQueueLink}
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#555",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              {addToQueueText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Outdoor;
