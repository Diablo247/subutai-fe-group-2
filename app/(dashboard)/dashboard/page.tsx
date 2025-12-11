'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { TourRow, AnalyticsEventRow } from '@/types/tour'

interface DashboardStats {
  totalTours: number
  totalViews: number
  completionRate: number
  activeUsers: number
  topTours: {
    id: string
    title: string
    views: number
    completion: number
  }[]
}

const EMPTY_STATS: DashboardStats = {
  totalTours: 0,
  totalViews: 0,
  completionRate: 0,
  activeUsers: 0,
  topTours: [],
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1. Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setStats(EMPTY_STATS)
          setLoading(false)
          return
        }

        // 2. Get tours for this user
        const { data: toursData, error: toursError } = await supabase
          .from('tours')
          .select('*')
          .eq('user_id', user.id)

        if (toursError || !toursData) {
          console.error(toursError)
          setStats(EMPTY_STATS)
          setLoading(false)
          return
        }

        const tours: TourRow[] = toursData as TourRow[]
        const tourIds = tours.map((t) => t.id)

        if (tourIds.length === 0) {
          setStats({
            ...EMPTY_STATS,
            totalTours: 0,
          })
          setLoading(false)
          return
        }

        // 3. Get analytics events for these tours
        const { data: eventsData, error: eventsError } = await supabase
          .from('analytics_events')
          .select('*')
          .in('tour_id', tourIds)

        if (eventsError || !eventsData) {
          console.error(eventsError)
          setStats({
            ...EMPTY_STATS,
            totalTours: tours.length,
          })
          setLoading(false)
          return
        }

        const events: AnalyticsEventRow[] = eventsData as AnalyticsEventRow[]

        // ---- Aggregations ----
        const totalViews = events.filter((ev) => ev.event_type === 'step_viewed').length

        const totalStarts = events.filter((ev) => ev.event_type === 'tour_started').length

        const totalCompleted = events.filter((ev) => ev.event_type === 'tour_completed').length

        const activeUsers = new Set(events.map((ev) => ev.session_id)).size

        const completionRate =
          totalStarts === 0 ? 0 : Math.round((totalCompleted / totalStarts) * 100)

        // Top tours
        const topTours = tours.map((tour) => {
          const views = events.filter(
            (ev) => ev.tour_id === tour.id && ev.event_type === 'step_viewed'
          ).length

          const starts = events.filter(
            (ev) => ev.tour_id === tour.id && ev.event_type === 'tour_started'
          ).length

          const completed = events.filter(
            (ev) => ev.tour_id === tour.id && ev.event_type === 'tour_completed'
          ).length

          const completion = starts === 0 ? 0 : Math.round((completed / starts) * 100)

          return {
            id: tour.id,
            title: tour.title ?? 'Untitled tour',
            views,
            completion,
          }
        })

        const sortedTopTours = [...topTours].sort((a, b) => b.views - a.views).slice(0, 3)

        setStats({
          totalTours: tours.length,
          totalViews,
          completionRate,
          activeUsers,
          topTours: sortedTopTours,
        })
      } catch (error) {
        console.error(error)
        setStats(EMPTY_STATS)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading || !stats) {
    return <div className="p-10 text-gray-500">Loading dashboard…</div>
  }
  return (
    <div className="px-4 sm:px-8 lg:px-12 py-8 lg:py-10 pt-8 w-full">
      {/* Header */}
      <h1 className="text-3xl lg:text-4xl font-bold mb-6">
        Welcome 👋
      </h1>

      {/* Stats Card */}
      <div
        className="
      bg-white rounded-2xl shadow-sm p-6 lg:p-8
      flex flex-col lg:flex-row 
      items-stretch gap-6 lg:gap-0 
      lg:max-w-4xl w-full mb-10
    "
      >
        {/* Total Tours */}
        <div
          className="
        flex flex-col items-center justify-center 
        lg:border-r lg:pr-10 
      "
        >
          <p className="uppercase text-xs tracking-wide text-gray-400 mb-3">total tours</p>

          <div className="relative w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-200" />
            <span className="text-2xl lg:text-3xl font-semibold text-indigo-600">
              {stats.totalTours}
            </span>
          </div>
        </div>

        {/* Stats grid (wraps on mobile) */}
        <div
          className="
        flex flex-wrap lg:flex-nowrap 
        flex-1 gap-4 lg:gap-4 
        lg:pl-10
      "
        >
          <StatCard label="Completion rates" value={`${stats.completionRate}%`} />
          <StatCard label="Total views" value={stats.totalViews} />
          <StatCard label="Active users" value={stats.activeUsers} />
        </div>
      </div>

      {/* Top Tours */}
      <div className="w-full">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg lg:text-xl">🏆</span>
          <h2 className="text-base lg:text-lg font-semibold text-indigo-700">
            Top Performing Tours
          </h2>
        </div>

        <div className="space-y-4 w-full max-w-xl">
          {stats.topTours.length === 0 && (
            <p className="text-gray-500 text-sm">
              No analytics yet. Embed a tour and let users interact with it.
            </p>
          )}

          {stats.topTours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-xl shadow-sm px-5 py-4 border">
              <h3 className="text-lg font-semibold text-gray-900">{tour.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {tour.views} views ({tour.completion}% completion)
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex-1 border rounded-2xl px-5 py-4 flex flex-col justify-center">
      <span className="text-2xl font-semibold text-indigo-600">{value}</span>
      <span className="text-xs text-gray-500 mt-1">{label}</span>
    </div>
  )
}
