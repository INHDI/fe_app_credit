// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://10.15.7.22:8081',
  ENDPOINTS: {
    TIN_CHAP: '/tin-chap',
    TRA_GOP: '/tra-gop',
    LICH_SU_TRA_LAI: '/lich-su-tra-lai',
    DASHBOARD: '/dashboard',
    LICH_SU: '/lich-su'
  }
} as const;

// API Headers
export const API_HEADERS = {
  JSON: {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  },
  JSON_ACCEPT: {
    'accept': 'application/json'
  }
} as const;

// Environment Configuration
export const ENV_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || API_CONFIG.BASE_URL,
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production'
} as const;
