"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export function useSignin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return { success: false, error: authError.message };
      }

      return { success: true, data };
    } catch {
      const message = "Unexpected error occurred. Please try again.";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { signInUser, loading, error };
}
