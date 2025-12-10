"use client";
import React from 'react'
import '../css/footer.css'
import FooterLogo from '@/assets/icons/footerlogoicon';
const footerData = [
  {
    title: "Products",
    items: ["Features"],
  },
  {
    title: "Resources",
    items: ["About us", "Documentation"],
  },
  {
    title: "Company",
    items: [  "Privacy Policy","Terms of Service"],
  },
];
const Footer:React.FC = () => {
  return (
    <div style={{
       backgroundColor: "#0B0B2A",
    // position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 50,
      }}>
      <div className="flex gap-6 p-6 flex-wrap justify-center">
        <div className='flex-row-wrap'>
        <div>
      <FooterLogo width={200} height={100} />
        </div>
       {footerData.map((section, idx) => (
        <div key={idx} className="footer-section">
          <p className="footer-title">{section.title}</p>
          {section.items.map((item, itemIdx) => (
            <p key={itemIdx} className="footer-subtitle">
              {item}
            </p>
          ))}
        </div>
      ))}
        </div>
        <div
  style={{
    width: "100%",         
    height: "2px",          
    backgroundColor: "#777777",
    borderWidth: 0,        
    margin: "1rem 0",      
  }}
></div>
        <p className="footer-date">© 2025 Tourly. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer