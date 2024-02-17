import packageJson from '../../package.json';
import LensEndpoint from './lens-endpoints';
import getEnvConfig from './utils/getEnvConfig';

// Environments
export const IS_PRODUCTION = process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true';

// Lens and Hey Env Config
export const LENS_NETWORK = process.env.NEXT_PUBLIC_LENS_NETWORK || 'mainnet';

export const LENS_API_URL = getEnvConfig().lensApiEndpoint;
export const HEY_API_URL = IS_PRODUCTION
  ? getEnvConfig().heyApiEndpoint
  : 'http://localhost:4784';
export const LENSHUB_PROXY = getEnvConfig().lensHubProxyAddress;
export const TOKEN_HANDLE_REGISTRY = getEnvConfig().tokenHandleRegistry;
export const PUBLICACT_PROXY = getEnvConfig().publicActProxyAddress;
export const DEFAULT_COLLECT_TOKEN = getEnvConfig().defaultCollectToken;

export const IS_MAINNET = LENS_API_URL === LensEndpoint.Mainnet;
export const ADDRESS_PLACEHOLDER = '0x03Ba3...7EF';

// Application
export const APP_NAME = 'Hey';
export const DESCRIPTION = `${APP_NAME}.xyz is a decentralized, and permissionless social media app built with Lens Protocol 🌿`;
export const APP_VERSION = packageJson.version;
export const BRAND_COLOR = '#FB3A5D';

// Git
export const GIT_COMMIT_SHA =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7);

// Misc
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const REWARDS_ADDRESS = '0xf618330f51fa54ce5951d627ee150c0fdadeba43';
export const TEST_WALLET_ADDRESS = '0xb9C6e304545386E95d5c4ab183EE97A13555A49d';
export const TEST_PK =
  '0x8b33302ca865bc1ed65bc02b71dd02067bd3dae3da2f8bb0d95b16509e9ac71e';
export const TEST_LENS_ID = '0x0383';
export const ZERO_PUBLICATION_ID = '0x00-0x00';
export const HANDLE_PREFIX = IS_MAINNET ? 'lens/' : 'test/';

// URLs
export const STATIC_ASSETS_URL = 'https://hey-assets.b-cdn.net';
export const STATIC_IMAGES_URL = `${STATIC_ASSETS_URL}/images`;
export const LENS_MEDIA_SNAPSHOT_URL =
  'https://ik.imagekit.io/lens/media-snapshot';
export const POLYGONSCAN_URL = IS_MAINNET
  ? 'https://polygonscan.com'
  : 'https://mumbai.polygonscan.com';
export const RARIBLE_URL = IS_MAINNET
  ? 'https://rarible.com'
  : 'https://testnet.rarible.com';
export const IPFS_GATEWAY = 'https://gw.ipfs-lens.dev/ipfs/';
export const ARWEAVE_GATEWAY = 'https://gateway.irys.xyz/';
export const EVER_API = 'https://endpoint.4everland.co';
export const DEFAULT_OG = `${STATIC_IMAGES_URL}/og/cover.png`;
export const PLACEHOLDER_IMAGE = `${STATIC_IMAGES_URL}/placeholder.webp`;

// Tokens / Keys
export const WALLETCONNECT_PROJECT_ID = 'cd542acc70c2b548030f9901a52e70c8';
export const GIPHY_KEY = 'yNwCXMKkiBrxyyFduF56xCbSuJJM8cMd';
export const GITCOIN_PASSPORT_KEY = 'xn9e7AFv.aEfS0ioNhaVtww1jdwnsWtxnrNHspVsS';
export const LIVEPEER_KEY = '70508bf8-2e16-4594-852d-5aed798f6403';
export const ALCHEMY_API_KEY = 'Xx-4a1SyWtS9U4h0cEuRmvgYtGeVOlv7';

// Named transforms for ImageKit
export const AVATAR = 'tr:w-250,h-250';
export const EXPANDED_AVATAR = 'tr:w-1000,h-1000';
export const COVER = 'tr:w-1500,h-500';
export const VIDEO_THUMBNAIL = 'tr:h-500';
export const ATTACHMENT = 'tr:w-500';

// S3 bucket
export const S3_BUCKET = {
  HEY_MEDIA: 'hey-media-haodi'
};

// Stripe Plans
export const Stripe = {
  BELIEVER: IS_MAINNET
    ? 'price_1OZmUnSDpi8e32ARLvegtMNT'
    : 'price_1OZmX0SDpi8e32ARfi8FsO87',
  PRO: IS_MAINNET
    ? 'price_1OGGizSDpi8e32ARC7Gh5ou5'
    : 'price_1OGGqhSDpi8e32AR5WawyjjM'
};

export const ALCHEMY_MUMBAI_API = IS_MAINNET
  ? `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  : `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;
export const STORY_PROTOCOL_EXPLORER_URL = IS_MAINNET
  ? 'https://explorer.storyprotocol.xyz'
  : 'https://am-explorer.storyprotocol.xyz';
