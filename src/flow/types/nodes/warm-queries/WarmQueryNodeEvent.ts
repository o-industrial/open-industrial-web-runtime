import { BaseNodeEvent } from '../../react/BaseNodeEvent.ts';

export type WarmQueryNodeEvent = BaseNodeEvent & {
  Type: 'manage' | 'preview';
};
