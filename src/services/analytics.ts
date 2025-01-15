import ReactGA from 'react-ga4';
import fetchJson from '@/services/fetchJson';
import { API_ANALYTICS_ROUTE } from '@/constants/routes';

export enum AnalyticsEventType {
  Registration = 'REGISTRATION',
  RegistrationWait = 'REGISTRATION_WAIT',
  StartedConnectionBinance = 'STARTED_CONNECTION_BINANCE',
  StartedConnectionPolkadot = 'STARTED_CONNECTION_POLKADOT',
  WalletVerify = 'WALLET_VERIFY',
  AlgemEventRegistration = 'ALGEM_EVENT_REGISTRATION',
  AstarEventRegistration = 'ASTAR_EVENT_REGISTRATION',
  StartKyc = 'START_KYC',
  KycSuccess = 'KYC_SUCCESS',
}

export const analyticsSend = async (type: AnalyticsEventType) => {
  try {
    await fetchJson(API_ANALYTICS_ROUTE, {
      method: 'POST',
      body: JSON.stringify({ type }),
    });
    // eslint-disable-next-line no-empty
  } catch {}
};

export const gtagSendEvent = (
  eventAction: string,
  eventCategory: string,
): void => {
  if (typeof window !== 'undefined') {
    ReactGA.event({
      category: eventCategory,
      action: eventAction,
    });
  }
};

export const analyticsSendRegistration = async (): Promise<void> => {
  gtagSendEvent('create_account', 'wl_page');

  await analyticsSend(AnalyticsEventType.Registration);
};

export const analyticsSendStartKyc = async (): Promise<void> => {
  gtagSendEvent('start_kyc', 'wl_page');

  await analyticsSend(AnalyticsEventType.StartKyc);
};

export const analyticsSendSuccessKyc = async (): Promise<void> => {
  gtagSendEvent('success_kyc', 'wl_page');

  await analyticsSend(AnalyticsEventType.KycSuccess);
};

export const analyticsSendWalletVerified = async (): Promise<void> => {
  gtagSendEvent('wallet_added', 'wl_page');

  await analyticsSend(AnalyticsEventType.WalletVerify);
};

export const analyticsSendAlgemEventRegistration = async (): Promise<void> => {
  await analyticsSend(AnalyticsEventType.AlgemEventRegistration);
};

export const analyticsSendAstarEventRegistration = async (): Promise<void> => {
  await analyticsSend(AnalyticsEventType.AstarEventRegistration);
};
