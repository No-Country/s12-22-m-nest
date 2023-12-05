'use client'
import { type FunctionComponent } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { type Location } from '@/interfaces'
import Leaflet from 'leaflet'

interface Props {
  widthMap: string
  heightMap: string
  locations: Location
}

// const dealerIcon = Leaflet.icon({
//   iconUrl: 'https://api.iconify.design/fluent-emoji/motorcycle.svg',
//   iconSize: [50, 50]
// })

const shopIcon = Leaflet.icon({
  iconUrl: 'https://api.iconify.design/flat-color-icons/shop.svg',
  iconSize: [50, 50]
})

const shipIcon = Leaflet.icon({
  iconUrl: 'https://api.iconify.design/flat-color-icons/home.svg',
  iconSize: [50, 50]
})

const Map: FunctionComponent<Props> = ({ widthMap, heightMap, locations }) => (
  <MapContainer center={[Number(locations.shipAddress.coordinates?.lat), Number(locations.shipAddress.coordinates?.lon)]} zoom={16} scrollWheelZoom={false} style={{ height: heightMap, width: widthMap }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    <Marker icon={shipIcon} position={[Number(locations.shipAddress.coordinates?.lat), Number(locations.shipAddress.coordinates?.lon)]}>
      <Popup>
        Destino
      </Popup>
    </Marker>
    <Marker icon={shopIcon} position={[Number(locations.shopAdress.coordinates?.lat), Number(locations.shopAdress.coordinates?.lon)]}>
      <Popup>
        {locations.shopAdress.name}
      </Popup>
    </Marker>
    {/* <Marker icon={dealerIcon} position={[Number(locations.dealer.coordinates?.lat), Number(locations.dealer.coordinates?.lon)]}>
      <Popup>
        {locations.dealer.name}
      </Popup>
    </Marker> */}
  </MapContainer>
)

export default Map
