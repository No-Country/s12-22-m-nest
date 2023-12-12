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
  FIND_PRODUCTS: '/api/products',
  FIND_SHOP: (id: string) => `/api/shops/${id}`,
  CREATE_ORDER: '/api/orders',
  FIND_PRODUCT: (id: string) => `/api/products/${id}`,
  FIND_SHOPS: '/api/shops',
  FIND_SHOP_ACTIVE_ORDERS: (id: string) => `/api/shops/${id}/active-orders`,
  CREATE_PRODUCT: '/api/products'
}
