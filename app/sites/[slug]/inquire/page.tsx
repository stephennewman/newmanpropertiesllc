"use client";

import { useState, useMemo, useRef, useEffect, use } from "react";
import { CheckCircle, ArrowLeft, X, Calendar, Clock, Zap } from "lucide-react";
import Link from "next/link";
import {
  calculateLeadScore,
  formatSlotDate,
  getAvailableSlots,
  getTimeSlots,
} from "@/app/utils/leadScoring";
import { getPropertyBySlug } from "@/data/properties";

const businessTypes = [
  { id: "restaurant", label: "Restaurant / Food Service", description: "Dine-in, fast casual, café, or food-related business" },
  { id: "medical", label: "Medical / Dental", description: "Healthcare provider, clinic, or wellness center" },
  { id: "professional", label: "Professional Services", description: "Office, consulting, finance, or legal services" },
  { id: "retail", label: "Retail Store", description: "Products, merchandise, or consumer goods" },
  { id: "services", label: "Personal Services", description: "Salon, fitness, tutoring, or service-based business" },
  { id: "other", label: "Other / Not Sure", description: "Tell us more about your business" },
];

const spaceOptions = [
  { id: "small", label: "Under 2,000 SF", description: "Small shop or office" },
  { id: "medium", label: "2,000 - 5,000 SF", description: "Standard retail or office" },
  { id: "large", label: "5,000 - 10,000 SF", description: "Large format retail" },
  { id: "xlarge", label: "10,000+ SF", description: "Anchor or major tenant" },
  { id: "unsure", label: "Not sure yet", description: "We'll help you figure it out" },
];

const timelines = [
  { id: "immediately", label: "As soon as possible" },
  { id: "three_months", label: "Within 3 months" },
  { id: "six_months", label: "Within 6 months" },
  { id: "exploring", label: "Just exploring options" },
];

const budgetOptions = [
  { id: "premium", label: "$10,000+ / month" },
  { id: "high", label: "$6,000 - $10,000 / month" },
  { id: "medium", label: "$4,000 - $6,000 / month" },
  { id: "low", label: "Under $4,000 / month" },
  { id: "unsure", label: "Not sure / Flexible" },
];

