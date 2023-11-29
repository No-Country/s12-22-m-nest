export const Endpoints = {
  LOGIN: '/api/auth/login',
  FIND_USER: (id: string) => `/api/users/${id}`,
  CHECK_USER_AVAILABILITY: (id: string) => `/api/users/${id}/availability`,
  FIND_ORDER: (id: string) => `/api/test/${id}`,
  REGISTER: '/auth/register',
  DEALER: '/dealer',
  DEALER_AVAILABILITY: '/dealer/availability',
  DEALER_WAITING_ORDER: '/dealer/waiting-order',
  DEALER_ORDER: (id: string) => `/dealer/order/${id}`,
  DEALER_ORDER_TRACKING: (id: string) => `/dealer/order-tracking/${id}`
}
