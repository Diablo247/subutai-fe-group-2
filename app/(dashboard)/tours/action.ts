// app/tours/actions.ts
import { supabase } from "@/lib/supabase";

export async function getTours() {
  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createTour(payload: { title: string; description: string }) {
  const { error } = await supabase.from("tours").insert(payload);
  if (error) throw error;
}

export async function updateTour(
  id: string,
  payload: { title: string; description: string }
) {
  const { error } = await supabase.from("tours").update(payload).eq("id", id);
  if (error) throw error;
}

export async function deleteTour(id: string) {
  const { error } = await supabase.from("tours").delete().eq("id", id);
  if (error) throw error;
}
