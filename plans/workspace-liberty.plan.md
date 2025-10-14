# Workspace Liberty Landing Page Plan

## Source Material
- [Liberty Edition Seed](./seed.md) – use as the canonical narrative foundation.
- Key seed sections to reference:
  - “Case Study: From Locked Data to Living Systems” for hero storytelling and proof.
  - “Workspaces: Your Domain of Control” for feature bullets, InlineUXTip language, and screenshot caption.
  - “The Road Ahead: Liberty in Motion” for CTA sequencing.

## Landing Page Summary
- **Purpose:** Convert data architects and solution owners exploring modernization into Evaluation Workspace sign-ups or demo requests.
- **Campaign Alignment:** Pairs with top-of-funnel “Unlock Industrial Liberty” ads and webinar follow-ups.
- **Primary CTA:** `Get Started in the Evaluation Workspace`.
- **Secondary CTA:** `Schedule a Guided Demo`.

## Audience & Relevance
- [ ] Validate persona fit with Data Architects, Platform Engineering leads, and Innovation Directors.
- Pain anchors:
  - Disconnected tools causing version chaos (`Workspaces: Your Domain of Control` copy in Liberty Edition draft).
  - Manual pipeline backlog (hero copy in `src/marketing/home.ts:104-138`).
- Desired outcomes:
  - Own iterative loops (Save → Commit → Deploy).
  - Maintain governance while moving fast (commit history, rollback).

## Narrative Arc & Positioning
- [ ] Confirm opening narrative references the Midwest manufacturer case study for credibility.
- [ ] Use “Liberty” framing with explicit contrast against siloed legacy systems.
- [ ] Reinforce authorship/ownership theme in every major module.

### Messaging Pillars
1. **Domain of Control:** Multiple workspaces, each with clear lineage (`Liberty Edition` Workspaces section; `homeContent.howItWorks` and `homeContent.unifiedHub`).
2. **Governed Velocity:** Save → Commit → Deploy loop, rollback, audit readiness (`src/marketing/home.ts:130-140`, `solutions/quality-management.ts` outcomes).
3. **Immediate Proof:** 30-minute case study walkthrough; highlight 2-week cycle → afternoon stat.

## Page Outline & Content Tasks

### 1. Hero Module
- [ ] Draft headline echoing “Turn Industrial Data Into Instant Insight” while emphasizing workspace liberty.
- [ ] Subhead references case study outcome and 30-minute deployment.
- [ ] Include short pull quote from seed case study (first paragraph) to anchor credibility.
- [ ] CTA buttons linked to Evaluation Workspace and Demo (align with `homeContent.hero` CTAs).
- [ ] Include case study stat callout badge.

### 2. Case Study Snapshot
- [ ] Write 3-paragraph narrative (Problem → Intervention → Result) based on Liberty Edition intro.
- [ ] Highlight “data isn’t useful until it’s alive” language to tie back to liberty theme.
- [ ] Add metric bullets (anomalies surfaced in minutes, validation cycle reduced).
- [ ] Insert testimonial placeholder if available.

### 3. Workspaces Explainer
- [ ] Repurpose bullet list (Targeted Workspaces, Multi-Source Inputs, Commit History, Save→Commit→Deploy).
- [ ] Use InlineUXTip copy “sovereign territory—your system, your rules” as supporting caption.
- [ ] Add inline diagram reference (`/assets/docs/oi-workspaces.png`).
- [ ] Create checklist for prospective buyer (“Can we?” with yes answers).

### 4. Governed Flow Tiles
- [ ] Use `homeContent.howItWorks.steps` to build three-step cards.
- [ ] Include icon mapping (ConnectionIcon, WarmQueryIcon, StackIcon).
- [ ] Add microcopy explaining rollback and diff view (pull phrasing from `solutions/production-management.ts` if needed).

### 5. Persona-Specific Proof
- [ ] Add `PersonaFlag` component once implemented; placeholder note if not ready.
- [ ] Craft micro case for data architects (diagram of domain partitioning).
- [ ] Optional toggle to show architect vs operations benefits.

### 6. CTA Band
- [ ] Reinforce “Author Your Own Workspace” message.
- [ ] Mirror CTA pairings with tracking UTM stub.
- [ ] Add trust markers (logos or compliance statements from `about.ts` non-negotiables).

## Asset Requirements
- [ ] Screenshot: `/assets/docs/oi-workspaces.png` (ensure latest high-res).
- [ ] Animation concept: commit diff or rollback motion.
- [ ] Quote block styling aligned with `SectionSurface` usage.

## Proof & Validation
- [ ] Reference `homeContent.useCases.cards` for quick wins.
- [ ] Pull regulated language from `src/marketing/about.ts` (“Governance by Design”).
- [ ] Confirm stats (2-week → afternoon, 30-minute dashboard, 40% faster API) with product team.

## SEO & Metadata
- [ ] Page title draft: “Workspace Liberty | OpenIndustrial Evaluation Landing”.
- [ ] Meta description: highlight Save → Commit workflow, Evaluation Workspace CTA.
- [ ] Keyword targets: “industrial workspace platform”, “governed industrial data hub”.

## Analytics & Experiments
- [ ] Define success events: Evaluation signup, demo request, hero CTA clicks.
- [ ] Plan A/B headline test (Liberty vs Ownership framing).
- [ ] Instrument scroll depth to ensure case study is consumed.

## Production Checklist
- [ ] Copy draft complete
- [ ] Visual assets approved
- [ ] Legal review (governance claims)
- [ ] Build in CMS
- [ ] QA across breakpoints
- [ ] Launch + annotate analytics dashboard
- [ ] Implement page at `apps/home/workspace-liberty/index.tsx` with supporting components/data.

## Marketing Content Plan
- **Core Reference:** Keep `plans/seed.md` open when drafting every asset to ensure liberty narrative and case study language remain consistent.

### Priority Channels
- [ ] **LinkedIn Thought Leadership Post** – long-form post for data architects featuring the “data isn’t useful until it’s alive” story + link to landing page.
- [ ] **LinkedIn Carousel** – visual walkthrough of Save → Commit → Deploy loop using workspace screenshots (`/assets/docs/oi-workspaces.png`).
- [ ] **Google Search Ads** – craft headline/description pairs for keywords like “industrial workspace platform”, “governed data hub”, “OT data modernization”.
- [ ] **Email Nurture (3-touch)** – sequence for webinar or ad leads (Intro story → Workflow deep dive → CTA reminder).
- [ ] **Technical Blog Cross-Post** – repurpose landing content into a blog for `apps/blog` referencing InlineUXTip language.
- [ ] **Short Demo Video Script** – 60–90 sec script showing workspace setup to deployment with liberty framing for YouTube/social.
- [ ] **Retargeting Display Assets** – banner copy + CTA (“Author your own workspace”) for remarketing.

### Supporting Tasks
- [ ] Gather KPI proof (2-week → afternoon) for all ad copy.
- [ ] Create UTM plan per channel for reporting.
- [ ] Coordinate with design on carousel + display creatives.
