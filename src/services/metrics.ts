import {
  analyticsSendRegistration,
  analyticsSendStartKyc,
  analyticsSendSuccessKyc,
  analyticsSendWalletVerified,
} from '@/services/analytics';
import { isProduction } from '@/utils/general';

export const sendMetricsCreateAccount = () => {
  if (isProduction) {
    analyticsSendRegistration();
  }
};

export const sendMetricsWalletVerified = () => {
  if (isProduction) {
    analyticsSendWalletVerified();
  }
};

export const sendMetricsStartKYC = () => {
  if (isProduction) {
    analyticsSendStartKyc();
  }
};

export const sendMetricsSuccessKYC = () => {
  if (isProduction) {
    analyticsSendSuccessKyc();
  }
};
