'use client'
import { type FunctionComponent } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
// import Leaflet from 'leaflet'

// const markerIcon = Leaflet.divIcon({
//   iconUrl: 'https://www.svgrepo.com/show/491937/transportation-color-moto.svg'
// })

const Map: FunctionComponent = () => (
  // TODO: MODIFICAR WIDTH Y HEIGHT
  <MapContainer center={[-34.613, -58.377]} zoom={13} scrollWheelZoom={false} style={{ height: 500, width: '100%' }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    <Marker position={[-34.613, -58.377]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
    <Marker position={[-35.613, -58.377]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
)

export default Map
