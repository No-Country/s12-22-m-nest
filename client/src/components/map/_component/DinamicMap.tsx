'use client'
import { type FunctionComponent } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
const Map: FunctionComponent = () => (

<MapContainer center={[-34.613, -58.377]} zoom={13} scrollWheelZoom={false} style={{ height: 400, width: '50%' }}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  <Marker position={[-34.613, -58.377]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>

</MapContainer>
)

export default Map
