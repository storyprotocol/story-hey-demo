import { OpenAction } from '@hey/data/enums';
import { type FC } from 'react';
import { useOpenActionStore } from 'src/store/non-persisted/publication/useOpenActionStore';

import TipConfig from './Config/Tip';
import IntellectualPropertyConfig from "@components/Composer/Actions/OpenActionSettings/Config/IntellectualProperty";

const OpenActionsConfig: FC = () => {
  const selectedOpenAction = useOpenActionStore(
    (state) => state.selectedOpenAction
  );

  return (
    <div>
      <div>{selectedOpenAction === OpenAction.Tip && <TipConfig />}</div>
      <div>{selectedOpenAction === OpenAction.IntellectualProperty && <IntellectualPropertyConfig />}</div>
    </div>
  );
};

export default OpenActionsConfig;
