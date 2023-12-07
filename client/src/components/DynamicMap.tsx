'use client'
import { type FunctionComponent } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { type Coordinates } from '@/interfaces'
import Leaflet from 'leaflet'

export interface Location {
  shipCoordinates: Coordinates | undefined | null
  shopCoordinates: Coordinates | undefined | null
  dealerCoordinates: Coordinates | null
}

interface Props {
  locations: Location
}

const dealerIcon = Leaflet.icon({
  iconUrl: 'https://api.iconify.design/fluent-emoji/motorcycle.svg',
  iconSize: [50, 50]
})

const shopIcon = Leaflet.icon({
  iconUrl: 'https://api.iconify.design/flat-color-icons/shop.svg',
  iconSize: [40, 40]
})

const shipIcon = Leaflet.icon({
  iconUrl: 'https://api.iconify.design/flat-color-icons/home.svg',
  iconSize: [40, 40]
})

const Map: FunctionComponent<Props> = ({ locations }) => (
  <div className='absolute bottom-0 top-0 w-full'>
    <MapContainer
      center={
        locations.dealerCoordinates
          ? [Number(locations.dealerCoordinates?.lat), Number(locations.dealerCoordinates?.lon)]
          : locations.shopCoordinates && locations.shipCoordinates
            ? [Number(locations.shipCoordinates?.lat), Number(locations.shipCoordinates?.lon)]
            : [-34.6037345, -58.3841453]
      }
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {locations?.shipCoordinates && (
        <Marker
          icon={shipIcon}
          position={[Number(locations.shipCoordinates?.lat), Number(locations.shipCoordinates?.lon)]}
        >
          <Popup>Destino</Popup>
        </Marker>
      )}
      {locations?.shopCoordinates && (
        <Marker
          icon={shopIcon}
          position={[Number(locations.shopCoordinates?.lat), Number(locations.shopCoordinates?.lon)]}
        >
          <Popup>Tienda</Popup>
        </Marker>
      )}
      {locations?.dealerCoordinates && (
        <Marker
          icon={dealerIcon}
          position={[Number(locations.dealerCoordinates?.lat), Number(locations.dealerCoordinates?.lon)]}
        >
          <Popup>Repartidor</Popup>
        </Marker>
      )}
    </MapContainer>
  </div>
)

export default Map
