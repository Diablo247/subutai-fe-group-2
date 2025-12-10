'use client'
import React from 'react'
import '../../css/homecard.css'

interface CardProps {
  image: string | React.ReactNode
  title: string
  subtitle: string
  className?: string
}

const Card: React.FC<CardProps> = ({ image, title, subtitle, className }) => {
  return (
    <div className={`card ${className || ''}`}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '1.5rem',
        }}
      >
        <div className="card-img" style={{ width: '3rem', height: '3rem', flexShrink: 0 }}>
          {typeof image === 'string' ? <img src={image} alt={title} /> : image}
        </div>

        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-subtitle">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
