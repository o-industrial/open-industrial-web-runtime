# API Velocity & Observability Landing Page Prompt

## Objective
Deliver detailed landing-page copy and marketing collateral for the “API Velocity & Observability” campaign, strictly following `plans/api-observability.plan.md` and the liberty narrative in `plans/seed.md`.

## Pre-Work
1. Review:
   - `plans/seed.md` (“APIs & Observability,” “Interfaces,” “Azi” sections).
   - `plans/api-observability.plan.md`.
   - `src/marketing/home.ts` (`homeContent.howItWorks`, `homeContent.whyOi`).
   - `src/marketing/solutions/device-integration.ts` (token scopes).
   - Route target: build page at `apps/home/workspace-liberty/api-observability.tsx`.
2. Extract proof statements: 40% faster launch, “no approval chains, no gatekeepers,” warm/cold query definitions, Azi guidance examples.
3. Note required assets: `/assets/docs/oi-apis.png`, `/assets/docs/oi-observability.png`, CLI snippet graphic, API reference pack PDF.

## Landing Page Deliverables
Craft final copy for each section:

1. **Hero Module**
   - Headline (“Launch Governed APIs in Hours, Not Weeks.”).
   - Subheadline describing automation + instant docs.
   - CTA buttons (`Request Sandbox Access`, `Download the API Reference Pack`).
   - Supporting callout with “no approval chains, no gatekeepers.”
2. **Developer Workflow Narrative**
   - Paragraph/story covering idea → Save→Commit→Deploy → API publish.
   - List of workflow steps referencing `homeContent.howItWorks`.
   - Include engineer quote or Azi prompt.
3. **API Feature Tiles**
   - Copy for four tiles (Automation & CLI, Warm Query APIs, Cold Query APIs, Custom Apps).
   - Stats (40% faster, near-real-time dashboards).
4. **JWT & Security Deep Dive**
   - Section header copy (“Security That Moves at Developer Speed.”).
   - Explanation of token scopes, lifespan configuration, guardrails.
   - Checklist for security validation referencing `device-integration.ts`.
5. **Observability Spotlight**
   - Narrative connecting warm/cold data, dashboards, schema inspector, alerts.
   - KPI example (e.g., temperature anomaly) and log correlation commentary.
6. **Azi Collaboration Module**
   - Description of AI assistance with sample conversation.
   - CTA to experience AI-assisted API build in sandbox.
7. **Proof & CTA Finale**
   - Recap benefits, restate 40% faster metric, trust markers.
   - CTA pair repeated.
8. **Asset & Proof Summary**
   - List required visuals/docs + owners.
9. **SEO & Metadata**
   - Title, meta description, keyword list.
10. **Analytics & Experiment Plan**
    - Event tracking, scroll goals, CTA copy test, CLI snippet interaction.
11. **Production Checklist Status**
    - Table marking each checklist item (Complete/Pending/Owner).

## Marketing Deliverables
Prepare copy/outlines for each channel noted in the plan:

1. **LinkedIn Developer Post**
   - Hook, body, CTA referencing “no approval chains”.
2. **Dev.to / Medium Blog Outline**
   - H1, section headings, key insights, CTA.
3. **Product Hunt / Hacker News Prep**
   - Maker comment, tagline, talking points (note optional nature).
4. **Google Search Ads**
   - 4–5 headlines + 3 descriptions tailored to industrial API keywords.
5. **Email Nurture (3-touch)**
   - Subject, preview, bullet points, CTA for each email (workflow, security, observability focus).
6. **YouTube Tutorial Script**
   - Live coding script outline (intro, steps, callouts, CTA).
7. **GitHub Readme Update Plan**
   - Summary of messaging updates, link placement, contributing note.

Include UTMs, asset requirements, security/legal dependencies, and developer advocate coordination notes.

## Output Format
Respond with numbered sections:
1. **Landing Page Copy** (modules in sequence).
2. **Asset & Proof Log**.
3. **SEO & Analytics Plan**.
4. **Production Checklist Table**.
5. **Marketing Deliverables** (channel subsections).
6. **Dependencies & Open Questions** (e.g., API reference pack status).

Maintain developer-forward tone while reinforcing liberty and governance. Provide copy and instructions only; no implementation steps.
