"use client";

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export function useSignup() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signUpNewUser = async (email: string, password: string, name: string) => {
    setLoading(true)
    setError(null)

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError || !authData.user) {
        setError(authError?.message || 'Signup failed')
        return { success: false, error: authError?.message || 'Signup failed' }
      }

      const userId = authData.user.id

      const { error: profileError } = await supabase.from('users').insert({
        id: userId,
        name,
        email,
      })

      if (profileError) {
        console.error('Error creating profile:', profileError)
        setError(profileError.message)
        return { success: false, error: profileError.message }
      }
      
      return { success: true, data: authData }
    } catch (err) {
      console.error('Unexpected signup error:', err)

      let errorMessage = 'An unexpected error occurred'

      if (err instanceof Error) {
        errorMessage = err.message
      }

      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return { signUpNewUser, loading, error }
}
