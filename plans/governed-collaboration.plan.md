# Governed Collaboration Landing Page Plan

## Source Material

- [Liberty Edition Seed](./seed.md) – authoritative narrative for liberty framing.
- Seed sections to weave in:
  - “Users & Teams: Collaboration Without Compromise” for pain/liberty/solution structure and figure caption.
  - “Azi: The Opinionated Partner in Liberty” to show transparent AI assistance for access questions.
  - “Conclusion: The Era of Software Liberty” language to reinforce ownership messaging.

## Landing Page Summary

- **Purpose:** Convince program leaders, compliance officers, and OT security leads that invite-only workspaces with role-based controls deliver safer collaboration.
- **Campaign Alignment:** ABM outreach to regulated manufacturers; compliance-focused nurture series.
- **Primary CTA:** `Schedule a Governance Review`.
- **Secondary CTA:** `Download the Governance Checklist`.

## Audience & Pain Landscape

- [x] Confirm target roles (VP Operations, Director of Quality, OT Security Lead).
- Pain points sourced from Liberty Edition “Users & Teams” section:
  - Engineers treated like outsiders by enterprise IAM.
  - Excessive access leading to compliance violations.
  - Lack of transparent audit trails.
- Desired transformation: invite-only control, immediate auditability, policy-change agility.

## Messaging Framework

- [x] Anchor story in “Collaboration Without Compromise”.
- [x] Reinforce liberty ≠ chaos; emphasize guardrails from `src/marketing/home.ts:241-274` and `about.ts:92-107`.
- [x] Introduce “Sovereign Teams” concept to differentiate from generic RBAC.

### Pillars

1. **Identity Unification:** Profiles & access in one surface (`Users & Teams` copy).
2. **Invite-Only Governance:** Team membership as first security boundary (device-integration solution highlights).
3. **Explainable Oversight:** Audit trails, token-scoped permissions, compliance-ready logs.

## Page Outline & Tasks

### 1. Hero & Value Proposition

- [x] Headline variant: “Governed Teams. Real Liberty.” (test).
- [x] Subhead referencing pain (“Stop treating engineers like intruders”).
- [x] CTA pairing (Review + Checklist).
- [x] Add compliance badge area (SOC-ready logging from `about.ts`).

### 2. Persona Snapshots

- [x] Three-card layout (Operations, Quality, Security).
- [x] Each card includes personal pain and liberty outcome.
- [x] Pull bullet examples from `solutions/quality-management.ts` (audit packages) and `device-integration.ts` (token scopes).
- [x] Quote the seed’s “Invite, assign, and empower—no gatekeepers required” line in intro copy.

### 3. Governance Model Deep Dive

- [x] Diagram: Invite-only workspace → Roles → Action boundaries.
- [x] Copy modules:
  - Profiles & Access Management.
  - Role-Based Controls (Viewer, Editor, Maintainer, Admin).
  - Audit Trails.
- [x] Link to documentation or upcoming doc page.

### 4. Guardrails Stories

- [x] Include “Governed from the Start / Explainable by Default / Instant Activation” from `homeContent.whyOi.guardrails`.
- [x] Add compliance scenario (FDA audit, OSHA investigation).
- [x] Checklist of controls with status checkboxes for tracking.

### 5. Azi for Governance

- [x] Describe how Azi explains token decisions / role impacts (pull from Liberty Edition AI section).
- [x] Provide sample conversation (“Show contractor scope vs engineer” referencing `device-integration.ts` toggle queries).
- [x] Use AziInnerVoice tone from seed to illustrate opinionated but controlled guidance.

### 6. CTA Stack

- [x] Primary CTA: Governance Review (calendar integration).
- [x] Secondary CTA: Checklist download (gated PDF).
- [x] Add social proof: “Used by regulated manufacturers (Life Sciences, Energy)” referencing `about.ts` industries served.

## Asset Requirements

- [x] Updated screenshot for `/assets/docs/oi-teams.png` with role matrix.
- [x] Flow diagram for invite-only onboarding.
- [x] PDF template for governance checklist.

## Proof & Compliance

- [ ] Align language with legal/compliance team.
- [x] Cite audit trail logging capabilities (tie to `solutions/device-integration.ts:69-74` outputs).
- [ ] Add stat if available (e.g., “cut access review time by X%”).

## SEO & Metadata

- [x] Title: “Governed Collaboration | Secure Industrial Workspaces”.
- [x] Meta description emphasizing invite-only control and audit trails.
- [x] Keywords: “industrial RBAC”, “audit-ready workspaces”, “governed OT collaboration”.

## Analytics & Testing

- [x] Track CTA clicks (review vs checklist).
- [x] Set up exit intent modal test offering checklist.
- [x] Monitor scroll depth to guardrail section.

## Production Checklist

- [x] Copy draft
- [ ] Compliance review
- [ ] Visual approvals
- [ ] Checklist asset uploaded
- [ ] Page built & QA
- [ ] Launch + measurement configured
- [ ] Implement route at `apps/home/liberty/governed-collaboration.tsx` with required components/content.

## Marketing Content Plan

- **Core Reference:** Use `plans/seed.md` (especially “Users & Teams” + “Conclusion”) to maintain liberty/ownership messaging across collateral.

### Priority Channels

- [x] **LinkedIn Executive Brief** – post or newsletter targeting operations/compliance leaders highlighting “Invite, assign, and empower—no gatekeepers required”.
- [x] **LinkedIn Sponsored Video** – 45 sec explainer on invite-only security + audit trails.
- [x] **Industry Newsletter Feature** – article pitch for regulated manufacturing publications focusing on audit-readiness.
- [x] **Google Display Ads** – creatives emphasizing “audit-ready workspaces” with CTA to Governance Review.
- [x] **ABM Email Sequence (4-touch)** – persona-specific emails (Ops, Quality, Security, Exec) with case stories sourced from seed.
- [x] **Downloadable Governance Checklist Promotion** – landing CTA support post (blog snippet + social copy).
- [x] **Webinar Outline** – “Governance without gatekeepers” session content plan referencing Azi governance assistance.

### Supporting Tasks

- [ ] Compile compliance proof points (least-privilege, SOC logging) with legal sign-off.
- [ ] Build lead-scoring rules tied to checklist download and review requests.
- [ ] Coordinate with design for role matrix graphics in ads/carousels.
