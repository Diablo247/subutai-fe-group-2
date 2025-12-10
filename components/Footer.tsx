'use client'
import React from 'react'
import '../css/footer.css'
import FooterLogo from '@/assets/icons/footerlogoicon'
const footerData = [
  {
    title: 'Products',
    items: ['Features'],
  },
  {
    title: 'Resources',
    items: ['About us', 'Documentation'],
  },
  {
    title: 'Company',
    items: ['Privacy Policy', 'Terms of Service'],
  },
]
const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: '#0B0B2A',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        padding: '2rem 1rem',
        color: '#fff',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {/* Logo */}
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}>
          <FooterLogo width={300} height={100} />
        </div>

        {/* Footer sections */}
        {footerData.map((section, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.5rem',
              minWidth: '150px',
            }}
          >
            <p style={{ fontWeight: 'bold', margin: 0 }}>{section.title}</p>
            {section.items.map((item, itemIdx) => (
              <p key={itemIdx} style={{ margin: 0, fontSize: '0.9rem' }}>
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          width: '100%',
          height: '2px',
          backgroundColor: '#777777',
          margin: '2rem 0',
        }}
      />

      {/* Copyright */}
      <p style={{ textAlign: 'center', fontSize: '0.9rem', margin: 0 }}>
        © 2025 Tourly. All rights reserved.
      </p>
    </div>
  )
}

export default Footer
