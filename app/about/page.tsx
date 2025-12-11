"use client";
import React from 'react'
import Navbar from '@/components/Navbar'
import MultiCard from '@/components/about/Multicard';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
const About:React.FC = () => {
  return (
    <div style={{paddingLeft:10 , paddingRight:10}}>
        <Navbar/>
        <div style={{paddingTop:'2rem' , paddingBottom:'2rem'}}></div>
        <AboutHero/>
         <div style={{paddingTop:'2rem' , paddingBottom:'2rem'}}></div>
        <MultiCard/>
          <div style={{paddingTop:'2rem' , paddingBottom:'2rem'}}></div>
          <Footer/>
    </div>
  )
}

export default About