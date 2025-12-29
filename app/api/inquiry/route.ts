import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { insertLead } from "@/app/utils/supabase";

// Initialize Resend only when API key is available
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

// Label mappings for readable emails
const businessTypeLabels: Record<string, string> = {
  restaurant: "Restaurant / Food Service",
  medical: "Medical / Dental",
  professional: "Professional Services",
  retail: "Retail Store",
  services: "Personal Services",
  other: "Other / Not Sure",
};

const spaceLabels: Record<string, string> = {
  small: "Under 2,000 SF",
  medium: "2,000 - 5,000 SF",
  large: "5,000 - 10,000 SF",
  xlarge: "10,000+ SF",
  unsure: "Not sure yet",
};

const timelineLabels: Record<string, string> = {
  immediately: "As soon as possible",
  three_months: "Within 3 months",
  six_months: "Within 6 months",
  exploring: "Just exploring options",
};

const budgetLabels: Record<string, string> = {
  premium: "$10,000+ / month",
  high: "$6,000 - $10,000 / month",
  medium: "$4,000 - $6,000 / month",
  low: "Under $4,000 / month",
  unsure: "Not sure / Flexible",
};

function formatScheduledDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getPriorityColor(priority: string): string {
  switch (priority) {
    case "high":
      return "#059669"; // green
    case "medium":
      return "#D97706"; // amber
    default:
      return "#6B7280"; // gray
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      propertySlug,
      propertyName,
      businessType,
      spaceNeeded,
      timeline,
      budget,
      name,
      phone,
      email,
      businessName,
      message,
      scheduledDate,
      scheduledTime,
      leadScore,
      leadPriority,
    } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      );
    }

    // Store in Supabase (if configured)
    const { error: dbError } = await insertLead({
      property_slug: propertySlug,
      property_name: propertyName || propertySlug,
      business_type: businessType,
      space_needed: spaceNeeded,
      timeline: timeline,
      budget: budget,
      name: name,
      phone: phone,
      email: email,
      business_name: businessName,
      message: message,
      scheduled_date: scheduledDate,
      scheduled_time: scheduledTime,
      lead_score: leadScore,
      lead_priority: leadPriority,
      status: "new",
    });

    if (dbError) {
      console.error("Supabase error:", dbError);
      // Continue anyway - we still want to send the email
    }

    // Format the email
    const priorityBadge = leadPriority
      ? `<span style="display:inline-block;background:${getPriorityColor(leadPriority)};color:white;padding:4px 12px;border-radius:9999px;font-size:12px;font-weight:bold;text-transform:uppercase;">${leadPriority} Priority${leadScore ? ` (${leadScore})` : ""}</span>`
      : "";

    const scheduledInfo =
      scheduledDate && scheduledTime
        ? `
      <div style="background:#F0FDF4;border:1px solid #BBF7D0;padding:16px;border-radius:8px;margin:16px 0;">
        <h3 style="margin:0 0 8px 0;color:#166534;">📅 Tour Scheduled</h3>
        <p style="margin:0;color:#166534;"><strong>Date:</strong> ${formatScheduledDate(scheduledDate)}</p>
        <p style="margin:0;color:#166534;"><strong>Time:</strong> ${scheduledTime}</p>
      </div>
    `
        : "";

    const emailHtml = `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#0D9488;color:white;padding:24px;border-radius:8px 8px 0 0;">
          <h1 style="margin:0;font-size:24px;">New Leasing Inquiry</h1>
          <p style="margin:8px 0 0 0;opacity:0.9;">${propertyName || propertySlug}</p>
        </div>
        
        <div style="padding:24px;background:#ffffff;border:1px solid #E5E7EB;border-top:none;border-radius:0 0 8px 8px;">
          ${priorityBadge ? `<div style="margin-bottom:16px;">${priorityBadge}</div>` : ""}
          
          ${scheduledInfo}
          
          <h2 style="margin:0 0 16px 0;font-size:18px;color:#1F2937;">Contact Information</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;color:#6B7280;width:140px;">Name</td>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;color:#1F2937;font-weight:500;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;color:#6B7280;">Phone</td>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;"><a href="tel:${phone}" style="color:#0D9488;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;color:#6B7280;">Email</td>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;"><a href="mailto:${email}" style="color:#0D9488;">${email}</a></td>
            </tr>
            ${
              businessName
                ? `<tr>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;color:#6B7280;">Business</td>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;color:#1F2937;">${businessName}</td>
            </tr>`
                : ""
            }
          </table>
          
          <h2 style="margin:24px 0 16px 0;font-size:18px;color:#1F2937;">Space Requirements</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;color:#6B7280;width:140px;">Business Type</td>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;color:#1F2937;">${businessTypeLabels[businessType] || businessType}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;color:#6B7280;">Space Needed</td>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;color:#1F2937;">${spaceLabels[spaceNeeded] || spaceNeeded}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;color:#6B7280;">Timeline</td>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;color:#1F2937;">${timelineLabels[timeline] || timeline}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;color:#6B7280;">Budget</td>
              <td style="padding:8px 0;border-bottom:1px solid #E5E7EB;color:#1F2937;">${budgetLabels[budget] || budget}</td>
            </tr>
          </table>
          
          ${
            message
              ? `
            <h2 style="margin:24px 0 16px 0;font-size:18px;color:#1F2937;">Additional Notes</h2>
            <div style="background:#F9FAFB;padding:16px;border-radius:8px;color:#374151;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          `
              : ""
          }
          
          <div style="margin-top:24px;padding-top:24px;border-top:1px solid #E5E7EB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;">
              This inquiry was submitted via ${propertyName || propertySlug} on Newman Properties LLC.
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email via Resend
    const resend = getResend();
    if (resend) {
      // Send notification to property owner
      const { error: emailError } = await resend.emails.send({
        from: "Newman Properties <stephen@krezzo.com>",
        to: ["stephen@krezzo.com"],
        subject: `${leadPriority === "high" ? "🔥 HIGH PRIORITY: " : ""}New Inquiry from ${propertyName || propertySlug}: ${name}`,
        html: emailHtml,
      });

      if (emailError) {
        console.error("Resend error:", JSON.stringify(emailError, null, 2));
        return NextResponse.json(
          { error: emailError.message || "Failed to send email" },
          { status: 400 }
        );
      }

      // Send confirmation to user
      const userEmailHtml = `
        <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0D9488;color:white;padding:24px;border-radius:8px 8px 0 0;">
            <h1 style="margin:0;font-size:24px;">${scheduledDate && scheduledTime ? "Your Tour is Scheduled!" : "We Received Your Inquiry"}</h1>
            <p style="margin:8px 0 0 0;opacity:0.9;">${propertyName || propertySlug}</p>
          </div>
          
          <div style="padding:24px;background:#ffffff;border:1px solid #E5E7EB;border-top:none;border-radius:0 0 8px 8px;">
            <p style="margin:0 0 16px 0;color:#1F2937;font-size:16px;">Hi ${name},</p>
            
            <p style="margin:0 0 16px 0;color:#374151;">
              ${scheduledDate && scheduledTime 
                ? `Thank you for scheduling a tour at ${propertyName || propertySlug}. We're excited to show you around!`
                : `Thank you for your interest in ${propertyName || propertySlug}. We'll be in touch within 24 hours to discuss your space needs.`
              }
            </p>
            
            ${scheduledDate && scheduledTime ? `
              <div style="background:#F0FDF4;border:1px solid #BBF7D0;padding:16px;border-radius:8px;margin:16px 0;">
                <h3 style="margin:0 0 8px 0;color:#166534;">📅 Tour Details</h3>
                <p style="margin:0;color:#166534;"><strong>Date:</strong> ${formatScheduledDate(scheduledDate)}</p>
                <p style="margin:0;color:#166534;"><strong>Time:</strong> ${scheduledTime}</p>
                <p style="margin:8px 0 0 0;color:#166534;"><strong>Location:</strong> ${propertyName || propertySlug}</p>
              </div>
            ` : ""}
            
            <h3 style="margin:24px 0 12px 0;color:#1F2937;font-size:16px;">What happens next?</h3>
            <ol style="margin:0;padding-left:20px;color:#374151;">
              <li style="margin-bottom:8px;">We'll ${scheduledDate && scheduledTime ? "call or email to confirm your tour" : "reach out within 24 hours"}</li>
              <li style="margin-bottom:8px;">Walk through available spaces and discuss your needs</li>
              <li style="margin-bottom:8px;">Receive tailored recommendations and pricing</li>
            </ol>
            
            <p style="margin:24px 0 0 0;color:#374151;">
              Have questions before your visit? Reply to this email or call us directly.
            </p>
            
            <p style="margin:24px 0 0 0;color:#374151;">
              Best regards,<br/>
              <strong>Newman Properties LLC</strong>
            </p>
            
            <div style="margin-top:24px;padding-top:24px;border-top:1px solid #E5E7EB;">
              <p style="margin:0;font-size:12px;color:#9CA3AF;">
                This is an automated confirmation from Newman Properties LLC.
              </p>
            </div>
          </div>
        </div>
      `;

      // Send confirmation email to user
      await resend.emails.send({
        from: "Newman Properties <stephen@krezzo.com>",
        to: [email],
        subject: `${scheduledDate && scheduledTime ? "Your Tour is Confirmed" : "We Received Your Inquiry"} - ${propertyName || propertySlug}`,
        html: userEmailHtml,
      });
    } else {
      console.log("Resend not configured, skipping email notification");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inquiry form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

