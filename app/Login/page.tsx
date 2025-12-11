"use client";

import Navbar from "@/components/Navbar";
import LoginForm from "../../components/Loginform";
import '../../css/form.css';

export default function Login() {
  return (
    <div>
      <Navbar />
      
      <div className="container">
  <p className="title">Welcome back</p>
  <p className="subtitle">Login to your account</p>
  <LoginForm />
</div>

    </div>
  );
}
