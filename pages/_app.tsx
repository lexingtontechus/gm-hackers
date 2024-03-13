import type { AppProps } from "next/app";
import {
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  useColorMode,
} from "@chakra-ui/react";
import { cookieStorage, createStorage, WagmiProvider, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { theme } from "../styles/theme";
import Footer from "../components/core/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { createWeb3Modal } from "@web3modal/wagmi/react";

import { initWeb3InboxClient } from "@web3inbox/react";

import { ThemeStore } from "../utils/themeStore";
import { useEffect } from "react";
import Layout from "../components/Layout";
import DevTimeStamp from "../components/DevTimeStamp";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
export const wagmiConfig = defaultWagmiConfig({
  chains: [mainnet], // required
  projectId, // required
  metadata, // required
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
});

{
  /*const wagmiConfig = defaultWagmiConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  projectId,
  metadata: {
    name: "GM Hackers",
    description: "GM Hackers",
    url: "https://gm-hackers.lexingtontech.us/",
    icons: ["/favicon.ico"],
    //   verifyUrl: "https://hackers.gm.walletconnect.com/",
  },
});
*/
}
const queryClient = new QueryClient();

initWeb3InboxClient({
  projectId,
  domain: appDomain,
  allApps: process.env.NODE_ENV !== "production",
});

const modal = createWeb3Modal({
  wagmiConfig,
  projectId,
  enableAnalytics: true,
});

ThemeStore.setModal(modal);

function MyApp({ Component, pageProps }: AppProps) {
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (ThemeStore.state.modal) {
      ThemeStore.state.modal.setThemeMode(colorMode);
    }
  }, [colorMode]);

  return (
    <ChakraProvider theme={theme}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <DevTimeStamp />
            <Component {...pageProps} />
            <GridItem area={"footer"}>
              <Footer />
            </GridItem>
          </Layout>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}

export default MyApp;
