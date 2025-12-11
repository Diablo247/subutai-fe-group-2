"use client";

import Navbar from "@/components/Navbar";
import SignupForm from "../../components/Signupform";
import '../../css/form.css';
export default function Signup() {
  return (
    <>
      <Navbar />

        <div className="container">
        <p className="title">Welcome back</p>
        <p className="subtitle">Login to your account</p>
        <SignupForm />
      </div>
    </>
  );
}
