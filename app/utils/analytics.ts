// Client-side Google Analytics event tracking

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

// Specific event trackers for Newman Properties
export const analytics = {
  // CTA clicks
  tourClick: (propertySlug: string) => {
    trackEvent("tour_click", { property: propertySlug });
  },
  
  phoneClick: (propertySlug: string) => {
    trackEvent("phone_click", { property: propertySlug });
  },

  // Inquiry form funnel
  formOpen: (propertySlug: string) => {
    trackEvent("inquiry_form_open", { property: propertySlug });
  },

  formStart: (propertySlug: string, step: number) => {
    trackEvent("inquiry_form_start", { property: propertySlug, step });
  },

  formStepComplete: (propertySlug: string, step: number) => {
    trackEvent("inquiry_form_step", { property: propertySlug, step });
  },

  formSubmit: (propertySlug: string, leadScore: number, leadPriority: string) => {
    trackEvent("inquiry_form_submit", { 
      property: propertySlug,
      lead_score: leadScore,
      lead_priority: leadPriority,
    });
  },
};


