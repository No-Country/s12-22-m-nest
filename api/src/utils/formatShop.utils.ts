import { type Shop } from 'src/shops/entities/shop.entity'

export const formatShop = (shop: Shop) => {
  const formatedShop = {
    ...shop,
    coordinates: JSON.parse(shop.coordinates) as Coordinates
  }

  return formatedShop
}
