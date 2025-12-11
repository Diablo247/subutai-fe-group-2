'use client'

import { useState, FormEvent } from 'react'
import { useSignin } from '@/hooks/supabase/useSingin'
import '../css/form.css'
import { useRouter } from 'next/navigation'

interface LoginFormProps {
  onSuccess?: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter() // ✅ Correct router hook

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signInUser, loading, error } = useSignin()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await signInUser(email, password)

    if (res.success) {
      onSuccess?.()
      router.push('/dashboard') // ✅ Now works
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      style={{
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {error && <p className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4 text-sm">{error}</p>}

      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-300 p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <p className="text-center text-sm text-gray-500 mt-1">
        Don&apos;t have an account?{' '}
        <a href="/register" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>

      <div style={{ marginTop: '1rem' }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#2563EB',
            color: 'white',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            fontWeight: 600,
            transition: 'background-color 0.2s',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </form>
  )
}
