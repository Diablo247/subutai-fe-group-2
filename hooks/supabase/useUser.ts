"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export function useUserData() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch user from your DB
    const fetchUser = async (userId: string) => {
      const { data, error } = await supabase
        .from("users") // or "profiles"
        .select("*")
        .eq("id", userId)
        .single();

      if (error) console.error("Error fetching user:", error);
      else setUser(data);

      setLoading(false);
    };

    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        fetchUser(session.user.id);
      } else {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const userId = session?.user?.id;
      if (userId) fetchUser(userId);
      else setUser(null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return { user, loading };
}
