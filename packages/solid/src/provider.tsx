/* eslint-disable @typescript-eslint/no-unused-vars */
import { AssetList, Chain } from '@chain-registry/types';
import {
  ChainName,
  EndpointOptions,
  MainWalletBase,
  MainWalletData,
  ModalVersion,
  SessionOptions,
  SignerOptions,
  StorageOptions,
  ViewOptions,
  WalletManager,
  WalletName,
} from '@cosmos-kit/core';
import { WalletModalProps } from '@cosmos-kit/core';
import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  ParentProps,
  ParentComponent,
} from 'solid-js';

import { DefaultModal } from '.';
import { getModal } from './modal';

export const walletContext = createContext<{
  walletManager: WalletManager;
}>();

export const WalletProvider = ({
  chains,
  assetLists,
  wallets,
  walletModal,
  signerOptions,
  viewOptions,
  endpointOptions,
  storageOptions,
  sessionOptions,
  children,
}: ParentProps<{
  chains: Chain[];
  assetLists: AssetList[];
  wallets: MainWalletBase[];
  walletModal?:
  | ModalVersion
  | (({ isOpen, setOpen }: WalletModalProps) => JSX.Element);
  signerOptions?: SignerOptions;
  viewOptions?: ViewOptions;
  endpointOptions?: EndpointOptions;
  storageOptions?: StorageOptions;
  sessionOptions?: SessionOptions;
}>) => {
  const walletManager = createMemo(
    () => new WalletManager(
      chains,
      assetLists,
      wallets,
      signerOptions,
      viewOptions,
      endpointOptions,
      storageOptions,
      sessionOptions,
    ),
    []
  );

  const [ walletData, setWalletData ] = createSignal<MainWalletData>();
  const [ walletState, setWalletState ] = createSignal(walletManager().state);
  const [ walletMsg, setWalletMsg ] = createSignal<string>();
  const [ walletName, setWalletName ] = createSignal<WalletName>(
    walletManager().currentWalletName
  );

  const [ isViewOpen, setViewOpen ] = createSignal(false);
  const [ chainName, setChainName ] = createSignal<ChainName>();
  const [ qrUrl, setQRUrl ] = createSignal<string>();

  walletManager().setActions({
    data: setWalletData,
    state: setWalletState,
    message: setWalletMsg,
    walletName: setWalletName,
    viewOpen: setViewOpen,
    chainName: setChainName,
    qrUrl: setQRUrl,
  });

}