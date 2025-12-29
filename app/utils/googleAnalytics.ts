import { BetaAnalyticsDataClient } from "@google-analytics/data";

// Initialize the client with service account credentials
function getAnalyticsClient() {
  let privateKey = process.env.GA_PRIVATE_KEY || "";
  
  // Handle various newline formats from env vars
  privateKey = privateKey.replace(/\\n/g, "\n");
  
  // If the key doesn't have proper line breaks, try to fix it
  if (!privateKey.includes("\n") && privateKey.includes("-----BEGIN")) {
    privateKey = privateKey
      .replace(/-----BEGIN PRIVATE KEY-----/, "-----BEGIN PRIVATE KEY-----\n")
      .replace(/-----END PRIVATE KEY-----/, "\n-----END PRIVATE KEY-----")
      .replace(/(.{64})/g, "$1\n");
  }

  const credentials = {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: privateKey,
  };

  return new BetaAnalyticsDataClient({ credentials });
}

// Newman Properties GA4 Property ID - set in env vars
const PROPERTY_ID = process.env.GA_PROPERTY_ID || "";

// Property subdomains
const PROPERTIES = [
  { slug: "palmharborplaza", name: "Palm Harbor Plaza", emoji: "🌴" },
  { slug: "corallandings", name: "Coral Landings", emoji: "🪸" },
  { slug: "highlandlakes", name: "Highland Lakes", emoji: "🏔️" },
  { slug: "aldermanplaza", name: "Alderman Plaza", emoji: "💪" },
  { slug: "palmharborshops", name: "Palm Harbor Shops", emoji: "🛍️" },
];

export interface TrendData {
  current: number;
  previous: number;
  change: number;
  direction: "up" | "down" | "flat";
}

export interface PropertyMetrics {
  slug: string;
  name: string;
  emoji: string;
  users: number;
  pageViews: number;
  tourClicks: number;
  formSubmits: number;
}

export interface AnalyticsData {
  period: string;
  totalUsers: number;
  newUsers: number;
  sessions: number;
  pageViews: number;
  avgSessionDuration: string;
  avgSessionDurationSeconds: number;
  bounceRate: string;
  bounceRateValue: number;
  topPages: { page: string; views: number }[];
  topSources: { source: string; users: number }[];
  topCities: { city: string; users: number }[];
  // CTA Events
  tourClicks: number;
  phoneClicks: number;
  // Inquiry Form Funnel Events
  formOpens: number;
  formStarts: number;
  formSubmits: number;
  // Per-property breakdown
  propertyBreakdown: PropertyMetrics[];
  // Trends (compared to previous period)
  trends?: {
    totalUsers: TrendData;
    pageViews: TrendData;
    sessions: TrendData;
    tourClicks: TrendData;
    phoneClicks: TrendData;
    formSubmits: TrendData;
  };
}

function calculateTrend(current: number, previous: number): TrendData {
  if (previous === 0) {
    return {
      current,
      previous,
      change: current > 0 ? 100 : 0,
      direction: current > 0 ? "up" : "flat",
    };
  }
  const change = ((current - previous) / previous) * 100;
  return {
    current,
    previous,
    change: Math.abs(change),
    direction: change > 1 ? "up" : change < -1 ? "down" : "flat",
  };
}

async function getEventCount(
  client: BetaAnalyticsDataClient,
  startDate: string,
  endDate: string,
  eventName: string
): Promise<number> {
  try {
    const [response] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          stringFilter: { value: eventName },
        },
      },
    });
    return parseInt(response.rows?.[0]?.metricValues?.[0]?.value || "0");
  } catch {
    return 0;
  }
}

async function getEventCountByProperty(
  client: BetaAnalyticsDataClient,
  startDate: string,
  endDate: string,
  eventName: string
): Promise<Record<string, number>> {
  try {
    const [response] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: "eventName" },
        { name: "customEvent:property" },
      ],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          stringFilter: { value: eventName },
        },
      },
    });
    
    const result: Record<string, number> = {};
    response.rows?.forEach((row) => {
      const propertySlug = row.dimensionValues?.[1]?.value || "unknown";
      const count = parseInt(row.metricValues?.[0]?.value || "0");
      result[propertySlug] = (result[propertySlug] || 0) + count;
    });
    return result;
  } catch {
    return {};
  }
}

