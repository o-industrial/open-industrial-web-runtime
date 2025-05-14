import { IntentTypes } from '@o-industrial/common/types';

export type NodePreset = {
  Type: string;
  Label: string;
  IconKey: string;
  Intent?: IntentTypes;
};
