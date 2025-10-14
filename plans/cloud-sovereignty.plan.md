# Cloud Sovereignty Landing Page Plan

## Source Material

- [Liberty Edition Seed](./seed.md) – primary copy source for liberty framing.
- Reference seed sections:
  - “Cloud Environment: Design → Deploy → Observe” for stage breakdown and copy.
  - Case study intro for speed proof (under 30 minutes).
  - “The Road Ahead” for CTA sequencing and autonomy language.

## Landing Page Summary

- **Purpose:** Convince cloud engineers, CIOs, and platform owners that OpenIndustrial delivers sovereign control over industrial infrastructure.
- **Campaign Alignment:** Azure co-marketing pushes, infrastructure modernization nurture, LinkedIn thought leadership series on “Software Liberty”.
- **Primary CTA:** `Book an Architecture Session`.
- **Secondary CTA:** `Compare Deployment Options`.

## Audience Insights

- [ ] Verify personas (Director of Cloud Engineering, OT/IT Convergence Lead, CIO).
- Pain references:
  - Infrastructure hidden behind tickets and slow approvals (Liberty Edition Cloud section).
  - Limited visibility into observability and secrets.
  - Desire to mix Evaluation → Managed → BYO models (`src/marketing/home.ts:280-289`).
- Desired outcomes:
  - Design infrastructure declaratively in their tenant.
  - Keep governance while scaling globally.
  - Gain real-time observability and credential control.

## Messaging Pillars

1. **Design Freedom:** Infrastructure definitions, service principals, secret vaults (Liberty Edition “Design” bullets; `homeContent.cloud` sovereignty copy).
2. **Deployment Agility:** Provisioning pipelines, templates, geo-regions (Liberty Edition “Deploy”; `solutions/production-management` automation outputs).
3. **Observability Ownership:** Built-in telemetry, audit-ready logs, connection to OT signals (Liberty Edition “Observe”; `homeContent.whyOi.guardrails`).

## Page Outline & Work Items

### 1. Hero Module

- [ ] Headline idea: “Own Your Industrial Cloud, End to End.”
- [ ] Subhead contrasting ticket-based deployments vs immediate control.
- [ ] CTA pair: Architecture Session + Deployment Comparison.
- [ ] Background visual using `/assets/docs/oi-cloud.png`.
- [ ] Incorporate seed phrasing “your infrastructure, liberated” within or near hero.

### 2. Deployment Options Matrix

- [ ] Table comparing Evaluation, Managed Azure, Bring Your Own Azure (pull copy from `homeContent.cloud.options`).
- [ ] Add fourth column for Hybrid Transitions referencing Liberty Edition.
- [ ] Include checkboxes per option (Observability, Governance, Support).

### 3. Design → Deploy → Observe Sections

- [ ] Each stage gets its own subsection with iconography.
- [ ] Content tasks:
  - Design: highlight blueprint authoring, principal stitching.
  - Deploy: mention CI/CD flows, templates, geo-regions.
  - Observe: stress observability hooks, secret vaults.
- [ ] Add short case snippet about hours vs weeks deployment.

### 4. Sovereignty Story

- [ ] Narrative around “Your Cloud, Your Rules” from `homeContent.cloud.sovereignty`.
- [ ] Insert compliance safeguards (least-privilege access, private networking from `about.ts:92-100`).
- [ ] Provide bullet list for regulated benefits (data residency, audit logs, token scopes).

### 5. Azi as Infrastructure Co-Author

- [ ] Describe Azi guiding provisioning choices (Liberty Edition AI + Cloud bullet).
- [ ] Include dialogue sample showing trade-off analysis (speed vs cost vs compliance).
- [ ] CTA to request AI-assisted provisioning demo.

### 6. CTA Finale

- [ ] Restate sovereignty promise.
- [ ] Provide dual CTA (Architecture Session, Deployment Comparison PDF).
- [ ] Add logos/industries served for credibility (`about.ts` industries list).

## Asset Requirements

- [ ] Updated topology screenshot `/assets/docs/oi-cloud.png` with annotations.
- [ ] Comparative matrix graphic for deployment models.
- [ ] Animation concept: pipeline from commit → Azure resources.

## Proof & Content Sources

- [ ] Pull guardrail copy from `homeContent.whyOi.guardrails`.
- [ ] Use stats from case studies (30 min to dashboard) to demonstrate speed.
- [ ] Reference `solutions/device-integration.ts` for token-scoped permissions.

## SEO & Metadata

- [ ] Title: “Cloud Sovereignty for Industrial Systems | OpenIndustrial”.
- [ ] Meta description featuring Design→Deploy→Observe loop and deployment options.
- [ ] Keywords: “industrial cloud sovereignty”, “Azure industrial automation”, “governed industrial infrastructure”.

## Analytics & Testing

- [ ] Track architecture-session bookings vs comparison downloads.
- [ ] Run headline test (Sovereignty vs Autonomy).
- [ ] Monitor interaction with deployment matrix (scroll/click analytics).

## Production Checklist

- [ ] Copywriting complete
- [ ] Visual assets ready
- [ ] Technical fact-check by cloud team
- [ ] Legal review (claims about governance)
- [ ] Page build & QA
- [ ] Launch + reporting configured
- [ ] Implement route at `apps/home/liberty/cloud-sovereignty.tsx` with supporting components/content.

## Marketing Content Plan

- **Core Reference:** Reuse liberty phrasing from `plans/seed.md` “Cloud Environment” + “Conclusion” sections for all outbound copy.

### Priority Channels

- [ ] **LinkedIn Carousel** – “Design → Deploy → Observe” slides with annotated `/assets/docs/oi-cloud.png`.
- [ ] **LinkedIn Video Ad** – co-branded Azure message showing ticketless deployment.
- [ ] **Google Search Ads** – campaigns around “industrial cloud sovereignty”, “Azure industrial automation”.
- [ ] **Azure Marketplace Listing Refresh** – align listing copy with sovereignty narrative.
- [ ] **Solution Brief PDF** – downloadable asset summarizing deployment options matrix + guardrails.
- [ ] **Email Drip (3-touch)** – focus on Design, Deploy, Observe stories with CTA to architecture session.
- [ ] **Conference Presentation Kit** – slide outline for cloud events highlighting Liberty Edition case study.

### Supporting Tasks

- [ ] Collect proof metrics (hours vs weeks deployment) and validate with product team.
- [ ] Plan UTM tagging for each cloud-focused channel.
- [ ] Work with alliances team for co-marketing approvals.
