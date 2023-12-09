import * as geolib from 'geolib'

export function calculateDistance(
  customerLatitude: number,
  customerLongitude: number,
  driverLatitude: number,
  driverLongitude: number
): number {
  const customerCoordinates = {
    latitude: customerLatitude,
    longitude: customerLongitude
  }

  const driverCoordinates = {
    latitude: driverLatitude,
    longitude: driverLongitude
  }

  const distance = geolib.getDistance(customerCoordinates, driverCoordinates)
  console.log(
    'distance geolib',
    distance,
    'aCoords',
    customerCoordinates,
    'bCoords',
    driverCoordinates
  )
  const distanceInKilometers = geolib.convertDistance(distance, 'km')
  return distanceInKilometers
}
