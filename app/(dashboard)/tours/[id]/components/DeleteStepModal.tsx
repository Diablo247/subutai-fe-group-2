'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Step {
  id: string
  title: string
  description: string
  order: number
}

interface DeleteStepModalProps {
  step: Step
  close: () => void
  refresh: () => void
}

export default function DeleteStepModal({ step, close, refresh }: DeleteStepModalProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)

    await supabase.from('tour_steps').delete().eq('id', step.id)

    await refresh()
    close()
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-[90%] max-w-md shadow-xl">
        <h2 className="text-xl font-bold text-red-600">Delete Step?</h2>
        <p className="text-gray-600 text-sm mt-2">
          Are you sure you want to delete{' '}
          <span className="font-semibold">&quot;{step.title}&quot;</span>? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={close} className="text-gray-500 font-medium text-sm" disabled={loading}>
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow font-semibold text-sm disabled:opacity-50"
          >
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
