# Workspace Liberty Landing Page Prompt

## Objective

Produce comprehensive landing-page copy and supporting marketing deliverables for the “Workspace Liberty” campaign, using `plans/workspace-liberty.plan.md` as the execution checklist and `plans/seed.md` as the canonical narrative source.

## Preparation

1. Open and study:
   - `plans/seed.md` (focus on “Case Study”, “Workspaces”, “The Road Ahead”, “Conclusion”).

- `plans/workspace-liberty.plan.md`.
- `src/marketing/home.ts` for existing messaging, especially `homeContent.howItWorks`, `homeContent.hero`, and `homeContent.unifiedHub`.
- `src/marketing/about.ts` for governance/credibility language.
- Routing target: implement page at `apps/home/liberty/index.tsx` with modular section components.

2. Capture key proof points (30-minute deployment, two-week → afternoon validation, governed APIs, Save→Commit→Deploy).

## Landing Page Deliverables

Create copy for each module listed below. Mirror the structure from the plan and check off tasks as you finish.

1. **Hero Module**
   - Headline blending “Turn Industrial Data Into Instant Insight” with liberty framing.
   - Subheadline summarizing the Midwest case study outcome.
   - Primary CTA: `Get Started in the Evaluation Workspace`.
   - Secondary CTA: `Schedule a Guided Demo`.
   - Pull-quote from the case study.
   - Stat callout (anomalies surfaced in minutes / validation cycle time).
2. **Case Study Snapshot**
   - Three paragraphs (Problem → Intervention → Result) anchored in the seed copy.
   - Bullet list of outcomes/metrics.
   - Placeholder for testimonial.
3. **Workspaces Explainer**
   - Bulleted benefits (Targeted Workspaces, Multi-Source Inputs, Commit History, Save→Commit→Deploy).
   - InlineUXTip caption: “sovereign territory—your system, your rules.”
   - Checklist block answering “Can we…?” with affirmative responses.
   - Callout referencing `/assets/docs/oi-workspaces.png`.
4. **Governed Flow Tiles**
   - Three-step cards based on `homeContent.howItWorks.steps` with icon notes (ConnectionIcon, WarmQueryIcon, StackIcon).
   - Copy explaining rollback/diff confidence.
5. **Persona-Specific Proof**
   - Data Architect focused paragraph + bullet list.
   - Optional toggle idea for Ops persona (note implementation requirements).
6. **CTA Band**
   - Reinforce “Author Your Own Workspace”.
   - Repeat dual CTA with UTM reminders.
   - Trust signal list leveraging `about.ts` (“Governance by Design”, etc.).
7. **SEO/Metadata Draft**
   - Title tag, meta description, target keywords (from plan).
8. **Analytics & Experiment Plan**
   - Document target events, A/B headline variants, scroll tracking notes.
9. **Production Checklist Status**
   - Provide status table (Complete / Pending / Owner) for each checklist item.

## Marketing Content Deliverables

For each channel in the plan’s Marketing Content section, draft initial copy frameworks:

1. **LinkedIn Thought Leadership Post**
   - 150–200 word narrative with hook, body, CTA.
2. **LinkedIn Carousel Outline**
   - Slide-by-slide captions + visuals description.
3. **Google Search Ads**
   - Minimum 3 headlines (≤30 chars) and 2 descriptions (≤90 chars) targeting workspace keywords.
4. **Email Nurture Sequence (3-touch)**
   - Subject lines, preview text, key bullets for each email (Intro story, Workflow deep dive, CTA reminder).
5. **Technical Blog Cross-Post Outline**
   - H1, section breakdown, key takeaways referencing InlineUXTip.
6. **Short Demo Video Script**
   - 60–90 sec script with scene-by-scene notes.
7. **Retargeting Display Copy**
   - 2–3 banner tagline options + CTA phrases.

Provide recommended UTMs and asset dependencies (screenshots, animations) for marketing.

## Output Format

Deliver a single response structured with clear headings:

1. **Landing Page Copy** – include subheadings for each module.
2. **SEO & Analytics** – consolidated section.
3. **Production Checklist** – table with status.
4. **Marketing Deliverables** – subsections per channel.
5. **Open Questions / Dependencies** – list any follow-ups (design, compliance, stats validation).

Ensure copy stays consistent with the liberty/ownership narrative from `plans/seed.md`, citing exact phrases where required. Mention any assumptions or decisions made. Do not execute implementation; provide ready-to-use copy and instructions. Reply with your execution plan for approval before proceeding and wait for explicit go-ahead.
