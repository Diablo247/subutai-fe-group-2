"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMenuOutline, IoCloseSharp } from "react-icons/io5";
import LogoSvg from "@/assets/icons/logoicon";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); 

  // Check screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 
  const isActive = (path: string) => pathname === path;

  const linkStyle = (path: string) => ({
    textDecoration: "none",
    color: isActive(path) ? "#4A4DE8" : "#000",
    fontWeight: isActive(path) ? 600 : 500,
  });

  return (
    <div style={{ width: "100%", backgroundColor: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 2rem",
        }}
      >
        <LogoSvg size={50} />

        {!isMobile ? (
          // Desktop Links
          <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
            <Link href="/" style={linkStyle("/")}>Home</Link>
            <Link href="/docs" style={linkStyle("/docs")}>Docs</Link>
            <Link href="/about" style={linkStyle("/about")}>About</Link>
          </div>
        ) : (
          // Mobile Hamburger
          menuOpen ? (
            <IoCloseSharp size={30} style={{ cursor: "pointer" }} onClick={() => setMenuOpen(false)} />
          ) : (
            <IoMenuOutline size={30} style={{ cursor: "pointer" }} onClick={() => setMenuOpen(true)} />
          )
        )}

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link
              href="/register"
              style={{
                backgroundColor: "transparent",
                border: "2px solid #4A4DE8",
                borderRadius: "13px",
                padding: "12px 24px",
                textAlign: "center",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 500,
                color: "#000000",
              }}
            >
              Get Started
            </Link>

            <Link
              href="/login"
              style={{
                backgroundColor: "#4A4DE8",
                borderRadius: "13px",
                padding: "12px 24px",
                color: "#ffffff",
                textAlign: "center",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "1rem",
            padding: "1rem 2rem",
            borderTop: "1px solid #ddd",
          }}
        >
          <Link href="/" style={linkStyle("/")}>Home</Link>
          <Link href="/docs" style={linkStyle("/docs")}>Docs</Link>
          <Link href="/about" style={linkStyle("/about")}>About</Link>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
            <Link
              href="/register"
              style={{
                backgroundColor: "transparent",
                border: "2px solid #4A4DE8",
                borderRadius: "13px",
                padding: "10px 20px",
                textAlign: "center",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 500,
                color: "#000000",
              }}
            >
              Get Started
            </Link>

            <Link
              href="/login"
              style={{
                backgroundColor: "#4A4DE8",
                borderRadius: "13px",
                padding: "10px 20px",
                color: "#ffffff",
                textAlign: "center",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
