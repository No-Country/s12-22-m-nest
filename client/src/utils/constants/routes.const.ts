export const Routes = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DEALER_HOME: '/dealer/availability',
  WAITING_ORDER: '/dealer/waiting-order',
  ORDER: (id: string) => `/dealer/order/${id}`,
  ORDER_TRACKING: (id: string) => `/dealer/order-tracking/${id}`,
  DEALER_ACCOUNT: '/dealer/account'
}
