export const Endpoints = {
  LOGIN: '/api/auth/login',
  FIND_USER: (id: string) => `/api/users/${id}`,
  FIND_USER_ORDERS: (id: string) => `/api/users/${id}/orders`,
  UPDATE_USER: (id: string) => `/api/users/${id}`,
  CHECK_USER_AVAILABILITY: (id: string) => `/api/users/${id}/availability`,
  UPDATE_USER_PASSWORD: (id: string) => `/api/users/${id}/password`,
  FIND_ORDER: (id: string) => `/api/orders/${id}`,
  NEXT_STEP: (id: string) => `/api/orders/${id}/nextStep`,
  REGISTER: '/api/auth/register',
  SEND_MESSAGE: (orderId: string) => `/api/chat/${orderId}/send`,
  DEALER: '/dealer',
  DEALER_AVAILABILITY: '/dealer/availability',
  DEALER_WAITING_ORDER: '/dealer/waiting-order',
  DEALER_ORDER: (id: string) => `/dealer/order/${id}`,
  DEALER_ORDER_TRACKING: (id: string) => `/dealer/order-tracking/${id}`
}
