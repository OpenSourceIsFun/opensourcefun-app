import { serviceUrl } from '@/config/env';

const BASE_ROUTE = `https://${serviceUrl}`;

// PAGES
export const NETWORKS_ROUTE = '/networks';
export const HOME_ROUTE = NETWORKS_ROUTE;
export const AUTH_EMAIL_ROUTE = '/auth/email';
export const AUTH_VERIFY_CODE_ROUTE = '/auth/verify-code';
export const LOGIN_ROUTE = '/auth/login';
export const REGISTER_ROUTE = '/auth/register';
export const MOBILE_KYC_ROUTE = '/mobile-kyc';
export const PROFILE_ROUTE = '/profile';
export const WALLET_ROUTE = '/profile?wallet=true';
export const KYC_ROUTE = '/profile?kyc=true';
export const CLAIM_SUCCESS_ROUTE = '/claim-success';
export const BACK_OFFICE_ROUTE = '/back-office';

// API
export const API_SEND_CODE_ROUTE = `${BASE_ROUTE}/auth/send-code`;
export const API_VERIFY_CODE_ROUTE = `${BASE_ROUTE}/auth/verify-code`;
export const API_LOGIN_ROUTE = `${BASE_ROUTE}/auth/authorize`;
export const API_REGISTER_ROUTE = `${BASE_ROUTE}/auth/register`;
export const API_ANALYTICS_ROUTE = `${BASE_ROUTE}/analytics`;
export const API_EMAIL_SUBSCRIBE_ROUTE = `${BASE_ROUTE}/analytics/subscribe`;
export const API_USER_ROUTE = `${BASE_ROUTE}/users/current-user`;
export const API_USERS_BY_ADDRESSES = `${BASE_ROUTE}/users/by-addresses`;
export const API_USER_INFO_ROUTE = `${API_USER_ROUTE}/info`;
export const API_KYC_ROUTE = `${BASE_ROUTE}/kyc/verification-url`;
export const API_KYC_STATUS_ROUTE = `${BASE_ROUTE}/kyc/status`;
export const API_PROJECTS = `${BASE_ROUTE}/projects`;
export const API_PROJECTS_ALL = `${BASE_ROUTE}/projects/all`;
export const API_PROJECTS_LIST = `${BASE_ROUTE}/projects/list`;
export const API_PROJECTS_BY_ID = `${BASE_ROUTE}/projects/by-id`;
export const API_PROJECTS_BY_ALIAS = `${BASE_ROUTE}/projects/by-alias`;
export const API_SET_ADMIN_BY_EMAIL = `${BASE_ROUTE}/users/set-admin-by-email`;
export const API_GET_REFERRAL_CODE = `${BASE_ROUTE}/referral-codes/my/code`;
export const API_GET_REWARDS = `${BASE_ROUTE}/rewards/my/total`;
export const API_GET_REFERRALS = `${BASE_ROUTE}/referral-codes/my/referrals`;
export const API_FILES = `${BASE_ROUTE}/files`;
export const API_IMAGES = `${API_FILES}/images`;
