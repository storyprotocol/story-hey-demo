import type { AnyPublication } from '@hey/lens';
import type { FC } from 'react';

import IntellectualPropertyOpenAction from '@components/Publication/LensOpenActions/UnknownModule/IntellectualProperty';
import { VerifiedOpenActionModules } from '@hey/data/verified-openaction-modules';
import getPublicationViewCountById from '@hey/lib/getPublicationViewCountById';
import isOpenActionAllowed from '@hey/lib/isOpenActionAllowed';
import { isMirrorPublication } from '@hey/lib/publicationHelpers';
import stopEventPropagation from '@hey/lib/stopEventPropagation';
import { memo } from 'react';
import { useImpressionsStore } from 'src/store/non-persisted/useImpressionsStore';
import { useFeatureFlagsStore } from 'src/store/persisted/useFeatureFlagsStore';
import useProfileStore from 'src/store/persisted/useProfileStore';

import OpenAction from '../LensOpenActions';
import TipOpenAction from '../LensOpenActions/UnknownModule/Tip';
import Comment from './Comment';
import Like from './Like';
import Mod from './Mod';
import ShareMenu from './Share';
import Views from './Views';

interface PublicationActionsProps {
  publication: AnyPublication;
  showCount?: boolean;
}

const PublicationActions: FC<PublicationActionsProps> = ({
  publication,
  showCount = false
}) => {
  const targetPublication = isMirrorPublication(publication)
    ? publication.mirrorOn
    : publication;
  const currentProfile = useProfileStore((state) => state.currentProfile);
  const gardenerMode = useFeatureFlagsStore((state) => state.gardenerMode);
  const publicationViews = useImpressionsStore(
    (state) => state.publicationViews
  );
  const hasOpenAction = (targetPublication.openActionModules?.length || 0) > 0;

  const canMirror = currentProfile
    ? targetPublication.operations.canMirror
    : true;
  const canAct =
    hasOpenAction && isOpenActionAllowed(targetPublication.openActionModules);
  const views = getPublicationViewCountById(
    publicationViews,
    targetPublication.id
  );

  // Check if the publication has a tip module
  const canTip = targetPublication.openActionModules.some(
    (module) => module.contract.address === VerifiedOpenActionModules.Tip
  );

  // Check if the publication has an intellectual property module
  const canIntellectualProperty = targetPublication.openActionModules.some(
    (module) =>
      module.contract.address === VerifiedOpenActionModules.IntellectualProperty
  );

  return (
    <span
      className="-ml-2 mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 sm:gap-8"
      onClick={stopEventPropagation}
    >
      <Comment publication={targetPublication} showCount={showCount} />
      {canMirror ? (
        <ShareMenu publication={publication} showCount={showCount} />
      ) : null}
      <Like publication={targetPublication} showCount={showCount} />
      {canAct ? (
        <OpenAction publication={publication} showCount={showCount} />
      ) : null}
      {canTip ? (
        <TipOpenAction
          isFullPublication={showCount}
          publication={publication}
        />
      ) : null}
      {canIntellectualProperty ? (
        <IntellectualPropertyOpenAction
          isFullPublication={showCount}
          publication={publication}
        />
      ) : null}
      {views > 0 ? (
        <Views
          publicationId={targetPublication.id}
          showCount={showCount}
          views={views}
        />
      ) : null}
      {gardenerMode ? (
        <Mod
          isFullPublication={showCount}
          publicationId={targetPublication.id}
        />
      ) : null}
    </span>
  );
};

export default memo(PublicationActions);
