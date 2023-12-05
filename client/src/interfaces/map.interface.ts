import { type Coordinates } from '.'

export interface Location {
  shipAddress: {
    name: string | undefined
    coordinates: Coordinates | undefined
  }
  shopAdress: {
    name: string | undefined
    coordinates: Coordinates | undefined
  }
  // dealer: {
  //   name: string | undefined
  //   coordinates: Coordinates | undefined
  // }
}
