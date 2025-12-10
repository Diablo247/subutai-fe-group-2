import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  const signUpNewUser = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null); 

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError || !authData.user) {
        setError(authError?.message || "Signup failed");
        return { success: false, error: authError?.message || "Signup failed" };
      }

      const userId = authData.user.id;

      
      const defaultImageUrl = "/placeholder.png";

      let imageFile: File | null = null;
      try {
        const response = await fetch(defaultImageUrl);
        const blob = await response.blob();
        imageFile = new File([blob], "default.png", { type: blob.type });
      } catch (err) {
        console.error("Failed to load default signup image", err);
        setError("Failed to load default profile image");
      }

      // 3️⃣ Upload default image to Supabase Storage
      let avatarUrl = null;
      if (imageFile) {
        const filePath = `avatars/${userId}.png`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, imageFile, { upsert: true });

        if (uploadError) {
          console.error("Avatar upload error:", uploadError);
          setError(uploadError.message);
        } else {
          const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
          avatarUrl = data.publicUrl;
        }
      }

      const { error: profileError } = await supabase.from("users").insert({
        id: userId,
        name,
        email,
        avatar_url: avatarUrl,
      });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        setError(profileError.message);
        return { success: false, error: profileError.message };
      }

      return { success: true, data: authData };
    } catch (err: any) {
      console.error("Unexpected signup error:", err);
      setError(err.message || "Unexpected error");
      return { success: false, error: err.message || "Unexpected error" };
    } finally {
      setLoading(false);
    }
  };

  return { signUpNewUser, loading, error }; 
}
