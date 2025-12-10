'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Step {
  id: string
  title: string
  description: string
  order: number
}

const MIN_STEPS = 5

import AddStepModal from './components/AddStepModal'
import EditStepModal from './components/EditStepModal'
import DeleteStepModal from './components/DeleteStepModal'

export default function TourStepsPage({ params }: { params: { id: string } }) {
  const tourId = params.id

  const [tourTitle, setTourTitle] = useState<string>('')
  const [steps, setSteps] = useState<Step[]>([])

  const [showAddModal, setShowAddModal] = useState(false)
  const [editStep, setEditStep] = useState<Step | null>(null)
  const [deleteStep, setDeleteStep] = useState<Step | null>(null)

  const loadSteps = async () => {
    const { data: tour } = await supabase.from('tours').select('title').eq('id', tourId).single()

    if (tour) setTourTitle(tour.title)

    const { data: stepsData } = await supabase
      .from('tour_steps')
      .select('*')
      .eq('tour_id', tourId)
      .order('order', { ascending: true })

    setSteps((stepsData as Step[]) || [])
  }

  useEffect(() => {
    loadSteps()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMoveStep = async (stepId: string, direction: 'up' | 'down') => {
    const index = steps.findIndex((s) => s.id === stepId)
    if (index === -1) return

    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= steps.length) return

    const current = steps[index]
    const target = steps[targetIndex]

    // Swap order in DB
    await supabase.from('tour_steps').upsert([
      { id: current.id, order: target.order },
      { id: target.id, order: current.order },
    ])

    // Then reload
    await loadSteps()
  }

  return (
    <div className="px-4 sm:px-8 lg:px-12 py-8 lg:py-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">
            Editing tour: <span className="text-indigo-600 wrap-break-word">{tourTitle}</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Each tour should have at least {MIN_STEPS} steps.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="self-start sm:self-auto bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 text-sm font-semibold"
        >
          + Add Step
        </button>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isFirst = index === 0
          const isLast = index === steps.length - 1
          const canDelete = steps.length > MIN_STEPS

          return (
            <div
              key={step.id}
              className="bg-white border rounded-xl px-5 py-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex-1">
                <h2 className="text-base sm:text-lg font-semibold">
                  Step {index + 1}: {step.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">{step.description}</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Up / Down buttons */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleMoveStep(step.id, 'up')}
                    disabled={isFirst}
                    className={`w-8 h-8 rounded-md border flex items-center justify-center text-xs ${
                      isFirst ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMoveStep(step.id, 'down')}
                    disabled={isLast}
                    className={`w-8 h-8 rounded-md border flex items-center justify-center text-xs ${
                      isLast ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'
                    }`}
                  >
                    ↓
                  </button>
                </div>

                {/* Edit / Delete */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <button
                    onClick={() => setEditStep(step)}
                    className="text-indigo-600 text-sm font-medium hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      if (canDelete) setDeleteStep(step)
                    }}
                    disabled={!canDelete}
                    className={`text-sm font-medium ${
                      canDelete
                        ? 'text-red-500 hover:underline'
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Delete
                  </button>

                  {!canDelete && (
                    <p className="text-[10px] text-gray-400">Minimum {MIN_STEPS} steps required.</p>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {steps.length === 0 && (
          <p className="text-gray-500 text-sm italic mt-6">
            No steps yet. Start by adding your first step.
          </p>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddStepModal
          tourId={tourId}
          close={() => setShowAddModal(false)}
          refresh={loadSteps}
          currentCount={steps.length}
        />
      )}

      {editStep && (
        <EditStepModal step={editStep} close={() => setEditStep(null)} refresh={loadSteps} />
      )}

      {deleteStep && (
        <DeleteStepModal step={deleteStep} close={() => setDeleteStep(null)} refresh={loadSteps} />
      )}
    </div>
  )
}
