import { ReactNode } from 'react';
import {
  BSC,
  BSCTestnet,
  ChainId,
  DAppProvider,
  Mainnet,
  Ropsten,
} from '@usedapp/core';

export const Shibuya = {
  chainId: 81,
  chainName: 'Shibuya',
  isTestChain: true,
  isLocalChain: false,
  multicallAddress: '0x5FA712069F62c62eA73a7F8e2A4bdec11c2BfeF7',
  getExplorerAddressLink: (address: string) =>
    `https://shibuya.subscan.io/account/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://shibuya.subscan.io/extrinsic/${transactionHash}`,
  rpcUrl: 'https://shibuya.public.blastapi.io',
  nativeCurrency: {
    name: 'Shibuya',
    symbol: 'SBY',
    decimals: 18,
  },
};

export const Astar = {
  chainId: 592,
  chainName: 'Astar Network Mainnet',
  isTestChain: false,
  isLocalChain: false,
  multicallAddress: '0xA129F95CfFe022153a4499f475B537751cd1ceF8',
  multicall2Address: '0x867e9d496F67a5eD0b888120A559DC6430499A7C',
  getExplorerAddressLink: (address: string) =>
    `https://astar.subscan.io/account/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://astar.subscan.io/extrinsic/${transactionHash}`,
  rpcUrl: 'https://evm.astar.network',
  nativeCurrency: {
    name: 'Astar',
    symbol: 'ASTR',
    decimals: 18,
  },
};

interface DAppProps {
  children: ReactNode;
}

const config = {
  networks: [Mainnet, Ropsten, BSC, BSCTestnet, Astar],
  noMetamaskDeactivate: true,
  readOnlyChainId: Astar.chainId,
  readOnlyUrls: {
    [ChainId.Mainnet]: `https://eth-mainnet.alchemyapi.io/v2/${'ylE0wN4_2ALWd8ZK7hgvDMi4eRCfskQY'}`,
    [ChainId.Ropsten]: `https://eth-ropsten.alchemyapi.io/v2/${'ylE0wN4_2ALWd8ZK7hgvDMi4eRCfskQY'}`,
    [ChainId.BSC]: `https://bsc-dataseed.binance.org/`,
    [ChainId.BSCTestnet]: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
    [Astar.chainId]: Astar.rpcUrl,
  },
};

const _DAppProvider = ({ children }: DAppProps) => {
  return <DAppProvider config={config}>{children}</DAppProvider>;
};

export default _DAppProvider;
