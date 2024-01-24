import type { FC } from 'react';

import { OpenAction } from '@hey/data/enums';
import { TipIcon } from '@hey/icons';
import {
  ScreenType,
  useOpenActionStore
} from 'src/store/non-persisted/publication/useOpenActionStore';

import OpenActionItem from './OpenActionItem';
import OpenActionsConfig from './OpenActionsConfig';
import SaveOrCancel from './SaveOrCancel';

const OpenActionsList: FC = () => {
  const setShowModal = useOpenActionStore((state) => state.setShowModal);
  const screen = useOpenActionStore((state) => state.screen);
  const selectedOpenAction = useOpenActionStore(
    (state) => state.selectedOpenAction
  );

  return (
    <div>
      {screen === ScreenType.List ? (
        <div className="p-5">
          <OpenActionItem
            description="Add ability to tip"
            icon={<TipIcon className="size-6" />}
            title="Tipping"
            type={OpenAction.Tip}
          />
          <OpenActionItem
            description="Define your intellectual property terms"
            icon={
              <img
                alt="Intellectual Property"
                className="mx-0.5 size-5"
                src="/assets/open-action/copyright.svg"
              />
            }
            title="Intellectual Property"
            type={OpenAction.IntellectualProperty}
          />
          <SaveOrCancel
            onSave={() => setShowModal(false)}
            saveDisabled={selectedOpenAction === null}
          />
        </div>
      ) : selectedOpenAction ? (
        <OpenActionsConfig />
      ) : null}
    </div>
  );
};

export default OpenActionsList;
