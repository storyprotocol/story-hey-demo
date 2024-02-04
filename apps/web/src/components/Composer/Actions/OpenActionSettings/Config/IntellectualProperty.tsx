import ToggleWithHelper from '@components/Shared/ToggleWithHelper';
import { VerifiedOpenActionModules } from '@hey/data/verified-openaction-modules';
import { Input, Radio } from '@hey/ui';
import uploadToArweave from '@lib/uploadToArweave';
import { type FC } from 'react';
import { useOpenActionStore } from 'src/store/non-persisted/publication/useOpenActionStore';
import { useEffectOnce } from 'usehooks-ts';
import { encodeAbiParameters } from 'viem';
import { create } from 'zustand';

import SaveOrCancel from '../SaveOrCancel';

interface IntellectualPropertyActionState {
  authorName: string;
  enabled: boolean;
  isCommercialActivity: boolean;
  postName: string;
  reset: () => void;
  setAuthorName: (authorName: string) => void;
  setEnabled: (enabled: boolean) => void;
  setIsCommercialActivity: (isCommercialActivity: boolean) => void;
  setPostName: (postName: string) => void;
}

const useIntellectualPropertyActionStore =
  create<IntellectualPropertyActionState>((set) => ({
    authorName: '',
    enabled: false,
    isCommercialActivity: true,
    postName: '',
    reset: () =>
      set({
        authorName: '',
        enabled: false,
        isCommercialActivity: true,
        postName: ''
      }),
    setAuthorName: (authorName: string) => set({ authorName }),
    setEnabled: (enabled) => set({ enabled }),
    setIsCommercialActivity: (isCommercialActivity) =>
      set({ isCommercialActivity }),
    setPostName: (postName: string) => set({ postName })
  }));

const IntellectualPropertyConfig: FC = () => {
  const buildOpenAction = useOpenActionStore((state) => state.buildOpenAction);
  const setShowModal = useOpenActionStore((state) => state.setShowModal);
  const setBuildOpenAction = useOpenActionStore(
    (state) => state.setBuildOpenAction
  );
  const {
    authorName,
    enabled,
    isCommercialActivity,
    postName,
    reset,
    setAuthorName,
    setEnabled,
    setIsCommercialActivity,
    setPostName
  } = useIntellectualPropertyActionStore();

  useEffectOnce(() => {
    if (!buildOpenAction) {
      reset();
    }
  });

  const onSave = () => {
    if (enabled) {
      let licenseType = 'SocialRemix';
      if (isCommercialActivity) {
        licenseType = 'CommercialActivity';
      }

      let newPostName = postName;
      if (newPostName == '') {
        newPostName = 'an awesome post';
      }

      let newAuthorName = authorName;
      if (newAuthorName == '') {
        newAuthorName = 'stranger';
      }

      setBuildOpenAction(async (params) => {
        const arweaveId = await uploadToArweave({
          // todo
        });

        return {
          address: VerifiedOpenActionModules.IntellectualProperty,
          data: encodeAbiParameters(
            [
              { name: 'postName', type: 'string' },
              { name: 'authorName', type: 'string' },
              { name: 'licenseType', type: 'string' },
              { name: 'arweaveId', type: 'string' }
            ],
            [
              newPostName,
              newAuthorName,
              licenseType,
              'https://gateway.irys.xyz/' + arweaveId
            ]
          )
        };
      });
    }

    setShowModal(false);
  };

  return (
    <div>
      <div className="p-5">
        <ToggleWithHelper
          description="This will register your post as intellectual property on Story Protocol. Youwill be able to set terms of use in a decentralized way."
          heading="Register post as intellectual property"
          on={enabled}
          setOn={() => {
            setEnabled(!enabled);
            setIsCommercialActivity(true);
            if (enabled) {
              reset();
            }
          }}
        />
      </div>
      {enabled && (
        <>
          <div className="divider" />
          <div className="p-5">
            <div>
              <div className="mb-4">
                <div className="mt-0">
                  <Input
                    onChange={(e) => setPostName(e.target.value)}
                    placeholder="Name of the post"
                    type="text"
                    value={postName}
                  />
                </div>
                <div className="mt-4">
                  <Input
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Official author name (default: @andrea)"
                    type="text"
                    value={authorName}
                  />
                </div>
              </div>
              <b>Team of Use</b>
              <div className="mt-3 space-y-5">
                <Radio
                  checked={isCommercialActivity}
                  description="Retain full control over reuse of your work, while allowing anyone to appropriately use the work in exchange for a fair reward."
                  heading={<b>Commercial Activity</b>}
                  onChange={() => {
                    setIsCommercialActivity(true);
                  }}
                />
                <Radio
                  checked={!isCommercialActivity}
                  description="Let the world play with your IP. This license allows for endless remixing while tracking all the uses of your work and giving you full credit."
                  heading={<b>Social Remixing</b>}
                  onChange={() => {
                    setIsCommercialActivity(false);
                  }}
                />
              </div>
            </div>
            <SaveOrCancel
              onSave={onSave}
              saveDisabled={postName.length === 0}
            />
          </div>
        </>
      )}
      {!enabled && (
        <div className="p-5 pt-0">
          <div className="mb-4 text-sm">
            <p>
              <img
                alt="protect"
                className="mr-2 inline size-6"
                src="/assets/open-action/checked.svg"
              />
              Protect your Intellectual Property
            </p>
            <p>
              <img
                alt="protect"
                className="mr-2 inline size-6"
                src="/assets/open-action/checked.svg"
              />
              Prove ownership and attribution
            </p>
            <p>
              <img
                alt="protect"
                className="mr-2 inline size-6"
                src="/assets/open-action/checked.svg"
              />
              Decide how others can use your work
            </p>
          </div>
          <div className="mb-4 mt-8 text-sm">
            <div className="flex">
              <div>
                <img
                  alt="protect"
                  className="mr-2 inline size-10"
                  src="/assets/open-action/story-logo.svg"
                />
              </div>
              <div>
                <p>
                  Stored and secured on the Story Protocol Global IP Registry
                </p>
                <p className="text-gray-400">
                  <a
                    href="//storyprotocol.xyz"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Learn more at storyprotocol.xyz
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntellectualPropertyConfig;
