'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface AddStepModalProps {
  tourId: string
  currentCount: number
  close: () => void
  refresh: () => void
}

export default function AddStepModal({ tourId, currentCount, close, refresh }: AddStepModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    if (!title.trim()) return

    setLoading(true)

    await supabase.from('tour_steps').insert({
      tour_id: tourId,
      title,
      description,
      order: currentCount + 1,
    })

    await refresh()
    close()
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 sm:p-8 w-[90%] max-w-md shadow-xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Add Step</h2>

        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          className="w-full border rounded-lg px-4 py-2 mb-4 outline-none focus:ring-2 focus:ring-indigo-500/70 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="w-full border rounded-lg px-4 py-2 h-24 outline-none focus:ring-2 focus:ring-indigo-500/70 text-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={close} className="text-gray-500 font-medium text-sm" disabled={loading}>
            Cancel
          </button>

          <button
            onClick={handleAdd}
            disabled={!title.trim() || loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold shadow text-sm disabled:opacity-50"
          >
            {loading ? 'Saving…' : 'Add Step'}
          </button>
        </div>
      </div>
    </div>
  )
}
