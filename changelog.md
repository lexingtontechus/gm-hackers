# Forked & Refactored from GM Hackers and Web3Inbox, 03/13/2024

## GM Hackers
https://hackers.gm.walletconnect.com/
https://github.com/WalletConnect/gm-hackers

## Web3inbox
https://github.com/WalletConnect/web3inbox-client/
https://web3inbox-client-lab.vercel.app/

# Refactor App.ts - /app/app.tx -> layout.ts

## defaultWagmiConfig
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react"
defaultWagmiConfig is no longer called from "@web3modal/wagmi/"

# Refactor Index.ts - /app/index -> page.ts

## Index.ts - /app/index
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config' -> import { defaultWagmiConfig } from '@web3modal/wagmi/react/

## Wagmi for SSR in export const config = defaultWagmiConfig
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),

## @web3inbox/react 
import { useInitWeb3InboxClient, useManageSubscription, useW3iAccount} from "@web3inbox/widget-react" ->
import { useWeb3InboxAccount, useSubscription, useWeb3InboxClient} from @web3inbox/react'

## Wagmi usePublicClient -> useClient
### import { useAccount, usePublicClient, useSignMessage } from "wagmi";
### const wagmiPublicClient = usePublicClient(); -> const wagmiPublicClient = useClient();
### const blockNumber = await wagmiPublicClient.getBlockNumber(); -> const blockNumber = await getBlockNumber(config);

