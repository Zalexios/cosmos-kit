import { preferredEndpoints } from './config';
import { omniMobileInfo, OmniMobileWallet } from './wallet-connect';

const omniMobile = new OmniMobileWallet(omniMobileInfo, preferredEndpoints);

export const wallets = [omniMobile];
export const walletNames = wallets.map((wallet) => wallet.walletName);
