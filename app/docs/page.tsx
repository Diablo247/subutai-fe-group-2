"use client";
import React from 'react'
import Navbar from '@/components/Navbar'
const Docs:React.FC = () => {
  return (
    <div >
        <Navbar/>
         <div style={{paddingTop:'2rem' , paddingBottom:'2rem'}}></div>
        <p style={{
          fontWeight:"600",
          fontSize:'2rem',
          textAlign:"center"
        }}><span style={{
          color:'#4A4DE8'
        }}>
          Tourly</span> Documentation</p>
    </div>
  )
}

export default Docs