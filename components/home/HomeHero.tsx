'use client'
import React from 'react'

const HomeHero: React.FC = () => {
  return (
    <div className="flex gap-6 p-6 flex-wrap justify-center">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <p
        style={{
            fontSize:'1.3rem',
            fontWeight:'400',
            color:'#777777'
        }}
        >Turn new visitors into confident users with interactive step-by-step<br/> product tours. Build, customize, and embed onboarding flows in  <br/> minutes — no code required.</p>
        <div style={{paddingTop:'1rem' , paddingBottom:'1rem'}}></div>
        <div style={{display:'flex' , gap:'2rem' , flexWrap:'wrap'}}>
                  <div
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
</div>
            <div
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
   Try demo tour
</div>

      

        </div>
      </div>
    </div>
  )
}

export default HomeHero