export default function InquirePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const property = getPropertyBySlug(slug);
  const accentColor = property?.accentColor || "#0D9488";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: "",
    spaceNeeded: "",
    timeline: "",
    budget: "",
    name: "",
    phone: "",
    email: "",
    businessName: "",
    message: "",
    scheduledDate: "",
    scheduledTime: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  const updateFormAndAdvance = (field: string, value: string, nextStep: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTimeout(() => setStep(nextStep), 150);
  };

  const leadScore = useMemo(() => {
    if (formData.businessType && formData.spaceNeeded && formData.timeline && formData.budget) {
      return calculateLeadScore({
        businessType: formData.businessType,
        spaceNeeded: formData.spaceNeeded,
        timeline: formData.timeline,
        budget: formData.budget,
      });
    }
    return null;
  }, [formData.businessType, formData.spaceNeeded, formData.timeline, formData.budget]);

  const availableDates = useMemo(() => {
    if (leadScore) {
      return getAvailableSlots(leadScore.availabilityWindow);
    }
    return getAvailableSlots("next_week");
  }, [leadScore]);

  const timeSlots = getTimeSlots();

  const handleConfirmAppointment = () => {
    if (selectedDate && selectedTime) {
      setFormData((prev) => ({
        ...prev,
        scheduledDate: selectedDate.toISOString(),
        scheduledTime: selectedTime,
      }));
      setStep(6);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertySlug: slug,
          propertyName: property?.name,
          businessType: formData.businessType,
          spaceNeeded: formData.spaceNeeded,
          timeline: formData.timeline,
          budget: formData.budget,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          businessName: formData.businessName,
          message: formData.message,
          scheduledDate: formData.scheduledDate,
          scheduledTime: formData.scheduledTime,
          leadScore: leadScore?.score,
          leadPriority: leadScore?.priority,
        }),
      });

      if (!response.ok) throw new Error("Failed to send request");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsLoading(false);
    }
  };

  const canSubmit = () => formData.name !== "" && formData.phone !== "" && formData.email !== "";
  const totalSteps = 6;

  // Property not found
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Property Not Found</h1>
          <p className="text-[var(--foreground-muted)]">The requested property does not exist.</p>
        </div>
      </div>
    );
  }

  // Success screen
  if (submitted) {
    const hasScheduled = formData.scheduledDate && formData.scheduledTime;
    const scheduledDateObj = hasScheduled ? new Date(formData.scheduledDate) : null;

    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto" style={{ "--accent": accentColor } as React.CSSProperties}>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: accentColor }}>
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2 text-center">
            {hasScheduled ? "Tour Scheduled!" : "Request Received!"}
          </h1>
          <p className="text-[var(--foreground-muted)] text-center max-w-md mb-8">
            {hasScheduled
              ? `We'll see you on ${scheduledDateObj ? formatSlotDate(scheduledDateObj) : ""} between ${formData.scheduledTime}.`
              : "We'll contact you within 24 hours to discuss your space needs."}
          </p>
          <div className="bg-[var(--background)] rounded-2xl p-6 max-w-md w-full mb-8">
            <h2 className="font-bold text-[var(--foreground)] mb-4">What happens next?</h2>
            <ol className="space-y-4">
              {[
                { title: "Confirmation", desc: "We'll call or email to confirm within 24 hours." },
                { title: "Property Tour", desc: "Walk through available spaces and discuss your needs." },
                { title: "Space Options", desc: "Receive tailored recommendations and pricing." },
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ backgroundColor: accentColor }}>{i + 1}</span>
                  <div>
                    <strong className="text-[var(--foreground)]">{item.title}</strong>
                    <p className="text-sm text-[var(--foreground-muted)]">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <Link href="/" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer">
            ← Back to {property?.name}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 bg-white z-50 overflow-auto" style={{ "--accent": accentColor } as React.CSSProperties}>
      <Link href="/" className="fixed top-4 right-4 z-10 p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer" aria-label="Close">
        <X className="w-6 h-6" />
      </Link>
      <div className="fixed top-0 left-0 right-0 h-1 bg-[var(--border)] z-10">
        <div className="h-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%`, backgroundColor: accentColor }} />
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          {step > 1 && (
            <button type="button" onClick={() => { if (step === 6) setStep(5); else if (step === 5) { setStep(4); setSelectedDate(null); setSelectedTime(null); } else setStep(step - 1); }} className="mb-8 inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}

          {/* Step 1: Business Type */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <p className="text-sm font-semibold mb-2" style={{ color: accentColor }}>{property?.name}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">What type of business?</h1>
              <p className="text-[var(--foreground-muted)] mb-8">Select one to continue</p>
              <div className="space-y-3">
                {businessTypes.map((type) => (
                  <button key={type.id} type="button" onClick={() => updateFormAndAdvance("businessType", type.id, 2)} className={`w-full text-left p-5 border-2 rounded-2xl transition-all hover:border-[var(--foreground)] cursor-pointer ${formData.businessType === type.id ? "border-[var(--foreground)] bg-[var(--background)]" : "border-[var(--border)]"}`}>
                    <span className="block font-semibold text-[var(--foreground)] text-lg">{type.label}</span>
                    <span className="block text-[var(--foreground-muted)] text-sm mt-1">{type.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Space Needed */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">How much space do you need?</h1>
              <p className="text-[var(--foreground-muted)] mb-8">Estimate the square footage</p>
              <div className="space-y-3">
                {spaceOptions.map((option) => (
                  <button key={option.id} type="button" onClick={() => updateFormAndAdvance("spaceNeeded", option.id, 3)} className={`w-full text-left p-5 border-2 rounded-2xl transition-all hover:border-[var(--foreground)] cursor-pointer ${formData.spaceNeeded === option.id ? "border-[var(--foreground)] bg-[var(--background)]" : "border-[var(--border)]"}`}>
                    <span className="block font-semibold text-[var(--foreground)] text-lg">{option.label}</span>
                    <span className="block text-[var(--foreground-muted)] text-sm mt-1">{option.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Timeline */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">When are you looking to move in?</h1>
              <p className="text-[var(--foreground-muted)] mb-8">Select your timeline</p>
              <div className="space-y-3">
                {timelines.map((option) => (
                  <button key={option.id} type="button" onClick={() => updateFormAndAdvance("timeline", option.id, 4)} className={`w-full text-left p-5 border-2 rounded-2xl transition-all hover:border-[var(--foreground)] cursor-pointer ${formData.timeline === option.id ? "border-[var(--foreground)] bg-[var(--background)]" : "border-[var(--border)]"}`}>
                    <span className="block font-semibold text-[var(--foreground)] text-lg">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {step === 4 && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">What&apos;s your monthly budget?</h1>
              <p className="text-[var(--foreground-muted)] mb-8">This helps us find the right space for you</p>
              <div className="space-y-3">
                {budgetOptions.map((option) => (
                  <button key={option.id} type="button" onClick={() => updateFormAndAdvance("budget", option.id, 5)} className={`w-full text-left p-5 border-2 rounded-2xl transition-all hover:border-[var(--foreground)] cursor-pointer ${formData.budget === option.id ? "border-[var(--foreground)] bg-[var(--background)]" : "border-[var(--border)]"}`}>
                    <span className="block font-semibold text-[var(--foreground)] text-lg">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Scheduling */}
          {step === 5 && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">Schedule your tour</h1>
              <p className="text-[var(--foreground-muted)] mb-2">Pick a date and time to visit {property?.name}</p>
              {leadScore && leadScore.priority === "high" && (
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium text-white" style={{ backgroundColor: accentColor }}>
                    <Zap className="w-4 h-4" /> Priority Scheduling Available
                  </div>
                </div>
              )}
              <div className="mb-6">
                <div className="grid grid-cols-4 gap-2">
                  {availableDates.slice(0, 8).map((date, index) => {
                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                    return (
                      <button key={index} type="button" onClick={() => { setSelectedDate(date); setSelectedTime(null); }} className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${isSelected ? "border-[var(--foreground)] bg-[var(--background)]" : "border-[var(--border)] hover:border-[var(--foreground-muted)]"}`}>
                        <span className="block text-xs text-[var(--foreground-muted)]">{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
                        <span className="block font-semibold text-[var(--foreground)]">{date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              {selectedDate && (
                <div className="mb-8 animate-fadeIn">
                  <p className="text-sm text-[var(--foreground-muted)] mb-3">Select a time window</p>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <button key={slot} type="button" onClick={() => setSelectedTime(slot)} className={`p-4 rounded-xl border-2 text-center transition-all cursor-pointer ${isSelected ? "border-[var(--foreground)] bg-[var(--background)]" : "border-[var(--border)] hover:border-[var(--foreground-muted)]"}`}>
                          <Clock className="w-4 h-4 mx-auto mb-1 text-[var(--foreground-muted)]" />
                          <span className="block text-sm font-medium text-[var(--foreground)]">{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {selectedDate && selectedTime && (
                <div className="mb-6 p-4 bg-[var(--background)] rounded-xl animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[var(--foreground-muted)]" />
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{formatSlotDate(selectedDate)}</p>
                      <p className="text-sm text-[var(--foreground-muted)]">{selectedTime}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <button type="button" onClick={handleConfirmAppointment} disabled={!selectedDate || !selectedTime} className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${selectedDate && selectedTime ? "text-white hover:opacity-90 cursor-pointer" : "bg-[var(--border)] text-[var(--foreground-muted)] cursor-not-allowed"}`} style={selectedDate && selectedTime ? { backgroundColor: accentColor } : {}}>
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Contact Info */}
          {step === 6 && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-2">Your contact info</h1>
              <p className="text-[var(--foreground-muted)] mb-6">We&apos;ll use this to confirm your tour</p>
              {formData.scheduledDate && formData.scheduledTime && (
                <div className="mb-6 p-4 bg-[var(--background)] rounded-xl">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[var(--foreground-muted)]" />
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{formatSlotDate(new Date(formData.scheduledDate))}</p>
                      <p className="text-sm text-[var(--foreground-muted)]">{formData.scheduledTime}</p>
                    </div>
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-3 border-2 border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--foreground)] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Phone *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} placeholder="(555) 123-4567" className="w-full px-4 py-3 border-2 border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--foreground)] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Email *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} placeholder="you@company.com" className="w-full px-4 py-3 border-2 border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--foreground)] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Business Name <span className="text-[var(--foreground-muted)] font-normal">(optional)</span></label>
                  <input type="text" value={formData.businessName} onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))} className="w-full px-4 py-3 border-2 border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--foreground)] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Additional Notes <span className="text-[var(--foreground-muted)] font-normal">(optional)</span></label>
                  <textarea rows={3} value={formData.message} onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))} placeholder="Tell us more about your business or specific requirements..." className="w-full px-4 py-3 border-2 border-[var(--border)] rounded-xl focus:outline-none focus:border-[var(--foreground)] transition-colors resize-none" />
                </div>
                {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-xl">{error}</p>}
                <div className="flex justify-center pt-4">
                  <button type="submit" disabled={isLoading || !canSubmit()} className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${!isLoading && canSubmit() ? "text-white hover:opacity-90 cursor-pointer" : "bg-[var(--border)] text-[var(--foreground-muted)] cursor-not-allowed"}`} style={!isLoading && canSubmit() ? { backgroundColor: accentColor } : {}}>
                    {isLoading ? "Submitting..." : "Schedule My Tour"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

