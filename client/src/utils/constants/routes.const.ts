export const routes = {
  auth: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },
  customer: {
    HOME: '/',
    ACCOUNT: '/account',
    ORDER_HISTORY: '/account/order-history',
    CHECKOUT: '/checkout',
    ORDER: (id: string) => `/order/${id}`,
    ORDER_TRACKING: (id: string) => `/order-tracking/${id}`,
    SHOP: (id: string) => `/shop/${id}`
  },
  dealer: {
    HOME: '/dealer',
    AVAILABILITY: '/dealer/availability',
    WAITING_ORDER: '/dealer/waiting-order',
    ORDER: (id: string) => `/dealer/order/${id}`,
    ACCOUNT: '/account',
    ORDER_HISTORY: '/account/order-history'
  }
}
