# Simulation & Connections Landing Page Plan

## Source Material
- [Liberty Edition Seed](./seed.md) – definitive reference for copy and narrative.
- Seed sections to leverage:
  - “Simulation & Connection Management: Day Zero Liberty” for pain/liberty/solution bullets and $120K anecdote.
  - “APIs & Observability” to tie connection health to dashboards/alerts.
  - InlineUXTip and SystemMindset statements for liberty tone.

## Landing Page Summary
- **Purpose:** Engage control engineers, OT managers, and industrial IT teams with a “Day Zero Liberty” story that leads to simulation toolkit requests or proof-of-concept sign-ups.
- **Campaign Alignment:** Trade show follow-up emails, IoT/edge webinars, whitepaper promotions on digital twins.
- **Primary CTA:** `Request the Simulation Toolkit`.
- **Secondary CTA:** `Book a Day-Zero Planning Session`.

## Audience & Pain Points
- [ ] Verify personas (Control Engineering Manager, OT Architect, Industrial IT Lead).
- Pains referenced from Liberty Edition section:
  - Risk of touching live systems without rehearsal.
  - Complex provisioning across MQTT/HTTP/AMQP.
  - Device onboarding bottlenecks.
- Desired outcomes:
  - Simulate thousands of devices before hardware is live.
  - Detect throughput constraints early (Day Zero story).
  - Standardized connection management with auditability.

## Messaging Pillars
1. **Practice Before Production:** Simulation environment mirrors reality (Liberty Edition anecdote).
2. **Protocol Freedom:** Support for HTTP/MQTT/AMQP, device provisioning, digital twins.
3. **Operational Insight:** Detect network congestion, validate schemas, monitor connections.

## Page Outline & Content Tasks

### 1. Hero Narrative
- [ ] Headline: “Simulate 2,000 Devices Before You Flip the Switch.”
- [ ] Subhead recounting the $120K downtime savings anecdote.
- [ ] CTA buttons (Toolkit + Planning Session).
- [ ] Visual: dynamic collage of simulation charts (`/assets/docs/oi-connections.png`).
- [ ] Include liberty language (“test before touching a live wire”) drawn directly from seed.

### 2. Day Zero Case Story
- [ ] 3-step story (Challenge → Simulation Run → Savings).
- [ ] Include metrics (number of devices, congestion prevented, $ saved).
- [ ] Add testimonial placeholder from control engineer persona.

### 3. Simulation Capabilities
- [ ] Bullet checklist from Liberty Edition (Variables, Digital Twins, Time/Ticks, Templates).
- [ ] Expand with schema alignment insight note (`DeveloperNote` line).
- [ ] Add accordion for “How to configure” referencing docs if available.

### 4. Connection Management Deep Dive
- [ ] Section header: “Protocols Without Permission Slips.”
- [ ] Features: Supported protocols, connection strings, keys, device provisioning, edge gateway.
- [ ] Embed micro-diagram showing secure rotation (pull from `solutions/device-integration.ts` and `homeContent.ecosystem.categories`).

### 5. Observability Tie-In
- [ ] Highlight connection health monitoring (Liberty Edition caption).
- [ ] Introduce warm-query alerts for connectivity issues (leverage `homeContent.useCases.cards` downtime examples).
- [ ] Provide sample Azi prompt: “Show devices with missing calibration tags” (from `device-integration.ts` toggle query).

### 6. CTA + Resource Stack
- [ ] Primary CTA (Toolkit).
- [ ] Secondary CTA (Session).
- [ ] Bonus resource: link to docs (Spin up sim in `/apps/docs/meet-azi/spin-up-sim.mdx`).

## Asset Requirements
- [ ] Screenshot update for `/assets/docs/oi-connections.png`.
- [ ] Optional animation of device provisioning queue.
- [ ] PDF toolkit (simulation checklist, configuration templates).

## Proof & Content Sources
- [ ] Use quotes from Liberty Edition InlineUXTip (“Your system, your rules”).
- [ ] Reference `solutions/device-integration.ts:42-134` for provisioning details.
- [ ] Pull warm query example for identifying missing tags.

## SEO & Metadata
- [ ] Title: “Industrial Simulation & Connection Management | OpenIndustrial”.
- [ ] Meta description highlighting digital twin rehearsal and protocol coverage.
- [ ] Keywords: “industrial simulation toolkit”, “IoT provisioning AMQP MQTT”, “digital twin day zero”.

## Analytics & Testing
- [ ] Track toolkit downloads vs planning sessions.
- [ ] Heatmap connection deep dive to ensure engagement.
- [ ] Test CTA phrasing (Toolkit vs Playbook).

## Production Checklist
- [ ] Copywriting complete
- [ ] Case study proofed
- [ ] Visual assets ready
- [ ] Toolkit asset uploaded
- [ ] Page built & QA
- [ ] Launch + analytics configured
- [ ] Implement route at `apps/home/workspace-liberty/simulation-connections.tsx` with necessary components/data.

## Marketing Content Plan
- **Core Reference:** Lean on `plans/seed.md` “Simulation & Connection Management” + “APIs & Observability” sections for storytelling and stats.

### Priority Channels
- [ ] **LinkedIn Targeted Post** – highlight $120K savings story aimed at control engineers.
- [ ] **Reddit (r/PLC, r/IIoT) Thought Piece** – educational post on rehearsing device rollouts before hardware.
- [ ] **Google Search Ads** – keywords like “IoT device simulation toolkit”, “MQTT AMQP provisioning”.
- [ ] **Trade Show Follow-up Email Kit** – template referencing simulation toolkit CTA.
- [ ] **YouTube Demo Script** – walkthrough of digital twin setup and protocol onboarding.
- [ ] **Technical Blog / Dev.to Article** – “Day Zero Liberty” guide linking to toolkit.
- [ ] **IoT Newsletter Feature Pitch** – short abstract for industry publications.

### Supporting Tasks
- [ ] Gather visuals (simulation dashboards, provisioning UI) for ads/videos.
- [ ] Build gated toolkit download flow with lead capture.
- [ ] Coordinate moderation plan for Reddit/communities with authentic, non-promotional tone.
