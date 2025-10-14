# Azi Co-Pilot Landing Page Plan

## Source Material

- [Liberty Edition Seed](./seed.md) – primary storytelling reference.
- Seed sections to integrate:
  - “Case Study: From Locked Data to Living Systems” for the 30-minute deployment proof.
  - “Azi: The Opinionated Partner in Liberty” for capability bullets and AziInnerVoice tone.
  - “Conclusion: The Era of Software Liberty” to reinforce ownership promise in finale.

## Landing Page Summary

- **Purpose:** Demonstrate Azi as the opinionated, transparent AI partner for executives, engineering leaders, and hands-on builders—driving AI pilot sign-ups or workshop bookings.
- **Campaign Alignment:** AI launch announcements, retargeting for demo attendees, executive briefing outreach.
- **Primary CTA:** `Join the Azi Pilot Program`.
- **Secondary CTA:** `Book an AI Strategy Session`.

## Audience & Context

- [ ] Validate personas (Chief Digital Officer, Head of Engineering, Lead Systems Architect).
- Pains drawn from Liberty Edition “Azi” section:
  - Black-box AI eroding agency.
  - Fragmented tooling across data, cloud, and deployment.
  - Need for explainable, reversible guidance.
- Desired outcomes:
  - AI guidance that keeps control with humans.
  - Context-aware support across workspace, data, and infrastructure.
  - Clear visibility into every AI decision.

## Messaging Pillars

1. **Opinionated, Not Opaque:** Azi suggests plans, exposes trade-offs, requires confirmation.
2. **Full-Stack Awareness:** Workspace, data, cloud, global capabilities in one co-author (Liberty Edition bullets).
3. **Governed by Design:** Every action logged, explainable, reversible (align with `homeContent.whyOi.guardrails`).

## Page Outline & Task Breakdown

### 1. Hero Statement

- [ ] Headline idea: “Azi Keeps Liberty in Your Hands.”
- [ ] Subhead: benefits of opinionated AI with human choice.
- [ ] CTA buttons (Pilot Program, Strategy Session).
- [ ] Background visual of Azi chat with telemetry context.
- [ ] Include micro-quote from seed’s AziInnerVoice block near hero to set tone.

### 2. Opening Narrative

- [ ] Recount Liberty Edition case: Azi guiding engineers to deploy alert dashboard in 30 minutes.
- [ ] Present problem (black-box automation) vs Azi’s approach.
- [ ] Include quote callout (AziInnerVoice snippet).

### 3. Capability Quadrants

- [ ] Sections for Azi + Workspace, + Data, + Cloud, + Global (reuse Liberty Edition bullet list).
- [ ] Each quadrant includes:
  - Scenario description.
  - Sample prompt / response.
  - Checkbox to track copy completion.
- [ ] Call out governance/visibility per quadrant.

### 4. Transparency & Control Module

- [ ] Highlight explainable KQL translation (`homeContent.howItWorks` Ask Azi step).
- [ ] Describe approvals / reversions (tie to Save → Commit → Deploy workflow).
- [ ] Add security note: all actions logged (pull from `device-integration.ts` outputs).

### 5. Persona Benefits

- [ ] Create toggled tabs (Executive, Engineering Lead, Operations).
- [ ] Each tab lists pain, Azi impact, and measurable outcome.
- [ ] Use existing outcome stats (e.g., 40% faster API, 30-min dashboard).

### 6. Proof & Social Validation

- [ ] Insert testimonial placeholder from early adopter.
- [ ] Reference industries served (`about.ts` list).
- [ ] Mention compliance guardrails (Governance by Design, Explainability).

### 7. CTA Finale

- [ ] Reinforce “Liberty with Guidance” message.
- [ ] CTA pair: Pilot Program, Strategy Session.
- [ ] Add FAQ accordion (e.g., data privacy, model transparency).

## Asset Requirements

- [ ] Updated screenshot/gif of Azi conversation executing workspace tasks.
- [ ] Flow diagram showing AI recommendation path with checkpoints.
- [ ] FAQ copy for AI concerns.

## Content Sources

- [ ] Liberty Edition Azi section.
- [ ] `homeContent.azi.examples` for prompt ideas.
- [ ] `homeContent.howItWorks` for explainability claims.
- [ ] `solutions/device-integration.ts` for governance/permission references.

## SEO & Metadata

- [ ] Title: “Azi Industrial AI Co-Pilot | Opinionated, Transparent Guidance”.
- [ ] Meta description highlighting controlled AI orchestration.
- [ ] Keywords: “industrial AI copilot”, “governed AI automation”, “AI for OT systems”.

## Analytics & Experiments

- [ ] Track pilot applications vs strategy session bookings.
- [ ] Test hero headline (Liberty focus vs Productivity focus).
- [ ] Capture interactions with capability quadrants and FAQ.

## Production Checklist

- [ ] Copy draft complete
- [ ] Visual assets (chat screenshot, diagram)
- [ ] Legal/privacy review (AI assurances)
- [ ] Page built & QA
- [ ] Launch + analytics connected
- [ ] Implement route at `apps/home/liberty/azi-co-pilot.tsx` with required components/content.

## Marketing Content Plan

- **Core Reference:** Draw directly from `plans/seed.md` “Case Study” + “Azi” + “Conclusion” sections when crafting executive-facing messaging.

### Priority Channels

- [ ] **LinkedIn Executive Video** – 60 sec narrative on opinionated AI with liberty framing.
- [ ] **LinkedIn Newsletter / Article** – “Azi Keeps Liberty in Your Hands” deep dive for leadership audience.
- [ ] **Google Search & Display Ads** – focus on “industrial AI copilot”, “governed AI automation”.
- [ ] **Email Campaign (3-touch)** – AI pilot invitation series (Story → Capabilities → Call to Join).
- [ ] **Conference / Webinar Deck** – presentation outline for AI + OT events using AziInnerVoice quotes.
- [ ] **YouTube/Website Demo Script** – show Azi recommending deployment paths with transparent trade-offs.
- [ ] **Press / PR Brief** – positioning doc for media outreach about AI liberty stance.

### Supporting Tasks

- [ ] Capture executive testimonial or placeholder quote to use across channels.
- [ ] Coordinate with legal/privacy for AI claim vetting before paid campaigns.
- [ ] Develop nurture automation to track pilot applications vs strategy session bookings (UTM alignment).
