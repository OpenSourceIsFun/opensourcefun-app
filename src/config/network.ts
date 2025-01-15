import { isProduction } from '@/utils/general';
import { BSC, BSCTestnet } from '@usedapp/core';
import { Astar } from '@/providers/dApp';

export const network = isProduction ? BSC.chainId : BSCTestnet.chainId;

export const networkName = isProduction
  ? 'Binance Smart Chain Mainnet'
  : 'Binance Smart Chain Testnet';

export const rpcUrls = isProduction
  ? [
      'https://bsc-dataseed.binance.org',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed2.defibit.io',
      'https://bsc-dataseed3.defibit.io',
      'https://bsc-dataseed4.defibit.io',
      'https://bsc-dataseed2.ninicoin.io',
      'https://bsc-dataseed3.ninicoin.io',
      'https://bsc-dataseed4.ninicoin.io',
      'https://bsc-dataseed1.binance.org',
      'https://bsc-dataseed2.binance.org',
      'https://bsc-dataseed3.binance.org',
      'https://bsc-dataseed4.binance.org',
      'wss://bsc-ws-node.nariox.org',
    ]
  : [
      'https://data-seed-prebsc-1-s1.binance.org:8545/',
      'https://data-seed-prebsc-2-s1.binance.org:8545/',
      'https://data-seed-prebsc-1-s2.binance.org:8545/',
      'https://data-seed-prebsc-2-s2.binance.org:8545/',
      'https://data-seed-prebsc-1-s3.binance.org:8545/',
      'https://data-seed-prebsc-2-s3.binance.org:8545/',
    ];

export const blockExplorerUrls = ['https://astar.subscan.io/'];

export const WCProviderConfig = {
  infuraId: 'd8df2cb7844e4a54ab0a782f608749dd',
  rpc: {
    [BSC.chainId]: 'https://bsc-dataseed.binance.org/',
    [BSCTestnet.chainId]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    [Astar.chainId]: Astar.rpcUrl,
  },
};
