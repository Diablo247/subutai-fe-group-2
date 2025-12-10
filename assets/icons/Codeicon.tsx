'use client'

import * as React from 'react'

interface SvgComponentProps extends React.SVGProps<SVGSVGElement> {
  size?: number // optional prop for width & height
}

const Codeicon: React.FC<SvgComponentProps> = ({ size = 52, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <rect
        x="0.794037"
        y="0.794037"
        width="50.0243"
        height="50.0243"
        rx="11.2489"
        fill="#4A4DE8"
        fillOpacity="0.36"
      />
      <rect
        x="0.794037"
        y="0.794037"
        width="50.0243"
        height="50.0243"
        rx="11.2489"
        stroke="#4A4DE8"
        strokeWidth="1.58807"
      />
      <rect x="10.3225" y="10.3226" width="30.9674" height="30.9674" fill="url(#pattern0_12_65)" />
      <defs>
        <pattern id="pattern0_12_65" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_12_65" transform="scale(0.0111111)" />
        </pattern>
        <image
          id="image0_12_65"
          width="90"
          height="90"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADiUlEQVR4nO2cz6tNURTHz3tCfiQjZMSEZ2RizEDKjzJgxFMGppS/wMAAJe+V6MlDPZFSMjBj4mWqjJCJMpAfkef5mfDR6Z6BrnP23ec4e6+1z1ufupNbZ6+1d+fu797ru/fNMsMwDMMwDMMwDMMwDH+AYWCoxiNGHYCFwATwCfgGXAIW1WrEGAwwzr9MeDxq1JwuPpQM9EfvRozBACOUM+PxuOELcKBioKe9GzEaz885ZzweN3wBHlQM9H7vRgwvIZytGOj1Ax43fAE2VAxyvp4e9m7IcGNCGAlMCOMATFcM9Oh/tqu/XgKsAe4Bv4BXwBEBIRxp2OYS4DLwtficAxZk2igSfVLS8b0Rd4SzTYUQmCxpbzLTBnChovO3AsQabVsIgS8Vbe7JtADsppqbAeKNVcQaa9jekGMqegesbrsPTZJcBbx1DPSuFIQQOOvow11RkSzehDuOBKdS2RHS05hnjr4cbbcn9ZI77EjsObAspR0hsAn4UdH+d2Bjez2p1+F8GVRGvrzbkuKOEDjmeHkeR7XJCp/ukSOh46nuCOlNTfcdfRtvI45vMqcdiTwE5qdcGgXW5nZYRZzfwM62YrmS2Az8rEjiM7CuC6VR4KDjZXoNrGgzXn/w5cALRwKHulQaBW44+nq77XjygYVKoyIvluhPSbA0GnWqVCEOmZxHGEX8tSx3EPQIoyxntSzgEfYIg27QNG1JUeARBik5aCuyoMAjDFJEc3RMpGxIII8wQFl4R90G84K3ikI4ATzCgEbH9ZQHeqRtj1DTQKuZOgjgEQacOrYnK4YoEMKgjpKW5R1KTo0GdZSkNywoOTUa3FGS3oKj4NRoNEdJsqiEjh1hPEdJqkyKsBCKOEoShX8EhVDMUYodGGEhFHWUYv6UEBRCDY5SNHFASAi1OErRljvIeIQqHKWoR8IQEELpDVr0LSkCQqil5BD12C7xD8uoKaI1LRtuS6E0OkDgZQ+iexbCpzRcn/CI90b11QqPy0JXU/AIHQOt57LQX3Ncrsr9q4+tKXiEwKmSWBczjQAr8+tuwHvgKbAvFY8QmAecLC6ivgRO5N9lXQYFpdE5AUo8ws6DEo+w06DEI+w8KPAI5wSYEMYBE8I4YEIYB2BGy6nRTkPPd+wnH3wTwjah979G/ZyXzqtzAEuBa4XTkX+uAIul8+os9Axgff/SZRiGYRiGYRiGYRhGppg/9fPMEjfn+kAAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  )
}

export default Codeicon
