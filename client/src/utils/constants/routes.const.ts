export const routes = {
  auth: {
    LOGIN: '/login',
    REGISTER: '/register'
  },
  customer: {
    HOME: '/',
    ACCOUNT: '/account',
    ORDER_HISTORY: '/account/order-history',
    ORDER: (id: string) => `/order/${id}`,
    ORDER_TRACKING: (id: string) => `/order-tracking/${id}`
  },
  dealer: {
    HOME: '/dealer/availability',
    WAITING_ORDER: '/dealer/waiting-order',
    ORDER: (id: string) => `/dealer/order/${id}`,
    ACCOUNT: '/account',
    ORDER_HISTORY: '/account/order-history'
  }
}
