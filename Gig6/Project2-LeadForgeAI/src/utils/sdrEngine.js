/**
 * LeadForge Autonomous SDR & BANT Qualification Engine
 * Dynamically computes lead readiness, generates conversational prompts,
 * and synchronizes with CRM pipelines and calendar dispatchers.
 */

export function calculateLeadScore(answers) {
  let totalScore = 0;
  let breakdown = {
    need: 0,
    timeline: 0,
    budget: 0,
    authority: 0
  };

  if (answers.need) {
    breakdown.need = Math.min(30, answers.need.weight || 20);
    totalScore += breakdown.need;
  }
  if (answers.timeline) {
    breakdown.timeline = Math.min(25, answers.timeline.weight || 15);
    totalScore += breakdown.timeline;
  }
  if (answers.budget) {
    breakdown.budget = Math.min(35, answers.budget.weight || 20);
    totalScore += breakdown.budget;
  }
  if (answers.authority) {
    breakdown.authority = Math.min(15, answers.authority.weight || 10);
    totalScore += breakdown.authority;
  }

  // Normalize score between 0 and 100
  const normalizedScore = Math.min(100, Math.round((totalScore / 105) * 100));

  let status = "COLD";
  let gradeColor = "text-slate-400";
  let badgeText = "❄️ Nurture Pipeline";

  if (normalizedScore >= 78) {
    status = "HOT";
    gradeColor = "text-emerald-400";
    badgeText = "🔥 High-Intent / Book VIP Call";
  } else if (normalizedScore >= 55) {
    status = "WARM";
    gradeColor = "text-amber-400";
    badgeText = "⚡ Qualified / Priority Callback";
  }

  return {
    score: normalizedScore,
    status,
    gradeColor,
    badgeText,
    breakdown: {
      needPct: Math.round((breakdown.need / 30) * 100),
      timelinePct: Math.round((breakdown.timeline / 25) * 100),
      budgetPct: Math.round((breakdown.budget / 35) * 100),
      authorityPct: Math.round((breakdown.authority / 15) * 100)
    }
  };
}

// Initial mock leads for the CRM Pipeline Kanban
export const INITIAL_CRM_LEADS = [
  {
    id: "lead-9102",
    name: "Dr. Alistair Finch",
    company: "Nexus Health Systems",
    email: "finch@nexushealth.org",
    profile: "agency",
    need: "Full-Stack SaaS Platform (MERN)",
    budget: "$25,000+",
    timeline: "Urgent (2-4 wks)",
    score: 96,
    stage: "Meeting Booked",
    bookedSlot: "Nov 14 @ 3:00 PM EST",
    createdAt: "10 mins ago"
  },
  {
    id: "lead-9103",
    name: "Sarah Jenkins",
    company: "CloudScale Analytics",
    email: "sjenkins@cloudscale.io",
    profile: "saas",
    need: "Dedicated Multi-Region Egress & VPC",
    budget: "$3,500/mo",
    timeline: "Immediate",
    score: 88,
    stage: "AI Qualified (BANT)",
    bookedSlot: null,
    createdAt: "28 mins ago"
  },
  {
    id: "lead-9104",
    name: "Marcus Vance",
    company: "Vance Capital Group",
    email: "m.vance@vancecap.com",
    profile: "realestate",
    need: "Prime Residential Penthouse / Estate",
    budget: "$4,500,000",
    timeline: "All-Cash 30 Days",
    score: 94,
    stage: "Contract Sent",
    bookedSlot: "Nov 12 @ 11:30 AM EST",
    createdAt: "1 hour ago"
  },
  {
    id: "lead-9105",
    name: "Liam O'Connor",
    company: "Aura Creative Labs",
    email: "liam@auracreative.co",
    profile: "agency",
    need: "High-Converting Brand / Marketing Site",
    budget: "$2,500",
    timeline: "Flexible",
    score: 62,
    stage: "Inbound Inquiry",
    bookedSlot: null,
    createdAt: "2 hours ago"
  }
];
