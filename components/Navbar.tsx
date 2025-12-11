"use client";
import React from 'react'
import Link from 'next/link';
import LogoSvg from '@/assets/icons/logoicon';
import '../css/navabar.css'
// import { IoMenuOutline } from "react-icons/io5";
const Navbar:React.FC = () => {
  return (
    <div>
      <div style={{display:'flex' , flexDirection:'row' , alignItems:'center' , justifyContent:'space-around' , paddingTop:'1rem' , paddingBottom:'1rem'}}>
        <LogoSvg size={50} />
        <div style={{display:'flex' , flexDirection:'row' , gap:'2rem'}}>
         <Link href="/" className="text-style">
            Home
          </Link>

          <Link href="/docs" className="text-style">
            Docs
          </Link>

          <Link href="/about" className="text-style">
            About
          </Link>
       
        </div>
        <div style={{display:'flex' , alignItems:'center' , gap:'1rem'}}>
                   <Link
             href='/register'
  style={{
    backgroundColor: "transparent",   
    border: "2px solid #4A4DE8",      
    borderRadius: "13px",           
    padding: "12px 24px",                          
    textAlign: "center",             
    display: "inline-block",          
    cursor: "pointer"    ,
    fontSize:'20px',   
    fontWeight:'500' ,  
    color:'#000000',
  }}
>
    Get started
</Link>

               <Link
               href='/login'
  style={{
    backgroundColor: "#4A4DE8",
    borderRadius: "13px", 
    padding: "12px 24px",   
    color: "#ffffff",     
    textAlign: "center",    
    display: "inline-block",
    cursor: "pointer"  ,
    fontSize:'20px',
     fontWeight:'500' ,        
  }}
>
  Sign In 
</Link>
        </div>
      </div>
      {/* <IoMenuOutline /> */}

    </div>
  )
}

export default Navbar