import { isProduction } from '@/utils/general';
import {
  analyticsSendAlgemEventRegistration,
  analyticsSendAstarEventRegistration,
} from '@/services/analytics';

export interface ProjectMetaStub {
  alias: string;
  title: string;
  token: string;
  banner: string;
  overview: string;
  description: string;
  logo: string;
  networkLogo: string;
  network: string;
  majorContributor: string;
  preferredExperience: string;
  totalAllocation: string;
  address: string;
  sendJoinMetrics: () => void;
}

export const LOGO_BY_NETWORK: { [network: string]: string } = {
  Astar: '/images/astar_logo.png',
};

export const ALGEM_META: ProjectMetaStub = {
  alias: 'algem',
  title: 'Algem',
  token: 'ALGM',
  banner: '/images/algem_banner.png',
  overview:
    'Algem is the native liquid staking DeFi dApp on top of Astar Network offering various ways for ASTR users and holders to earn more.',
  description:
    'Algem is a dApp built on Astar Network and offers two main\n features: liquid staking and liquid lending. As the name\n implies, these two solutions enable ASTR holders to remain\n liquid with their assets while putting them to work. In\n addition, the liquid staking and lending solutions allow users\n to accumulate staking rewards and increase their earnings\n using Algem’s liquid nASTR tokens across Astar’s Defi\n ecosystem. In doing so, Algem supports other Defi protocols by\n providing liquidity and creating a sustainable and cooperative\n ecosystem on Astar Network and Polkadot.',
  logo: '/images/algem_icon.svg',
  network: 'Astar',
  networkLogo: LOGO_BY_NETWORK['Astar'],
  majorContributor: 'Next Web Capital',
  preferredExperience: 'DeFi, Polkadot ecosystem',
  totalAllocation: '250,000 ALGM',
  sendJoinMetrics: analyticsSendAlgemEventRegistration,
  address: isProduction
    ? '0xC00ba642fbB807B6e7A45fDAC4D2061d961fd272'
    : '0x9a47ED562491A8043d0ce762D4B308bD40E09175',
};

export const ASTAR_META: ProjectMetaStub = {
  alias: 'astar',
  title: 'Astar',
  token: 'ASTR',
  banner: '/images/astar_banner_4x.png',
  overview:
    'Astar Network is a blockchain built for developers and by developers. Our innovative developer basic income and multivirtual machine allow developers to make scalable and secured applications for DeFi, NFTs, Web3 and more.',
  description:
    'Astar Network is a blockchain built for developers and by developers and is the premier multi-chain smart contract platform that supports multiple blockchains and virtual machines. Through our multivirtual machine solution, developers can deploy smart contracts both on Ethereum Virtual Machine and WebAssembly, thereby supporting all Web2 and Web3 developers alike. We invented the "Build2Earn" concept where we distribute ASTR tokens based on the developers\' contribution. By making smart contracts, you are rewarded through our innovation we call "dApp Staking".',
  logo: '/images/astar_icon.png',
  network: 'Astar',
  networkLogo: LOGO_BY_NETWORK['Astar'],
  majorContributor:
    'Binance Labs, Coinbase Ventures, Polychain Capital, Crypto.com',
  preferredExperience: 'Developer Tool',
  totalAllocation: 'Up to 25,000 ASTR',
  sendJoinMetrics: analyticsSendAstarEventRegistration,
  address: isProduction
    ? '0x31112bDDDa67B669591f8Cd6F123E12f4dA77Fdf'
    : '0x45C88E4B9fFc456CdD9bf63948646510c65F3dA7',
};

export const META_BY_ALIAS: { [alias: string]: ProjectMetaStub } = {
  algem: ALGEM_META,
  astar: ASTAR_META,
};
