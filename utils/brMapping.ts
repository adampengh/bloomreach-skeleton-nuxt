import type { BrMapping } from '@bloomreach/vue-sdk';

import { BrComponentDetails } from '#components';
import { TYPE_CONTAINER_ITEM_UNDEFINED } from '@bloomreach/spa-sdk';

export const brMapping: BrMapping = {
  [TYPE_CONTAINER_ITEM_UNDEFINED]: BrComponentDetails
};