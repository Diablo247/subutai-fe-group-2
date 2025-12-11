



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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path: string) => pathname === path;

  const linkStyle = (path: string) => ({
    textDecoration: "none",
    color: isActive(path) ? "#4A4DE8" : "#000",
    fontWeight: isActive(path) ? 600 : 500,
  });

  const buttonStyle = {
    borderRadius: "13px",
    padding: "12px 24px",
    textAlign: "center" as const,
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 500,
  };

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
        <LogoSvg size={1} />

        {!isMobile ? (
          <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
            <Link href="/" passHref><span style={linkStyle("/")}>Home</span></Link>
            <Link href="/docs" passHref><span style={linkStyle("/docs")}>Docs</span></Link>
            <Link href="/about" passHref><span style={linkStyle("/about")}>About</span></Link>
          </div>
        ) : menuOpen ? (
          <IoCloseSharp size={30} style={{ cursor: "pointer" }} onClick={() => setMenuOpen(false)} />
        ) : (
          <IoMenuOutline size={30} style={{ cursor: "pointer" }} onClick={() => setMenuOpen(true)} />
        )}

        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link href="/signup" passHref>
              <span
                style={{
                  ...buttonStyle,
                  backgroundColor: "transparent",
                  border: "2px solid #4A4DE8",
                  color: "#000",
                }}
              >
                Get Started
              </span>
            </Link>

            <Link href="/signin" passHref>
              <span
                style={{
                  ...buttonStyle,
                  backgroundColor: "#4A4DE8",
                  color: "#fff",
                  border: "none",
                }}
              >
                Sign In
              </span>
            </Link>
          </div>
        )}
      </div>

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
          <Link href="/" passHref><span style={linkStyle("/")}>Home</span></Link>
          <Link href="/docs" passHref><span style={linkStyle("/docs")}>Docs</span></Link>
          <Link href="/about" passHref><span style={linkStyle("/about")}>About</span></Link>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
            <Link href="/signup" passHref>
              <span
                style={{
                  ...buttonStyle,
                  backgroundColor: "transparent",
                  border: "2px solid #4A4DE8",
                  color: "#000",
                  padding: "10px 20px",
                }}
              >
                Get Started
              </span>
            </Link>

            <Link href="/signin" passHref>
              <span
                style={{
                  ...buttonStyle,
                  backgroundColor: "#4A4DE8",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                }}
              >
                Sign In
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