async function getMetricsByHostname(
  client: BetaAnalyticsDataClient,
  startDate: string,
  endDate: string
): Promise<Record<string, { users: number; pageViews: number }>> {
  try {
    const [response] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: "hostName" }],
      metrics: [
        { name: "totalUsers" },
        { name: "screenPageViews" },
      ],
    });
    
    const result: Record<string, { users: number; pageViews: number }> = {};
    response.rows?.forEach((row) => {
      const hostname = row.dimensionValues?.[0]?.value || "";
      // Extract subdomain from hostname (e.g., "palmharborplaza" from "palmharborplaza.newmanpropertiesllc.com")
      const subdomain = hostname.split(".")[0];
      if (subdomain && subdomain !== "www" && subdomain !== "newmanpropertiesllc") {
        result[subdomain] = {
          users: parseInt(row.metricValues?.[0]?.value || "0"),
          pageViews: parseInt(row.metricValues?.[1]?.value || "0"),
        };
      }
    });
    return result;
  } catch {
    return {};
  }
}

async function getBasicMetrics(
  client: BetaAnalyticsDataClient,
  startDate: string,
  endDate: string
): Promise<{
  totalUsers: number;
  newUsers: number;
  sessions: number;
  pageViews: number;
  avgDurationSeconds: number;
  bounceRateValue: number;
}> {
  const [metricsResponse] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    metrics: [
      { name: "totalUsers" },
      { name: "newUsers" },
      { name: "sessions" },
      { name: "screenPageViews" },
      { name: "averageSessionDuration" },
      { name: "bounceRate" },
    ],
  });

  const metrics = metricsResponse.rows?.[0]?.metricValues || [];
  return {
    totalUsers: parseInt(metrics[0]?.value || "0"),
    newUsers: parseInt(metrics[1]?.value || "0"),
    sessions: parseInt(metrics[2]?.value || "0"),
    pageViews: parseInt(metrics[3]?.value || "0"),
    avgDurationSeconds: parseFloat(metrics[4]?.value || "0"),
    bounceRateValue: parseFloat(metrics[5]?.value || "0"),
  };
}

