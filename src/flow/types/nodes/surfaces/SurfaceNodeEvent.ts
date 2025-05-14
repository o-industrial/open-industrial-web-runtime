import { BaseNodeEvent } from '../../react/BaseNodeEvent.ts';

export type SurfaceNodeEvent = BaseNodeEvent & {
  Type: 'manage' | 'preview';
};
