import { setupFastAuthWallet } from "near-fastauth-wallet";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { NetworkId } from "@/config";
// Initialize wallet selector
const selector = setupWalletSelector({
  network: NetworkId,
  modules: [
    setupFastAuthWallet({
      relayerUrl: "$RELAYER_URL",
      walletUrl: "$WALLET_URL",
    }),
  ],
});

// EITHER setup onClick function for login
const onCLick = () =>
  selector
    .then((selector: any) => selector.wallet("fast-auth-wallet"))
    .then((fastAuthWallet: any) =>
      fastAuthWallet.signIn({
        contractId: "$CONTRACT_ID",
        email: "<USERS_EMAIL_ADDRESS>",
        isRecovery: true,
      })
    );

// // OR setup onClick function for login
// const onCLick = () => selector.then((selector: any) => selector.wallet('fast-auth-wallet'))
//       .then((fastAuthWallet: any) =>
//         fastAuthWallet.signIn({
//           contractId: "$CONTRACT_ID",
//           email: "<USERS_EMAIL_ADDRESS>",
//           accountId: "<USERS_DESIRED_NEAR_ADDRESS>.near"
//           isRecovery: false,
//         }),);
