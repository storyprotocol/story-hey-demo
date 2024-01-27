import type {
  AnyPublication,
  UnknownOpenActionModuleSettings
} from '@hey/lens';
import type { FC } from 'react';

import { PUBLICATION } from '@hey/data/tracking';
import { VerifiedOpenActionModules } from '@hey/data/verified-openaction-modules';
import { isMirrorPublication } from '@hey/lib/publicationHelpers';
import { Button, Modal, Tooltip } from '@hey/ui';
import { Leafwatch } from '@lib/leafwatch';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { decodeAbiParameters } from 'viem';

interface IntellectualPropertyOpenActionProps {
  isFullPublication?: boolean;
  publication: AnyPublication;
}

const IntellectualPropertyOpenAction: FC<
  IntellectualPropertyOpenActionProps
> = ({ isFullPublication = false, publication }) => {
  const [showOpenActionModal, setShowOpenActionModal] = useState(false);
  const targetPublication = isMirrorPublication(publication)
    ? publication?.mirrorOn
    : publication;

  const module = targetPublication.openActionModules.find(
    (module) =>
      module.contract.address === VerifiedOpenActionModules.IntellectualProperty
  );

  if (!module) {
    return null;
  }

  const openActionSetting = module as UnknownOpenActionModuleSettings;

  const [postName, authorName, licenseType, arweaveId] = decodeAbiParameters(
    [
      { name: 'postName', type: 'string' },
      { name: 'authorName', type: 'string' },
      { name: 'licenseType', type: 'string' },
      { name: 'arweaveId', type: 'string' }
    ],
    openActionSetting.initializeCalldata
  );

  const iconClassName = isFullPublication
    ? 'w-[17px] sm:w-[20px]'
    : 'w-[15px] sm:w-[18px]';

  return (
    <>
      <div className="ld-text-gray-500">
        <motion.button
          aria-label="IntellectualProperty"
          className="rounded-full p-1.5 outline-offset-2 outline-gray-400 hover:bg-gray-300/20"
          onClick={() => {
            setShowOpenActionModal(true);
            Leafwatch.track(PUBLICATION.LENS_OPEN_ACTIONS.TIP.OPEN_TIP, {
              publication_id: publication.id
            });
          }}
          whileTap={{ scale: 0.9 }}
        >
          <Tooltip content="IntellectualProperty" placement="top" withDelay>
            <img
              alt="Intellectual Property"
              className={iconClassName}
              src="/assets/open-action/copygray.svg"
            />
          </Tooltip>
        </motion.button>
      </div>
      <Modal
        icon={
          <img
            alt="Intellectual Property"
            className="size-5"
            src="/assets/open-action/copyright.svg"
          />
        }
        onClose={() => setShowOpenActionModal(false)}
        show={showOpenActionModal}
        size="md"
        title="Intellectual Property"
      >
        <div className="p-6">
          <p className="inline text-xl">
            <span className="font-bold">{postName}</span> by {authorName}
          </p>
          <span className="block text-xs">
            is protected under the Story Protocol Universal Media License, with
            the following terms:
          </span>
          <div className="mt-1 flex pt-4">
            <div className="flex-1">
              <p className="mb-1 text-xs">You may:</p>
              <p>
                <img
                  alt="Intellectual Property"
                  className="inline"
                  src="/assets/open-action/checkgreen.svg"
                />
                <span className="pl-2 text-xs">Remix this work freely</span>
              </p>
              <p>
                <img
                  alt="Intellectual Property"
                  className="inline size-6"
                  src="/assets/open-action/checkgreen.svg"
                />
                <span className="pl-2 text-xs">
                  Use this work in your own work
                </span>
              </p>
              <p>
                <img
                  alt="Intellectual Property"
                  className="inline size-6"
                  src="/assets/open-action/checkgreen.svg"
                />
                <span className="pl-2 text-xs">
                  You must credit the author, {authorName}
                </span>
              </p>
            </div>
            <div className="flex-1">
              <p className="mb-1 text-xs">You may not:</p>
              <p>
                <img
                  alt="Intellectual Property"
                  className="inline"
                  src="/assets/open-action/closered.svg"
                />
                <span className="pl-2 text-xs">Resell this work</span>
              </p>
              <p>
                <img
                  alt="Intellectual Property"
                  className="inline size-6"
                  src="/assets/open-action/closered.svg"
                />
                <span className="pl-2 text-xs">
                  Use this work without crediting {authorName}
                </span>
              </p>
              <p>
                <img
                  alt="Intellectual Property"
                  className="inline size-6"
                  src="/assets/open-action/closered.svg"
                />
                <span className="pl-2 text-xs">Use in x, y, z ways</span>
              </p>
            </div>
          </div>
          <div className="mb-6 mt-6 flex">
            <img
              className="text-brand-500 size-8"
              src="/assets/open-action/story-logo.svg"
            />
            <div className="pl-2 text-xs">
              <span>
                Stored and secured on the Story Protocol Global IP Registry
              </span>
              <span className="block text-gray-400">
                Learn more at storyprotocol.xyz
              </span>
            </div>
          </div>
          <Button className="ml-auto block w-full text-[20px]" variant="danger">
            View on Story Protocol
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default IntellectualPropertyOpenAction;
