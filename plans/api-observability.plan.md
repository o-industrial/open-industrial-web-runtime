# API Velocity & Observability Landing Page Plan

## Source Material

- [Liberty Edition Seed](./seed.md) – keep open alongside this plan.
- Seed sections to cite:
  - “APIs & Observability: Action at the Speed of Thought” for pain/liberty/solution bullets and figure captions.
  - “Interfaces: Where Liberty Meets Usability” to reinforce developer autonomy.
  - “Azi: The Opinionated Partner in Liberty” for AI-assisted API authoring copy.

## Landing Page Summary

- **Purpose:** Convert developer champions, DevOps leads, and analytics engineers by showing how OpenIndustrial delivers governed APIs and unified observability.
- **Campaign Alignment:** Developer webinars, technical email drips, GitHub retargeting audiences.
- **Primary CTA:** `Request Sandbox Access`.
- **Secondary CTA:** `Download the API Reference Pack`.

## Audience & Needs

- [ ] Confirm personas (Lead Developer, DevOps Engineer, Analytics Lead).
- Pain references:
  - Bureaucratic API processes slowing innovation (Liberty Edition “APIs & Observability”).
  - Lack of instant documentation and token management.
  - Fragmented observability between warm and cold data.
- Desired outcomes:
  - Ship governed APIs 40% faster.
  - Automate JWT scopes and lifecycle.
  - Monitor live & historical metrics in one surface.

## Messaging Pillars

1. **Accelerated Delivery:** Automation & CLI tools, Save→Commit pipeline, 40% faster stat.
2. **Governed Access:** JWT management, token scopes, audit logging (`device-integration.ts` & `homeContent.whyOi.guardrails`).
3. **Unified Insight:** Warm + cold query APIs, dashboards, schema inspector (Liberty Edition Observability section).

## Page Outline & Task List

### 1. Hero Module

- [ ] Headline: “Launch Governed APIs in Hours, Not Weeks.”
- [ ] Subhead describing CLI automation + instant docs.
- [ ] CTA pair (Sandbox + Reference Pack).
- [ ] Visual: `/assets/docs/oi-apis.png` plus overlayed CLI snippet.
- [ ] Echo seed language “no approval chains, no gatekeepers” near CTA to reinforce promise.

### 2. Developer Workflow Narrative

- [ ] Step-by-step copy from idea → API publish (use Liberty Edition bullet list).
- [ ] Include highlighted Save→Commit→Deploy flow referencing workspace plan.
- [ ] Quote from engineer persona or fictionalized Azi prompt.

### 3. API Feature Tiles

- [ ] Tiles for Automation & CLI, Warm Query APIs, Cold Query APIs, Custom Apps.
- [ ] Each tile links to relevant doc snippet (if available) or future doc.
- [ ] Add metrics (40% faster launch, near-real-time dashboards).

### 4. JWT & Security Deep Dive

- [ ] Section header: “Security That Moves at Developer Speed.”
- [ ] Cover token scope configuration, lifespan setting, connection to guardrails.
- [ ] Reference `device-integration.ts` query (“Show contractor role permissions”).
- [ ] Add checklist for security team sign-off.

### 5. Observability Spotlight

- [ ] Introduce `/assets/docs/oi-observability.png`.
- [ ] Copy explaining curated warm queries, dashboards, schema inspector, alerts.
- [ ] Provide example KPI (temperature anomaly detection) referencing Liberty Edition.
- [ ] Call out log/trend correlation for DevOps.

### 6. Azi Collaboration Module

- [ ] Demonstrate Azi helping craft queries and pipelines (`Liberty Edition` AI + Data bullet).
- [ ] Include conversation snippet generating warm query plus API publish.
- [ ] CTA to experience AI-assisted API creation in sandbox.

### 7. Proof & CTA Final

- [ ] Restate 40% faster metric, highlight developer autonomy.
- [ ] CTA buttons (Sandbox, Reference Pack).
- [ ] Trust logos or compliance statements from `about.ts` if applicable.

## Asset Requirements

- [ ] Updated API explorer screenshot.
- [ ] Observability dashboard screenshot with highlighted KPIs.
- [ ] CLI snippet graphic showing publish command.
- [ ] PDF reference pack (curl + TypeScript examples).

## Content Sources

- [ ] Liberty Edition “APIs & Observability” section.
- [ ] `homeContent.howItWorks` steps (Connect → Ask Azi → Share).
- [ ] `solutions/device-integration.ts` for token scope examples.
- [ ] `homeContent.useCases.cards` for KPI prompts.

## SEO & Metadata

- [ ] Title: “Governed Industrial APIs & Observability | OpenIndustrial”.
- [ ] Meta description focusing on 40% faster delivery and unified monitoring.
- [ ] Keywords: “industrial API platform”, “governed API launch”, “industrial observability dashboards”.

## Analytics & Experimentation

- [ ] Track sandbox requests vs reference downloads.
- [ ] Measure scroll to Observability module.
- [ ] Test CTA text (Request Sandbox vs Start Building).
- [ ] Add event for copy/CLI snippet interactions.

## Production Checklist

- [ ] Copy final
- [ ] Reference pack asset finished
- [ ] Visuals approved
- [ ] Security review (claims about governance)
- [ ] Page build & QA
- [ ] Launch + analytics hooks
- [ ] Implement route at `apps/home/liberty/api-observability.tsx` with dedicated components/content.

## Marketing Content Plan

- **Core Reference:** Use `plans/seed.md` “APIs & Observability” + “Interfaces” + “Azi” sections to keep developer autonomy tone consistent.

### Priority Channels

- [ ] **LinkedIn Developer Post** – highlight “no approval chains, no gatekeepers” with KPI (40% faster).
- [ ] **Dev.to / Medium Engineering Blog** – deep dive on governed API launch with CLI snippets.
- [ ] **Product Hunt / Hacker News Launch Prep** – optional if timing aligns; craft maker comment referencing liberty theme.
- [ ] **Google Search Ads** – keywords “industrial API platform”, “governed API deployment”.
- [ ] **Email Nurture (3-touch)** – developer-focused sequence (workflow, security, observability).
- [ ] **YouTube Tutorial Script** – live coding session creating warm query API + dashboards.
- [ ] **GitHub Readme/Repo Update** – ensure docs include new messaging and link to landing page.

### Supporting Tasks

- [ ] Compile token/JWT examples and ensure they pass security review before publication.
- [ ] Coordinate with dev advocates for content distribution schedule.
- [ ] Establish UTM tracking for technical communities vs paid channels.
