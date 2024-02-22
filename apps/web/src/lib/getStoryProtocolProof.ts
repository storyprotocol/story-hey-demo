import type { Address } from 'viem';

import { ALCHEMY_MUMBAI_API, IS_MAINNET } from '@hey/data/constants';
import { createPublicClient, decodeEventLog, http, parseAbi } from 'viem';
import { polygon, polygonMumbai } from 'viem/chains';

const client = createPublicClient({
  chain: IS_MAINNET ? polygon : polygonMumbai,
  transport: http(ALCHEMY_MUMBAI_API)
});

const cacheMap: Record<string, string> = {};

const getStoryProtocolProof = async (txHash: Address) => {
  if (cacheMap[txHash]) {
    return cacheMap[txHash];
  }

  const txReceipt = await client.getTransactionReceipt({ hash: txHash });
  for (const log of txReceipt.logs) {
    try {
      const targetLog = decodeEventLog({
        abi: parseAbi(['event IPAssetMinted(address, uint256, uint256)']),
        data: log.data,
        eventName: 'IPAssetMinted',
        topics: log.topics
      });
      const proof = `${targetLog.args[0]}:${targetLog.args[1].toString()}`;
      cacheMap[txHash] = proof;
      return proof;
    } catch (error) {}
  }

  return 'UNKNOWN';
};

export default getStoryProtocolProof;
