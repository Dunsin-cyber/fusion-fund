import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import { Provider } from "@/components/ui/provider";
import { Wallet, NearContext } from "@/wallets/near";
import { NetworkId, FusionFundContract } from "@/config";
import Script from "next/script";

const wallet = new Wallet({
  networkId: NetworkId,
  createAccessKeyFor: FusionFundContract,
});

export default function MyApp({ Component, pageProps }) {
  const [signedAccountId, setSignedAccountId] = useState("");

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <Provider>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="lazyOnload"
          onLoad={() => {
            if (window.Telegram) {
              window.Telegram.WebApp.ready();
              window.Telegram.WebApp.expand();
              window.Telegram.WebApp.initData();
            }
          }}
        />
        {/* <Navigation /> */}
        <Component {...pageProps} />
      </Provider>
    </NearContext.Provider>
  );
}
