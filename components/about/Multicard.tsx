"use client";

import React from "react";
import Card from "./card";
import '../../css/homecard.css';

const MultiCard: React.FC = () => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.5rem" }}>
  <p className="custom-text-medium">Our Values</p>
  <p className="custom-text">The principles that guide everything we do</p>
</div>

      <div 
      style={{
    display: "flex",
    gap: "4.5rem",       
    padding: "1.5rem",    
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent:"center"
  }}
      >
        <Card
          title="User First"
          subtitle="Everything we build is designed to create better experiences for end users."
        />
        <Card
          title="Simplicity"
          subtitle="We believe powerful tools should be simple to use and easy to integrate."
        />
        <Card
          title="Community"
          subtitle="We grow by listening to our users and building what they need."
        />
        <Card
          title="Innovation"
          subtitle="We constantly push boundaries to deliver cutting-edge onboarding solutions."
        />
      </div>
    </div>
  );
};

export default MultiCard;
