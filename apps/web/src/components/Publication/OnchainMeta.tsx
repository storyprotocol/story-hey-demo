import type { MirrorablePublication } from '@hey/lens';
import type { FC } from 'react';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import {
  ALCHEMY_MUMBAI_API,
  ARWEAVE_GATEWAY,
  IPFS_GATEWAY,
  IS_MAINNET,
  POLYGONSCAN_URL,
  STORY_PROTOCOL_EXPLORER_URL
} from '@hey/data/constants';
import { VerifiedOpenActionModules } from '@hey/data/verified-openaction-modules';
import { Card } from '@hey/ui';
import Link from 'next/link';
import { useState } from 'react';
import urlcat from 'urlcat';
import { createPublicClient, decodeEventLog, http, parseAbi } from 'viem';
import { polygon, polygonMumbai } from 'viem/chains';

interface MetaProps {
  hash: string;
  name: string;
  uri: string;
}

const Meta: FC<MetaProps> = ({ hash, name, uri }) => (
  <div className="px-5 py-3">
    <Link
      className="space-y-1"
      href={uri}
      rel="noreferrer noopener"
      target="_blank"
    >
      <div className="flex items-center space-x-1">
        <div className="text-[10px]">{name}</div>
        <ArrowTopRightOnSquareIcon className="size-4" />
      </div>
      <div className="truncate text-xs">{hash}</div>
    </Link>
  </div>
);

interface OnchainMetaProps {
  publication: MirrorablePublication;
}

const OnchainMeta: FC<OnchainMetaProps> = ({ publication }) => {
  const [storyProof, setStoryProof] = useState('LOADING');

  const hash = publication.metadata.rawURI?.split('/').pop();
  const isArweaveHash = hash?.length === 43;
  const isIPFSHash = hash?.length === 46 || hash?.length === 59;
  const isIntellectualProperty = !!publication.openActionModules.find(
    (module) =>
      module.contract.address === VerifiedOpenActionModules.IntellectualProperty
  );

  if (!isArweaveHash && !isIPFSHash && !isIntellectualProperty) {
    return null;
  }

  const client = createPublicClient({
    chain: IS_MAINNET ? polygon : polygonMumbai,
    transport: http(ALCHEMY_MUMBAI_API)
  });

  client
    .getTransactionReceipt({ hash: publication.txHash })
    .then((txReceipt) => {
      for (const log of txReceipt.logs) {
        try {
          const targetLog = decodeEventLog({
            abi: parseAbi(['event IPAssetMinted(address, uint256, uint256)']),
            data: log.data,
            eventName: 'IPAssetMinted',
            topics: log.topics
          });
          setStoryProof(`${targetLog.args[0]}:${targetLog.args[1].toString()}`);
          break;
        } catch (error) {}
      }
    });

  return (
    <Card as="aside">
      <div className="ld-text-gray-500 divide-y dark:divide-gray-700">
        {isArweaveHash ? (
          <Meta
            hash={hash}
            name="ARWEAVE TRANSACTION"
            uri={urlcat(`${ARWEAVE_GATEWAY}:hash`, { hash })}
          />
        ) : null}
        {publication?.momoka?.proof ? (
          <Meta
            hash={publication.momoka.proof?.split('/').pop() as string}
            name="MOMOKA PROOF"
            uri={`https://momoka.lens.xyz/tx/${publication.momoka.proof
              ?.split('/')
              .pop()}`}
          />
        ) : null}
        {isIPFSHash ? (
          <Meta
            hash={hash}
            name="IPFS TRANSACTION"
            uri={`${IPFS_GATEWAY}${hash}`}
          />
        ) : null}
        {publication?.txHash ? (
          <Meta
            hash={publication.txHash}
            name="TRANSACTION"
            uri={`${POLYGONSCAN_URL}/tx/${publication.txHash
              ?.split('/')
              .pop()}`}
          />
        ) : null}
        {isIntellectualProperty ? (
          <Meta
            hash={storyProof}
            name="STORY PROTOCOL PROOF"
            uri={`${STORY_PROTOCOL_EXPLORER_URL}/transactions/${publication.txHash}`}
          />
        ) : null}
      </div>
    </Card>
  );
};

export default OnchainMeta;