export async function getAnalyticsData(
  startDate: string,
  endDate: string,
  periodLabel: string,
  includeTrends: boolean = true
): Promise<AnalyticsData> {
  const client = getAnalyticsClient();

  // Calculate previous period dates for comparison
  const start = new Date(startDate);
  const end = new Date(endDate);
  const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  const prevEnd = new Date(start);
  prevEnd.setDate(prevEnd.getDate() - 1);
  const prevStart = new Date(prevEnd);
  prevStart.setDate(prevStart.getDate() - daysDiff + 1);
  
  const prevStartDate = prevStart.toISOString().split("T")[0];
  const prevEndDate = prevEnd.toISOString().split("T")[0];

  // Fetch current period data
  const [
    currentMetrics, 
    tourClicks, 
    phoneClicks,
    formOpens,
    formStarts,
    formSubmits,
    hostnameMetrics,
    tourClicksByProperty,
    formSubmitsByProperty,
  ] = await Promise.all([
    getBasicMetrics(client, startDate, endDate),
    getEventCount(client, startDate, endDate, "tour_click"),
    getEventCount(client, startDate, endDate, "phone_click"),
    getEventCount(client, startDate, endDate, "inquiry_form_open"),
    getEventCount(client, startDate, endDate, "inquiry_form_start"),
    getEventCount(client, startDate, endDate, "inquiry_form_submit"),
    getMetricsByHostname(client, startDate, endDate),
    getEventCountByProperty(client, startDate, endDate, "tour_click"),
    getEventCountByProperty(client, startDate, endDate, "inquiry_form_submit"),
  ]);

  // Build property breakdown
  const propertyBreakdown: PropertyMetrics[] = PROPERTIES.map((prop) => ({
    slug: prop.slug,
    name: prop.name,
    emoji: prop.emoji,
    users: hostnameMetrics[prop.slug]?.users || 0,
    pageViews: hostnameMetrics[prop.slug]?.pageViews || 0,
    tourClicks: tourClicksByProperty[prop.slug] || 0,
    formSubmits: formSubmitsByProperty[prop.slug] || 0,
  }));

  // Fetch previous period data for trends
  let trends: AnalyticsData["trends"];
  if (includeTrends) {
    const [
      prevMetrics, 
      prevTourClicks, 
      prevPhoneClicks,
      prevFormSubmits
    ] = await Promise.all([
      getBasicMetrics(client, prevStartDate, prevEndDate),
      getEventCount(client, prevStartDate, prevEndDate, "tour_click"),
      getEventCount(client, prevStartDate, prevEndDate, "phone_click"),
      getEventCount(client, prevStartDate, prevEndDate, "inquiry_form_submit"),
    ]);

    trends = {
      totalUsers: calculateTrend(currentMetrics.totalUsers, prevMetrics.totalUsers),
      pageViews: calculateTrend(currentMetrics.pageViews, prevMetrics.pageViews),
      sessions: calculateTrend(currentMetrics.sessions, prevMetrics.sessions),
      tourClicks: calculateTrend(tourClicks, prevTourClicks),
      phoneClicks: calculateTrend(phoneClicks, prevPhoneClicks),
      formSubmits: calculateTrend(formSubmits, prevFormSubmits),
    };
  }

  // Top pages request
  const [pagesResponse] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 5,
  });

  // Top sources request
  const [sourcesResponse] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "sessionSource" }],
    metrics: [{ name: "totalUsers" }],
    orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
    limit: 5,
  });

  // Top cities request
  const [citiesResponse] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "city" }],
    metrics: [{ name: "totalUsers" }],
    orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
    limit: 5,
  });

  // Format duration
  const minutes = Math.floor(currentMetrics.avgDurationSeconds / 60);
  const seconds = Math.round(currentMetrics.avgDurationSeconds % 60);
  const avgSessionDuration = `${minutes}m ${seconds}s`;

  // Format bounce rate
  const bounceRate = `${(currentMetrics.bounceRateValue * 100).toFixed(1)}%`;

  // Parse top pages
  const topPages =
    pagesResponse.rows?.map((row) => ({
      page: row.dimensionValues?.[0]?.value || "Unknown",
      views: parseInt(row.metricValues?.[0]?.value || "0"),
    })) || [];

  // Parse top sources
  const topSources =
    sourcesResponse.rows?.map((row) => ({
      source: row.dimensionValues?.[0]?.value || "Direct",
      users: parseInt(row.metricValues?.[0]?.value || "0"),
    })) || [];

  // Parse top cities
  const topCities =
    citiesResponse.rows
      ?.filter((row) => row.dimensionValues?.[0]?.value !== "(not set)")
      .map((row) => ({
        city: row.dimensionValues?.[0]?.value || "Unknown",
        users: parseInt(row.metricValues?.[0]?.value || "0"),
      })) || [];

  return {
    period: periodLabel,
    totalUsers: currentMetrics.totalUsers,
    newUsers: currentMetrics.newUsers,
    sessions: currentMetrics.sessions,
    pageViews: currentMetrics.pageViews,
    avgSessionDuration,
    avgSessionDurationSeconds: currentMetrics.avgDurationSeconds,
    bounceRate,
    bounceRateValue: currentMetrics.bounceRateValue,
    topPages,
    topSources,
    topCities,
    tourClicks,
    phoneClicks,
    formOpens,
    formStarts,
    formSubmits,
    propertyBreakdown,
    trends,
  };
}

