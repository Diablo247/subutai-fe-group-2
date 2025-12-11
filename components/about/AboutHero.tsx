"use client";
import React from 'react'
import '../../css/navabar.css'
const AboutHero:React.FC = () => {
  return (
    <div>
       <p style={{
          fontWeight:"600",
          fontSize:'2rem',
          textAlign:"center",
          color:'#000000',
        }}> About <span style={{
          color:'#4A4DE8'
        }}>
          Tourly</span></p>
      <p className="onboarding-text">
  As developers, we experienced firsthand how difficult it was to onboard new users effectively.
  Existing solutions were either too complex, too expensive, or didn't deliver the experience we wanted.
  <br /><br />
  So we built <strong>Tourly</strong> — a platform that combines powerful features with incredible ease of use.
  We wanted to create something that any team could integrate in minutes, not weeks. Something that felt native
  to every application, not like a clunky third-party widget.
  <br /><br />
  We're just getting started. We're constantly innovating, listening to our community, and building
  the future of user onboarding.
</p>

    </div>
  )
}

export default AboutHero