'use client'
import Leaflet from 'leaflet'
import { type FunctionComponent, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { type Location } from './DynamicMap'

interface Props {
  locations: Location
}

const CenterMap: FunctionComponent<Props> = ({ locations }) => {
  const map = useMap()

  useEffect(() => {
    const updateDealerPosition = (): void => {
      if (locations.dealerCoordinates && map?.setView) {
        const newCenter = new Leaflet.LatLng(
          Number(locations.dealerCoordinates.lat),
          Number(locations.dealerCoordinates.lon)
        )
        map?.setView(newCenter, map.getZoom(), {
          animate: true
        })
      }
    }

    const intervalId = setInterval(updateDealerPosition, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [locations.dealerCoordinates, map])

  return null
}

export default CenterMap
