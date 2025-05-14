import { IntentTypes } from '@o-industrial/common/types';
import { SystemMindset } from '../../../molecules/writing-devices/SystemMindset.tsx';
import { AziInnerVoice } from '../../../molecules/writing-devices/AziInnerVoice.tsx';

export default function ExecutionLogPreview() {
  return (
    <section class='flex flex-col items-center text-center px-6 py-24 space-y-6'>
      <h2 class='text-3xl md:text-4xl font-bold text-white'>
        What Just Ran
      </h2>
      <p class='text-lg text-neutral-300 max-w-xl mx-auto'>
        This wasn’t a webhook. It wasn’t a poller. It was structure-governed logic — running exactly
        when it should.
      </p>

      <div class='bg-neutral-800/50 border border-white/10 rounded-xl p-6 text-left font-mono text-sm leading-relaxed max-w-2xl mx-auto shadow-xl text-white'>
        <pre>
          <code>
{`🔹 Impulse received: Temperature = 84.2°F
🔸 Agent matched: FanControlAgent
⚙️  Command issued: turn_on → fan-controller-001
✅  Result: Fan turned on — Temp exceeded threshold by 12°F`}
          </code>
        </pre>
      </div>

      <SystemMindset intentType={IntentTypes.Primary}>
        That wasn’t automation. That was governance. Your system ran logic you promoted — and only
        when it matched.
      </SystemMindset>

      <AziInnerVoice intentType={IntentTypes.Tertiary}>
        I didn’t guess. I didn’t assume. I responded to a schema you authored — and a state that
        confirmed it.
      </AziInnerVoice>
    </section>
  );
}
