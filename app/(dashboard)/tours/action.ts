import { supabase } from '@/lib/supabase'

export async function getTours() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createTour(payload: { title: string; description: string }) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')

  const { error } = await supabase.from('tours').insert({
    title: payload.title,
    description: payload.description,
    user_id: user.id,
  })

  if (error) throw error
}

export async function updateTour(id: string, payload: { title: string; description: string }) {
  const { error } = await supabase.from('tours').update(payload).eq('id', id)

  if (error) throw error
}

export async function deleteTour(id: string) {
  const { error } = await supabase.from('tours').delete().eq('id', id)
  if (error) throw error
}
