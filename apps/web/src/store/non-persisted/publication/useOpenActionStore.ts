import type { OpenAction } from '@hey/data/enums';
import type { UnknownOpenActionModuleInput } from '@hey/lens';

import { create } from 'zustand';

export enum ScreenType {
  Config = 'CONFIG',
  List = 'LIST'
}

interface OpenActionBuildParams {
  arweaveId: string;
  content: string;
  profileName: string;
  title: string;
}

type BuildOpenActionFunc = (
  buildParams: OpenActionBuildParams
) => Promise<UnknownOpenActionModuleInput>;

interface OpenActionState {
  buildOpenAction?: BuildOpenActionFunc;
  openAction: null | UnknownOpenActionModuleInput;
  reset: () => void;
  screen: ScreenType;
  selectedOpenAction: null | OpenAction;
  setBuildOpenAction: (buildOpenAction: BuildOpenActionFunc) => void;
  setOpenAction: (openAction: UnknownOpenActionModuleInput) => void;
  setScreen: (screen: ScreenType) => void;
  setSelectedOpenAction: (selectedOpenAction: OpenAction) => void;
  setShowModal: (showModal: boolean) => void;
  showModal: boolean;
}

export const useOpenActionStore = create<OpenActionState>((set) => ({
  buildOpenAction: undefined,
  openAction: null,
  reset: () =>
    set({
      openAction: null,
      screen: ScreenType.List,
      selectedOpenAction: null
    }),
  screen: ScreenType.List,
  selectedOpenAction: null,
  setBuildOpenAction: (buildOpenAction) => set({ buildOpenAction }),
  setOpenAction: (openAction) => set({ openAction }),
  setScreen: (screen) => set({ screen }),
  setSelectedOpenAction: (selectedOpenAction) => set({ selectedOpenAction }),
  setShowModal: (showModal) => set({ showModal }),
  showModal: false
}));
