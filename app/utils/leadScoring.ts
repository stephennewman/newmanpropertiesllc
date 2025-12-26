export type LeadPriority = "low" | "medium" | "high";

export interface LeadScore {
  score: number;
  priority: LeadPriority;
  availabilityWindow: "this_week" | "next_week" | "two_weeks";
  estimatedValue: string;
}

interface FormData {
  businessType: string;
  spaceNeeded: string;
  timeline: string;
  budget: string;
}

// Business type scores (0-25 pts)
const businessScores: Record<string, number> = {
  restaurant: 25,
  medical: 25,
  professional: 20,
  retail: 15,
  services: 10,
  other: 10,
};

// Space needed scores (0-35 pts) - THE BIG ONE
const spaceScores: Record<string, number> = {
  xlarge: 35, // 10,000+ SF
  large: 25, // 5,000-10,000 SF
  medium: 15, // 2,000-5,000 SF
  small: 5, // Under 2,000 SF
  unsure: 15, // Neutral
};

// Timeline scores (0-25 pts) - Urgency = Priority
const timelineScores: Record<string, number> = {
  immediately: 25,
  three_months: 15,
  six_months: 8,
  exploring: 2,
};

// Budget scores (0-15 pts)
const budgetScores: Record<string, number> = {
  premium: 15, // $10k+/mo
  high: 10, // $6k-10k/mo
  medium: 5, // $4k-6k/mo
  low: 0, // Under $4k
  unsure: 5,
};

export function calculateLeadScore(formData: FormData): LeadScore {
  let score = 0;

  // Calculate score from each category
  score += businessScores[formData.businessType] || 10;
  score += spaceScores[formData.spaceNeeded] || 15;
  score += timelineScores[formData.timeline] || 5;
  score += budgetScores[formData.budget] || 5;

  // Determine priority and availability window
  let priority: LeadPriority;
  let availabilityWindow: "this_week" | "next_week" | "two_weeks";
  let estimatedValue: string;

  if (score >= 70) {
    priority = "high";
    availabilityWindow = "this_week";
    estimatedValue = "High Value";
  } else if (score >= 45) {
    priority = "medium";
    availabilityWindow = "next_week";
    estimatedValue = "Standard";
  } else {
    priority = "low";
    availabilityWindow = "two_weeks";
    estimatedValue = "Exploring";
  }

  return { score, priority, availabilityWindow, estimatedValue };
}

// US Federal Holidays for 2025-2026
const HOLIDAYS: string[] = [
  // 2025
  "2025-01-01",
  "2025-01-20",
  "2025-02-17",
  "2025-05-26",
  "2025-07-04",
  "2025-09-01",
  "2025-11-27",
  "2025-11-28",
  "2025-12-24",
  "2025-12-25",
  "2025-12-31",
  // 2026
  "2026-01-01",
  "2026-01-19",
  "2026-02-16",
  "2026-05-25",
  "2026-07-03",
  "2026-09-07",
  "2026-11-26",
  "2026-11-27",
  "2026-12-24",
  "2026-12-25",
  "2026-12-31",
];

function isHoliday(date: Date): boolean {
  const dateStr = date.toISOString().split("T")[0];
  return HOLIDAYS.includes(dateStr);
}

function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5; // Monday (1) through Friday (5)
}

// Generate available time slots based on priority
export function getAvailableSlots(
  availabilityWindow: "this_week" | "next_week" | "two_weeks"
): Date[] {
  const slots: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let startDay: number;
  let maxSlots: number;

  switch (availabilityWindow) {
    case "this_week":
      startDay = 1; // Tomorrow
      maxSlots = 5; // Show 5 available weekdays
      break;
    case "next_week":
      startDay = 5; // 5 days out
      maxSlots = 8; // Show 8 available weekdays
      break;
    case "two_weeks":
      startDay = 14; // 2 weeks out
      maxSlots = 10; // Show 10 available weekdays
      break;
  }

  let daysChecked = 0;
  let i = startDay;

  // Keep adding days until we have enough slots (max 60 days lookahead)
  while (slots.length < maxSlots && daysChecked < 60) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Only add weekdays (Mon-Fri) that aren't holidays
    if (isWeekday(date) && !isHoliday(date)) {
      slots.push(date);
    }

    i++;
    daysChecked++;
  }

  return slots;
}

// Format date for display
export function formatSlotDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Get time slots for a given day
export function getTimeSlots(): string[] {
  return [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "1:00 PM - 3:00 PM",
    "3:00 PM - 5:00 PM",
  ];
}

