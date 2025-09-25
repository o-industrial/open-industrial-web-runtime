import { JSX } from 'preact';

export function HeroBackdrop(): JSX.Element {
  return (
    <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
      <div class='absolute left-1/2 top-[-10%] h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.34),_rgba(255,255,255,0)_78%)] blur-[170px]' />
      <div class='absolute inset-x-24 bottom-[-30%] h-[26rem] rounded-full bg-[conic-gradient(from_130deg,_rgba(34,211,238,0.26),_rgba(129,140,248,0.16),_rgba(236,72,153,0.18),_rgba(255,255,255,0))] blur-[180px]' />
    </div>
  );
}

export function ProductSpotlightBackdrop(): JSX.Element {
  return (
    <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
      <div class='absolute inset-y-0 left-0 w-full bg-[linear-gradient(110deg,_rgba(11,15,35,0.95)_0%,_rgba(11,18,40,0.85)_48%,_rgba(7,12,29,0.6)_70%,_rgba(7,12,29,0)_100%)]' />
      <div class='absolute left-[32%] top-[-18%] h-[26rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.28),_rgba(255,255,255,0)_82%)] blur-[220px]' />
      <div class='absolute right-[-6%] bottom-[-25%] h-[24rem] w-[28rem] rounded-full bg-[conic-gradient(from_140deg,_rgba(129,140,248,0.28),_rgba(236,72,153,0.18),_rgba(34,211,238,0.24),_rgba(255,255,255,0))] blur-[210px]' />
    </div>
  );
}

export function UnifiedMetricsBackdrop(): JSX.Element {
  return (
    <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
      <div class='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),_rgba(10,12,24,0)),radial-gradient(circle_at_bottom,_rgba(34,211,238,0.12),_rgba(8,12,24,0)),linear-gradient(160deg,_rgba(9,11,22,0.95),_rgba(6,8,18,0.95))]' />
    </div>
  );
}

export function AIConversationsBackdrop(): JSX.Element {
  return (
    <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
      <div class='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.2),_rgba(7,9,18,0)),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.15),_rgba(6,9,18,0)),linear-gradient(140deg,_rgba(9,11,22,0.95),_rgba(4,6,14,0.9))]' />
    </div>
  );
}
export function StrategicPillarsBackdrop(): JSX.Element {
  return (
    <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
      <div class='absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' />
      <div class='absolute left-1/2 top-[-20%] h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(129,140,248,0.28),_rgba(255,255,255,0)_78%)] blur-[160px]' />
      <div class='absolute inset-x-24 bottom-[-30%] h-[20rem] rounded-full bg-[conic-gradient(from_150deg,_rgba(34,211,238,0.22),_rgba(56,189,248,0.14),_rgba(76,29,149,0.24),_rgba(255,255,255,0))] blur-[160px]' />
    </div>
  );
}

export function IntegrationEcosystemBackdrop(): JSX.Element {
  return (
    <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
      <div class='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),rgba(9,12,24,0.92)),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.12),rgba(8,12,24,0.9)),linear-gradient(150deg,rgba(8,11,24,0.98),rgba(12,16,32,0.94))]' />
    </div>
  );
}

export function UnifiedFlowBackdrop(): JSX.Element {
  return (
    <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
      <div class='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.12),rgba(11,15,32,0.92)),radial-gradient(circle_at_bottom,_rgba(34,211,238,0.12),rgba(11,15,32,0.9)),linear-gradient(160deg,rgba(9,12,26,0.96),rgba(6,10,22,0.94))]' />
    </div>
  );
}

export function SharedTruthBackdrop(): JSX.Element {
  return (
    <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
      <div class='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),rgba(9,11,24,0.9)),linear-gradient(155deg,rgba(8,11,24,0.97),rgba(13,17,33,0.94))]' />
    </div>
  );
}

export function GovernedDeploymentBackdrop(): JSX.Element {
  return (
    <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
      <div class='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.14),rgba(9,12,24,0.9)),linear-gradient(150deg,rgba(8,11,24,0.97),rgba(15,23,42,0.94))]' />
    </div>
  );
}

export function ReadyCtaBackdrop(): JSX.Element {
  return (
    <div aria-hidden='true' class='pointer-events-none absolute inset-0'>
      <div class='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.16),rgba(11,16,32,0.92)),linear-gradient(140deg,rgba(8,11,24,0.98),rgba(14,18,36,0.95))]' />
      <div class='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10' />
    </div>
  );
}
