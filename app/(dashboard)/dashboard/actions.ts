'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getDashboardStats() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      totalTours: 0,
      totalViews: 0,
      completionRate: 0,
      activeUsers: 0,
      topTours: [],
    }
  }

  // 1. Fetch tours belonging to this user
  const { data: tours, error: toursError } = await supabase
    .from('tours')
    .select('*')
    .eq('user_id', user.id)

  if (toursError || !tours) return null

  const tourIds = tours.map((t) => t.id)

  if (tourIds.length === 0) {
    return {
      totalTours: 0,
      totalViews: 0,
      completionRate: 0,
      activeUsers: 0,
      topTours: [],
    }
  }

  // 2. Fetch analytics for all tours
  const { data: events, error: eventsError } = await supabase
    .from('analytics_events')
    .select('*')
    .in('tour_id', tourIds)

  const safeEvents = events ?? [] // prevent undefined

  // --- METRICS ---------------------------------------

  const totalViews = safeEvents.filter((e) => e.event_type === 'step_viewed').length

  const starts = safeEvents.filter((e) => e.event_type === 'tour_started').length

  const completed = safeEvents.filter((e) => e.event_type === 'tour_completed').length

  const activeUsers = new Set(safeEvents.map((e) => e.session_id)).size

  const completionRate = starts === 0 ? 0 : Math.round((completed / starts) * 100)

  // --- TOP TOUR STATS --------------------------------

  const topTours = tours.map((tour) => {
    const views = safeEvents.filter(
      (e) => e.tour_id === tour.id && e.event_type === 'step_viewed'
    ).length

    const tourStarts = safeEvents.filter(
      (e) => e.tour_id === tour.id && e.event_type === 'tour_started'
    ).length

    const tourCompleted = safeEvents.filter(
      (e) => e.tour_id === tour.id && e.event_type === 'tour_completed'
    ).length

    const tourCompletion = tourStarts === 0 ? 0 : Math.round((tourCompleted / tourStarts) * 100)

    return {
      id: tour.id,
      title: tour.title ?? 'Untitled Tour',
      views,
      completion: tourCompletion,
    }
  })

  // Sort safely
  const sortedTopTours = [...topTours].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 3)

  return {
    totalTours: tours.length,
    totalViews,
    completionRate,
    activeUsers,
    topTours: sortedTopTours,
  }
}
