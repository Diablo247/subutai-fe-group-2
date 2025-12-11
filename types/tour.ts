export type AnalyticsEventType =
  | "tour_started"
  | "step_viewed"
  | "step_completed"
  | "tour_completed"
  | "tour_skipped";

export interface TourRow {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  created_at: string;
}

export interface AnalyticsEventRow {
  id: string;
  tour_id: string;
  event_type: AnalyticsEventType;
  step_id: string | null;
  session_id: string;
  timestamp: string;
}
