import * as geolib from 'geolib'

export function calculateDistance(
  latitudCliente: number,
  longitudCliente: number,
  latitudConductor: number,
  longitudConductor: number
): number {
  const coordenadasCliente = {
    latitude: latitudCliente,
    longitude: longitudCliente
  }
  const coordenadasConductor = {
    latitude: latitudConductor,
    longitude: longitudConductor
  }

  const distancia = geolib.getDistance(coordenadasCliente, coordenadasConductor)

  // La distancia se devuelve en metros, si necesitas kilómetros, puedes convertirla
  const distanciaEnKilometros = geolib.convertDistance(distancia, 'km')
  return distanciaEnKilometros
}
