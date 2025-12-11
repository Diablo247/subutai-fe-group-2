"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpNewUser = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError || !authData.user) {
        const message = authError?.message || "Signup failed";
        setError(message);
        return { success: false, error: message };
      }

      const userId = authData.user.id;

      // 2️⃣ UPSERT user profile instead of INSERT
      const { error: profileError } = await supabase
        .from("users")
        .upsert({
          id: userId,
          name,
          email,
        });

      if (profileError) {
        setError(profileError.message);
        return { success: false, error: profileError.message };
      }

      return { success: true, data: authData };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected signup error";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { signUpNewUser, loading, error };
}
