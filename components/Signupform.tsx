"use client";

import { useState, FormEvent } from "react";
import { useSignup } from "@/hooks/supabase/useSignup";
import '../css/form.css';
import { useRouter } from "next/navigation";
export default function SignupForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { signUpNewUser, loading, error } = useSignup();
  const router = useRouter()

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const result = await signUpNewUser(email, password, name);

    if (!result.success) {
        router.replace('/signin')
      // alert("Signup failed. Check console.");
      return;
    }

    // alert("Signup successful!");
  };

  return (
    <form
      onSubmit={handleSignup}
      style={{
    width: "100%",         
    maxWidth: "500px",     
    margin: "0 auto",      
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  }}
    //   className="w-full max-w-md bg-white p-8 shadow-md rounded-lg"
    >
        <label>Name</label>
      <input
        type="text"
        placeholder="Name"
        className="w-full border border-gray-300 p-3 rounded mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
        <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 p-3 rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

    <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-300 p-3 rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
 <label>Confirm Password</label>
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full border border-gray-300 p-3 rounded mb-6"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <p className="text-center text-sm text-gray-500 mt-1">
        Alreaady have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Sign In 
        </a>
      </p>
     <div style={{marginTop:'1rem' , backgroundColor:'#4A4DE8'}}>
       <button
  type="submit"
  disabled={loading}
  style={{
    width: "100%",                    
    backgroundColor: "#2563EB",         
    color: "white",                      
    padding: "0.75rem",                 
    borderRadius: "0.5rem",           
    fontWeight: 600,                      
    transition: "background-color 0.2s",  
    cursor: loading ? "not-allowed" : "pointer",
  }}
  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1D4ED8"} 
  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#2563EB"}
>
  {loading ? "Logging in..." : "Login"}
</button>

     </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
