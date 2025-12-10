"use client";
import React from "react";
import "../../css/homecard.css";

interface CardProps {
  title: string;
  subtitle: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, className }) => {
  return (
    <div className={`card ${className || ""}`}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          padding: "1.5rem",
        }}
      >
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-subtitle">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
