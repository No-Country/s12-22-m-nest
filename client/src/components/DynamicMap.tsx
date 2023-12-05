'use client'
import { type FunctionComponent } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { type Coordinates } from '@/interfaces'
import Leaflet from 'leaflet'

export interface Location {
  shipCoordinates: Coordinates | undefined
  shopCoordinates: Coordinates | undefined
  dealerCoordinates: Coordinates | null
}

interface Props {
  widthMap: string
  heightMap: string
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

const Map: FunctionComponent<Props> = ({ widthMap, heightMap, locations }) => (
  <MapContainer
    center={
      locations.dealerCoordinates
        ? [Number(locations.dealerCoordinates?.lat), Number(locations.dealerCoordinates?.lon)]
        : [Number(locations.shipCoordinates?.lat), Number(locations.shipCoordinates?.lon)]
    }
    zoom={12}
    scrollWheelZoom={false}
    style={{ height: heightMap, width: widthMap }}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    <Marker icon={shipIcon} position={[Number(locations.shipCoordinates?.lat), Number(locations.shipCoordinates?.lon)]}>
      <Popup>Destino</Popup>
    </Marker>
    <Marker icon={shopIcon} position={[Number(locations.shopCoordinates?.lat), Number(locations.shopCoordinates?.lon)]}>
      <Popup>Tienda</Popup>
    </Marker>
    {locations.dealerCoordinates && (
      <Marker
        icon={dealerIcon}
        position={[Number(locations.dealerCoordinates?.lat), Number(locations.dealerCoordinates?.lon)]}
      >
        <Popup>Repartidor</Popup>
      </Marker>
    )}
  </MapContainer>
)

export default Map
