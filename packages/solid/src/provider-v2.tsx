/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AssetList, Chain } from '@chain-registry/types';
import {
  ChainWalletData,
  EndpointOptions,
  MainWalletBase,
  ModalVersion,
  SessionOptions,
  SignerOptions,
  WalletManagerV2,
  WalletModalPropsV2,
  WalletRepo,
} from '@cosmos-kit/core';
import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  ParentProps,
  ParentComponent,
} from 'solid-js';

import { DefaultModalV2 } from '.';
import { getModalV2 } from './modal';

export const walletContextV2 = createContext<{
  walletManager: WalletManagerV2;
}>();

export const ChainProvider = ({
  chains,
  assetLists,
  wallets,
  walletModal,
  modalTheme,
  signerOptions,
  // viewOptions,
  endpointOptions,
  sessionOptions,
  children,
}: ParentProps<{
  chains: Chain[];
  assetLists: AssetList[];
  wallets: MainWalletBase[];
  walletModal?: ModalVersion | ((props: WalletModalPropsV2) => JSX.Element);
  modalTheme?: Record<string, any>;
  signerOptions?: SignerOptions;
  // viewOptions?: ViewOptions;
  endpointOptions?: EndpointOptions;
  sessionOptions?: SessionOptions;
}>) => {
  const walletManager = createMemo(
    () =>
      new WalletManagerV2(
        chains,
        assetLists,
        wallets,
        signerOptions,
        endpointOptions,
        sessionOptions
      ),
    []
  );

  const [ isViewOpen, setViewOpen ] = createSignal(false);
  const [ viewWalletRepo, setViewWalletRepo ] = createSignal<WalletRepo>();

  walletManager().walletRepos.forEach((wr) => {
    const [ , setData ] = createSignal<ChainWalletData>();
    const [ state, setState ] = createSignal(wr.state);
    const [ msg, setMsg ] = createSignal<string>();

    wr.setActions({
      viewOpen: setViewOpen,
      viewWalletRepo: setViewWalletRepo,
    });
    wr.wallets.forEach((w) => {
      w.setActions({
        data: setData,
        state: setState,
        message: setMsg,
      });
    });
  });

  const Modal = createMemo(
    () => {
      if (!walletModal) {
        return DefaultModalV2;
      }
    }
  )

}