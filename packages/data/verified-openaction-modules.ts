import { IS_MAINNET } from './constants';

export const VerifiedOpenActionModules = {
  IntellectualProperty: IS_MAINNET
    ? '0x0000000000000000000000000000000000000000'
    : '0x3bba5cb819b820024de711074291384fc49a6926',
  Tip: IS_MAINNET
    ? '0x22cb67432C101a9b6fE0F9ab542c8ADD5DD48153'
    : '0x6111e258a6d00d805DcF1249900895c7aA0cD186'
};
