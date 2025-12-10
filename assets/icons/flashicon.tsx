"use client";
import * as React from "react";

interface SvgComponentProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // optional prop to set both width and height
  width?: number; // optional separate width
  height?: number; // optional separate height
}

const  FlashIcon: React.FC<SvgComponentProps> = ({
  size = 52,
  width,
  height,
  ...props
}) => {
  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={finalWidth}
      height={finalHeight}
      fill="none"
      {...props}
    >
      <rect
        width={50.024}
        height={50.024}
        x={0.794}
        y={0.794}
        fill="#4A4DE8"
        fillOpacity={0.36}
        rx={11.249}
      />
      <rect
        width={50.024}
        height={50.024}
        x={0.794}
        y={0.794}
        stroke="#4A4DE8"
        strokeWidth={1.588}
        rx={11.249}
      />
      <path fill="url(#a)" d="M6.591 6.149h39v39h-39z" />
      <defs>
        <pattern
          id="a"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <use xlinkHref="#b" transform="scale(.01111)" />
        </pattern>
        <image
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADNElEQVR4nO3cPWxOURzH8VsEJSJIhJCYkIaYGAxGIWknicVbF5tBmUgsNKQhkajEy2KwiGKwiaRBwmAhtVi8DoogXgYhUV85aYeqe97uPZ5zznP/n/3533t+z9Okz++c+xSFEEIIIYRwAMwCTgOfgDfAADDT5bXCAzDIvwZ8ZggLYD3wqyTot7bXCkfAdOAR5T64zhEWQB96922vFw6AJcAXQ9CXXOYIC2AIs0O2GcIC2ILdNtscYQB0As8cgl5jmiMsgH6HkMeA2bZZQgNYBfxwCPqFboZwAAzj5pbLPFEC2I27M2UzhAUwHxj1CHqfbaYoAVzAz+ayOcIA2DDxX4SPFaaZwq800vkOTJs6SxgAB/A3YpoppgCWWkojnWtTZwkD4DrVHDfNFf6lkU7v5FnCXBo9rxH0Rt1sMYn606eeRZPniXqlkY7sE9oAHR6lkc4D64WaDthDfbJPaAIsAN4HCPqw8UJNB1wkDNknDFwa6azVXqjJgBkVSiMd2SfUAQ4SzsvY62m30khH9gnLADcIazD2mpIDdJOm9jnEDsxR5y5IW/6H2IETpC/vQ+xAF/CT9I0WmZdGd8lDvrs0QC95eKe6lyJHwMJApVEr7Cxypc7CkYfhImfAR9KndnZWFzmb+CKQumNF7ia+baVMParRWeROfaVlPOxUP9lbY2eUHOBs4JCvxl5TkoDbAUP+BiyLvaYkAa8DBr0/9npSPi42FijkEbWVFntNSQLWBQpZvVlyRk8H2B4o6HPai4hCBX2k0aVRqwCXG10atQrwsGbIqg/viL2O5AGfa4Ssdna6Yq8hecDimp/m/thryAKwqUbIr4C5sdeQBWBvjaC7Y99/NoCTFUMein3vWQFuVghZSiNfwNMKQfd5X6jJGD9H7Xvw5omURp6AlZ4hS2lUBdDjGfT5ShdqOvyeDJDSqEVPbe2qfKGmA+44hnxPSqMaHH8hTEqjOoB5wG+HoKU0CvDT8jZSGtUF7LDGDD2x7zN7wFFLyPJjVSEAVyyl0fLY99gWMD8rLqVRKMBXTciPpTQKiPKjvlIategQ+2Ds+2o7/H2IXT0Lc6otntUWQgghhCj+lz/AvfRerH4VZgAAAABJRU5ErkJggg=="
          id="b"
          width={90}
          height={90}
          preserveAspectRatio="none"
        />
      </defs>
    </svg>
  );
};

export default FlashIcon;
