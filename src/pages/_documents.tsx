import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html suppressHydrationWarning className="dark">
      <Head>
        <script
          src="https://telegram.org/js/telegram-web-app.js"
          async
          onLoad={() => {
            if (typeof window !== "undefined" && window.Telegram) {
              window.Telegram.WebApp.ready();
            }
          }}
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
