import { useReactFlow } from 'reactflow';
import { IntentTypes } from '../../../../src/types/IntentTypes.ts';
import { Action, ActionStyleTypes } from '../../atoms/Action.tsx';

import { ZoomInIcon } from '../../../../build/iconset/icons/ZoomInIcon.tsx';
import { ZoomOutIcon } from '../../../../build/iconset/icons/ZoomOutIcon.tsx';
import { ResetZoomIcon } from '../../../../build/iconset/icons/ResetZoomIcon.tsx';
import { FitViewIcon } from '../../../../build/iconset/icons/FitViewIcon.tsx';
import { MapIcon } from '../../../../build/iconset/icons/MapIcon.tsx';
import { MapPinnedIcon } from '../../../../build/iconset/icons/MapPinnedIcon.tsx';

export type FlowControlsProps = {
  zoomIntent?: IntentTypes;
  resetIntent?: IntentTypes;
  fitIntent?: IntentTypes;
  mapIntent?: IntentTypes;
  showMap?: boolean;
  onToggleMap?: (next: boolean) => void;
};

export function FlowControls({
  zoomIntent = IntentTypes.Info,
  resetIntent = IntentTypes.Info,
  fitIntent = IntentTypes.Info,
  mapIntent = IntentTypes.Tertiary,
  showMap = true,
  onToggleMap,
}: FlowControlsProps) {
  const { zoomIn, zoomOut, fitView, setViewport } = useReactFlow();

  return (
    <div class="mt-2 flex flex-row items-center justify-center gap-2 px-2 py-1 bg-neutral-900/80 backdrop-blur-sm border border-neutral-700 rounded-md shadow-sm">
      <Action
        styleType={ActionStyleTypes.Icon | ActionStyleTypes.Thin}
        intentType={zoomIntent}
        onClick={() => zoomIn()}
        title="Zoom In"
      >
        <ZoomInIcon class="w-6 h-6" />
      </Action>

      <Action
        styleType={ActionStyleTypes.Icon | ActionStyleTypes.Thin}
        intentType={zoomIntent}
        onClick={() => zoomOut()}
        title="Zoom Out"
      >
        <ZoomOutIcon class="w-6 h-6" />
      </Action>

      <Action
        styleType={ActionStyleTypes.Icon | ActionStyleTypes.Thin}
        intentType={fitIntent}
        onClick={() => fitView()}
        title="Fit View"
      >
        <FitViewIcon class="w-6 h-6" />
      </Action>

      <Action
        styleType={ActionStyleTypes.Icon | ActionStyleTypes.Thin}
        intentType={resetIntent}
        onClick={() => setViewport({ x: 0, y: 0, zoom: 1.2 })}
        title="Reset Zoom"
      >
        <ResetZoomIcon class="w-6 h-6" />
      </Action>

      <Action
        styleType={ActionStyleTypes.Icon | ActionStyleTypes.Thin}
        intentType={mapIntent}
        onClick={() => onToggleMap?.(!showMap)}
        title={showMap ? 'Hide Mini Map' : 'Show Mini Map'}
      >
        {showMap ? (
          <MapPinnedIcon class="w-6 h-6" />
        ) : (
          <MapIcon class="w-6 h-6" />
        )}
      </Action>
    </div>
  );
}
