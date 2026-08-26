
export type AnalyticsEvent =
  | "button_click"
  | "video_course"
  | "signup"
  | "login"
  | "purchase"
  | "logout";

export function TrackEvent(
  eventName: AnalyticsEvent,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;
  if(!params) return

  window.gtag("event", eventName, {
    ...params,
    debug_mode: true,
  });
}

export function SetAnalyticsUser(userId: string) {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("config", process.env.NEXT_PUBLIC_GA_ID!, {
    user_id: userId,
    debug_mode: true
  });
  
}