import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import { Provider } from "@/components/ui/provider";
import { Wallet, NearContext } from "@/wallets/near";
import { NetworkId, FusionFundContract } from "@/config";
import Script from "next/script";
import { UserContextProvider } from "@/context";
import { Toaster } from "react-hot-toast";

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
    <UserContextProvider>
      <NearContext.Provider value={{ wallet, signedAccountId }}>
        <Provider>
          <Script
            src="https://telegram.org/js/telegram-web-app.js"
            strategy="lazyOnload"
            onLoad={() => {
              if (window.Telegram) {
                window.Telegram.WebApp.ready();
                window.Telegram.WebApp.expand();
              }
            }}
          />
          <Toaster
            toastOptions={{
              className: "",
              style: {
                border: `1px solid #AC6AFF`,
                padding: "16px",
                color: "#AC6AFF",
                backgroundColor: "#FFC876",
                borderRadius: "8px",
                fontFamily: "Arial, sans-serif",
              },
            }}
          />
          <Component {...pageProps} />
        </Provider>
      </NearContext.Provider>
    </UserContextProvider>
  );
}