function formatTrend(trend: TrendData | undefined, isInverse: boolean = false): string {
  if (!trend) return "";
  
  const arrow = trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "→";
  const color = trend.direction === "flat" 
    ? "" 
    : (trend.direction === "up" !== isInverse) ? " 🟢" : " 🔴";
  
  if (trend.change === 0 || trend.direction === "flat") {
    return " (→ no change)";
  }
  
  return ` (${arrow}${trend.change.toFixed(0)}%${color})`;
}

export function formatSlackMessage(data: AnalyticsData, type: "daily" | "weekly" | "monthly"): object {
  const emoji = type === "daily" ? "📊" : type === "weekly" ? "📈" : "🎯";
  const title = type === "daily" ? "Daily" : type === "weekly" ? "Weekly" : "Monthly";
  const comparisonText = type === "daily" ? "vs yesterday" : type === "weekly" ? "vs last week" : "vs last month";

  const topSourcesText = data.topSources
    .map((s) => `• ${s.source}: ${s.users} users`)
    .join("\n");

  const topCitiesText = data.topCities
    .slice(0, 3)
    .map((c) => `• ${c.city}: ${c.users}`)
    .join("\n");

  // Calculate conversion rate if we have data
  const conversionRate = data.totalUsers > 0 
    ? ((data.formSubmits / data.totalUsers) * 100).toFixed(1) 
    : "0.0";

  // Format property breakdown
  const propertyBreakdownText = data.propertyBreakdown
    .filter((p) => p.users > 0 || p.tourClicks > 0 || p.formSubmits > 0)
    .map((p) => `${p.emoji} *${p.name}*: ${p.users} visitors, ${p.tourClicks} tour clicks, ${p.formSubmits} inquiries`)
    .join("\n") || "No property-specific data yet";

  // Full property table for all properties (even with zeros)
  const fullPropertyTable = data.propertyBreakdown
    .map((p) => `${p.emoji} ${p.name}: 👥${p.users} | 📅${p.tourClicks} | ✅${p.formSubmits}`)
    .join("\n");

  const blocks: object[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `${emoji} Newman Properties - ${title} Report`,
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Period:* ${data.period}${data.trends ? `\n_Trends ${comparisonText}_` : ""}`,
      },
    },
    {
      type: "divider",
    },
    // Overall metrics
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*📈 Overall Performance*",
      },
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*👥 Total Visitors*\n${data.totalUsers.toLocaleString()}${formatTrend(data.trends?.totalUsers)}`,
        },
        {
          type: "mrkdwn",
          text: `*📄 Page Views*\n${data.pageViews.toLocaleString()}${formatTrend(data.trends?.pageViews)}`,
        },
        {
          type: "mrkdwn",
          text: `*📅 Tour Clicks*\n${data.tourClicks}${formatTrend(data.trends?.tourClicks)}`,
        },
        {
          type: "mrkdwn",
          text: `*✅ Inquiries*\n${data.formSubmits}${formatTrend(data.trends?.formSubmits)}`,
        },
        {
          type: "mrkdwn",
          text: `*⏱️ Avg. Duration*\n${data.avgSessionDuration}`,
        },
        {
          type: "mrkdwn",
          text: `*📊 Conversion*\n${conversionRate}%`,
        },
      ],
    },
    {
      type: "divider",
    },
    // Property breakdown section
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*🏢 Performance by Property*\n_(👥 Visitors | 📅 Tour Clicks | ✅ Inquiries)_",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: fullPropertyTable,
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*🌐 Traffic Sources*\n${topSourcesText || "No data"}`,
        },
        {
          type: "mrkdwn",
          text: `*📍 Top Cities*\n${topCitiesText || "No data"}`,
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "Data from Google Analytics • newmanpropertiesllc.com",
        },
      ],
    },
  ];

  return { blocks };
}

export async function sendToSlack(message: object): Promise<boolean> {
  const webhookUrl = process.env.SLACK_ANALYTICS_WEBHOOK;
  
  if (!webhookUrl) {
    console.error("SLACK_ANALYTICS_WEBHOOK not configured");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to send Slack message:", error);
    return false;
  }
}
