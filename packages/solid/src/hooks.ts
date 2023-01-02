import {
  ChainContext,
  ChainName,
  WalletManager,
  WalletStatus,
} from '@cosmos-kit/core';
import { useContext } from 'solid-js';
import { walletContext } from './provider';

export const useWallet = (): WalletManager => {
  const context = useContext(walletContext);

  if (!context || !context.walletManager) {
    throw new Error('You have forgot to use WalletProvider.');
  }

  return context.walletManager;
};

export const useChain = (chainName: ChainName): ChainContext => {
  const context = useContext(walletContext);

  if (!context) {
    throw new Error('You have forgot to use WalletProviderV2.');
  }

  const { walletManager } = context;
  const walletRepo = walletManager().getWalletRepo(chainName);
  walletRepo.isInUse = true;
  const {
    connect,
    disconnect,
    openView,
    closeView,
    current,
    chainRecord: { chain, assetList },
    getRpcEndpoint,
    getRestEndpoint,
    getStargateClient,
    getCosmWasmClient,
  } = walletRepo;

  const chainId = chain.chain_id;

}